// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
    * DAO contract:
    * 1. Accumulates money from investors
    * 2. tracks investor contributions and their weightings via shares
    * 3. investors can transfer shares
    * 4. investors can create proposals and vote for them
    * 5. execute successful proposals
    */

contract DAO { 
    struct Proposal {
        /// @notice unique id of proposal
        uint id;
        /// @notice name of proposal
        string name;
        /// @notice amount of availableFunds sacrificed for proposal
        uint amount;
        /// @notice contract address to receive funds and represent the investment
        address payable recipient;
        /// @notice total votes for a given proposal
        uint votes;
        /// @notice time until proposal finishes
        uint endTime;
        /// @notice has the proposal successfully executed?
        bool executed;
    }
    mapping(address => bool) public investors;
    mapping(address => uint) public shares;
    mapping(uint => Proposal) public proposals;
    // e.g. if votes[msg.sender][0] == true, then....
    mapping(address => mapping(uint => bool)) public votes;
    // @dev for voting system, determine investor's voting weight
    uint public totalShares;
    uint public availableFunds;
    uint public contributionEnd;
    uint public nextProposalId;
    uint public voteTime;
    uint public quorum;
    address public admin;

    /**
        * @notice initializes DAO's timed variables and consensus
        * @param contributionTime allocated time for investors to invest in DAO
        * @param _voteTime allocated time to vote on investment proposal
        * @param _quorum required consensus to execute investment proposal
        */
    constructor(
        uint contributionTime,
        uint _voteTime,
        uint _quorum) {
            require(_quorum > 0 && _quorum < 100, "quorum must be between 0 and 100");
            contributionEnd = block.timestamp + contributionTime;
            voteTime = _voteTime;
            quorum = _quorum;
            admin = msg.sender;
        }

    function contribute() payable external {
        require(block.timestamp < contributionEnd, "cannot contribute after ICO period");
        investors[msg.sender] = true;
        shares[msg.sender] += msg.value;
        totalShares += msg.value;
        availableFunds += msg.value;
    }
    /// @notice enable investors to redeem their shares from DAO
    function redeemShare(uint amount) external {
        // @dev the shares mapping tracks the shares for a given address, so a non-investor can't just redeem shares
        require(shares[msg.sender] >= amount, "not enough shares");
        require(availableFunds >= amount, "not enough liquidity to redeem shares");
        // TODO: deduct from totalShares too?
        shares[msg.sender] -=  amount;
        totalShares -= amount;
        availableFunds -= amount;
        // @dev need to typecast msg.sender to payable
        payable(msg.sender).transfer(amount);
    }
    /// @dev func only useful between 2 investors that occurs OUTSIDE of the contract
    function transferShare(uint amount, address to) external {
        require(shares[msg.sender] >= amount, "not enough shares");
        shares[msg.sender] -= amount;
        shares[to] += amount;
        investors[to] = true; // to addr is now an investor of the DAO
    }
    /// @notice investors can create investing proposals for the DAO
    function createProposal(
        string memory name,
        uint amount,
        address payable recipient
    ) external onlyInvestors() {
        require(availableFunds >= amount, "not enough liquidity for proposal");
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            name,
            amount,
            recipient,
            0,
            block.timestamp + voteTime,
            false
        );
        // We could simply use this.balance to get the contract's available ether...
        // When creating a proposal, we are committing in the FUTURE to spend a PORTION of the available balance...
        // This reserved amount must be considered when other functions of the contract a called that deduct/add to the available funds
        // Therefore, the availableFunds will always be <= this.balance
        availableFunds -= amount;
        nextProposalId++;
    }
    /// @notice vote for a given proposal
    function vote(uint proposalId) external onlyInvestors() {
        /// @dev create storage pointer to update proposal more easily
        Proposal storage proposal = proposals[proposalId];
        require(votes[msg.sender][proposalId] == false, "you cannot vote more than once");
        require(block.timestamp < proposal.endTime, "can only vote before proposal end time");
        votes[msg.sender][proposalId] = true;
        proposal.votes += shares[msg.sender];
    }
    /// @notice execute the successful proposal
    function executeProposal(uint proposalId) external onlyInvestors() {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.endTime, "cannot execute proposal before end time");
        require(proposal.executed == false, "cannot execute proposal already executed");
        /// @notice division rounds towards zero and small numbers divided result in 0
        uint quorumSurpassed = (proposal.votes * 10 ** 2 / totalShares * 10 ** 2) / 100;
        /// @dev ensure proposal has equalled/surpassed quorum
        require(quorumSurpassed >= quorum, "proposal has not satisfied quroum");
        proposal.executed = true;
        _transferEther(proposal.amount, proposal.recipient);

    }

    /// @notice 'escape hatch' to the extract ether if fuckery occurs
    function withdraw(uint amount, address payable to) external onlyAdmin() {
        _transferEther(amount, to);
    }
    /**
        *@notice receive func for receiving ether
        *@dev do NOT use fallback for primary method of receiving ether as it doesn't fail on 'interface confusions'
    */
    receive() payable external {
        availableFunds += msg.value;
    }

    function _transferEther(uint amount, address payable to) internal {
        require(amount <= availableFunds, "not enough liquidity");
        availableFunds -= amount;
        to.transfer(amount);
    }

    modifier onlyInvestors() {
        require(investors[msg.sender] == true, "only investors");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }


}