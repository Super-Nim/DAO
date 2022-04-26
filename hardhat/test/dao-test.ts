import { ethers, waffle } from "hardhat";
/// @dev add --resolveJsonModule to tsconfig.json
import DAOArtifact from "../artifacts/contracts/DAO.sol/DAO.json";
import type { DAO } from "../typechain-types/DAO";
const { loadFixture, deployContract, solidity } = waffle;
import chai, { expect } from "chai";
import chaiAsPromised from 'chai-as-promised';
import { Wallet } from "@ethersproject/wallet";
chai.use(solidity);
chai.use(chaiAsPromised)


//TODO: add Natspec comments
describe("DAO", async () => {

  async function fixture() {
    const [admin, investor1, investor2, investor3, nonInvestor, recipient] =
      await ethers.getSigners();
    /// @notice 10 seconds to contribute to DAO and vote for proposals, and 2/3rds quorum required
    const contract = (await deployContract(
      admin,
      DAOArtifact,
      [10, 10, 66]
    )) as DAO;
    return { contract, admin, investor1, investor2, investor3, nonInvestor, recipient };
  }

  describe("contribute", async () => {
    it("should contribute within contributionTime period (10s)", async () => {
      const { contract, investor1, investor2 } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 100 });
      const investor1Shares = (await contract.shares(investor1.address)).toNumber();
      const investor2Shares = (await contract.shares(investor2.address)).toNumber();

      expect(investor1Shares).to.equal(100);
      expect(investor2Shares).to.equal(100);

    });

    it("should update the totalShares and availableFunds", async () => {
      const { contract, investor1 } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      const totalShares = (await contract.totalShares()).toNumber();
      const availableFunds = (await contract.availableFunds()).toNumber();
      
      expect(totalShares).to.equal(100);
      expect(availableFunds).to.equal(100);

    })

    it("should NOT contribute after contributionTime period (10s)", async () => {
      const { contract, investor1 } = await loadFixture(fixture);
      /// @dev increment by 10 seconds, then mine the next block
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        contract.connect(investor1).contribute({ value: 100 })
      ).to.be.revertedWith("cannot contribute after ICO period");
    });

    it("should verify investor's addresses", async () => {
      const { contract, investor1 } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      const isVerified = await contract.investors(investor1.address);

      expect(isVerified).to.be.true;
    })
  });

  describe("shares", async () => {

    it("should redeem shares", async () => {
      const { contract, investor1 } = await loadFixture(fixture);
      const provider = waffle.provider;
      /// get investor1 balance before and after contributing
      await contract.connect(investor1).contribute({ value: 100 });
      
      await contract.connect(investor1).redeemShare(50);
      const investor1Shares = (await contract.shares(investor1.address)).toNumber();
      const totalShares = (await contract.totalShares()).toNumber();
      const availableFunds = (await contract.availableFunds()).toNumber();

      // gas fees mess up calculation...
      // console.log('finalBalance =', (balanceBefore.sub(balanceAfter)));
      expect(investor1Shares).to.equal(50);
      expect(totalShares).to.equal(50);
      expect(availableFunds).to.equal(50);


    });

    it("should transfer shares", async () => {
      const { contract, investor1, investor2 } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor1).transferShare(100, investor2.address);

      const investor1Shares = (await contract.shares(investor1.address)).toNumber();
      const investor2Shares = (await contract.shares(investor2.address)).toNumber();
      const isVerified = (await contract.investors(investor2.address));

      expect(investor1Shares).to.equal(0);
      expect(investor2Shares).to.equal(100);
      expect(isVerified).to.be.true;
    });

  });

  describe("proposal", async () => {
    
    it("should create a proposal", async () => {
      const { contract, investor1, investor2, recipient } = await loadFixture(fixture);
      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      const proposal = await contract.proposals(0);
      const latestBlock = await ethers.provider.getBlock('latest');
      const currentTimestamp = latestBlock.timestamp;
      const endTimestamp =  proposal.endTime.toNumber();
      const endTime = endTimestamp - currentTimestamp;
      const availableFunds = (await contract.availableFunds()).toNumber();
      const nextProposalId = (await contract.nextProposalId()).toNumber();

      expect(proposal.id).to.equal(0);
      expect(proposal.name).to.equal("Governance Token Distribution");
      expect(proposal.amount).to.equal(100);
      expect(proposal.recipient).to.equal(recipient.address);
      expect(proposal.votes).to.equal(0);
      expect(endTime).to.equal(10);
      expect(proposal.executed).to.be.false;
      expect(availableFunds).to.equal(200);
      expect(nextProposalId).to.equal(1);

    });

    it('should NOT create a proposal if not investor', async () => {
      const { contract, nonInvestor, recipient } = await loadFixture(fixture);

      await expect(
        contract.connect(nonInvestor).createProposal('proposal', 100, recipient.address)
      ).to.be.revertedWith("only investors");
    });

    it('should NOT create a proposal if not enough liquidity', async () => {
      const { contract, investor1, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({value: 100});

      await expect(
        contract.connect(investor1).createProposal('proposal', 200, recipient.address)
      ).to.be.revertedWith("not enough liquidity for proposal");
    });

    it('should vote', async () => {
      const { contract, investor1, investor2, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );

      /// @dev 1 vote = total shares from investor
      await contract.connect(investor2).vote(0);
      const hasInvestorVoted = await contract.votes(investor2.address, 0)
      const proposalVotes =  (await contract.proposals(0)).votes.toNumber();

      expect(hasInvestorVoted).to.be.true;
      expect(proposalVotes).to.equal(200);
    });

    it('should NOT vote if NOT investor', async () => {
      const { contract, nonInvestor } = await loadFixture(fixture);

      await expect(
        contract.connect(nonInvestor).vote(0)
      ).to.be.revertedWith("only investors");
    })

    it('should NOT vote if already voted', async () => {
      const { contract, investor1, investor2, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      /// @dev 1 vote = total shares from investor
      await contract.connect(investor2).vote(0);

      await expect(
        contract.connect(investor2).vote(0)
      ).to.be.revertedWith("you cannot vote more than once");


    });

    it('should NOT vote after proposal end time', async () => {
      const { contract, investor1, investor2, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        contract.connect(investor2).vote(0)
      ).to.be.revertedWith("can only vote before proposal end time");

    })

    it('should execute proposal', async () => {
      const { contract, investor1, investor2, investor3, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor3).contribute({ value: 300 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      
      await contract.connect(investor2).vote(0);
      await contract.connect(investor3).vote(0);
      console.log('totalShares ', (await contract.totalShares()).toNumber());
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);
      await contract.connect(investor1).executeProposal(0);

      expect(
        (await contract.proposals(0)).executed
      ).to.be.true;


    });

    it('should NOT execute proposal before end Time', async () => {
      const { contract, investor1, investor2, investor3, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor3).contribute({ value: 300 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      
      await contract.connect(investor2).vote(0);
      await contract.connect(investor3).vote(0);

      await expect(
        contract.connect(investor1).executeProposal(0)
      ).to.be.revertedWith("cannot execute proposal before end time");


    });

    it('should NOT execute proposal if already executed', async () => {
      const { contract, investor1, investor2, investor3, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor3).contribute({ value: 300 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      
      await contract.connect(investor2).vote(0);
      await contract.connect(investor3).vote(0);
      console.log('totalShares ', (await contract.totalShares()).toNumber());
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);
      await contract.connect(investor1).executeProposal(0);

      await expect(
        contract.connect(investor1).executeProposal(0)
      ).to.be.revertedWith("cannot execute proposal already executed");

    });

    it('should NOT execute proposal if not satisified quorum', async () => {
      const { contract, investor1, investor2, investor3, recipient } = await loadFixture(fixture);

      await contract.connect(investor1).contribute({ value: 100 });
      await contract.connect(investor2).contribute({ value: 200 });
      await contract.connect(investor3).contribute({ value: 300 });
      await contract.connect(investor1).createProposal(
        "Governance Token Distribution",
        "100",
        recipient.address
      );
      await contract.connect(investor2).vote(0);
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);
      
      await expect(
        contract.connect(investor1).executeProposal(0)
      ).to.be.revertedWith("proposal has not satisfied quroum");

    });

    it('should withdraw ether (EXTREME scenario)', async () => {
      const { contract, investor1, recipient } = await loadFixture(fixture);

      const balanceBefore = await ethers.provider.getBalance(recipient.address);
      await contract.connect(investor1).contribute({ value: 100000 });
      /// @dev only admin can call withdraw
      await contract.withdraw(100, recipient.address);
      const balanceAfter = await ethers.provider.getBalance(recipient.address);

      expect(balanceAfter.sub(balanceBefore)).to.equal(100);
    })

    it('should NOT withdraw ether if NOT admin (EXTREME scenario)', async () => {
      const { contract, nonInvestor, recipient } = await loadFixture(fixture);

      await expect(
        contract.connect(nonInvestor).withdraw(100, recipient.address)
      ).to.be.revertedWith("only admin");
    });

    it('should NOT transfer ether if not enough liquidity', async () => {
      const { contract, recipient } = await loadFixture(fixture);

      await expect(
        contract.withdraw(100, recipient.address)
      ).to.be.revertedWith("not enough liquidity");
    })






    // TODO: get balance of address that receives ether - create balanceOf(addr) func in sc
    // do test with redeem shares --> vote --> inspect totalShares/execute proposal
  })
});
