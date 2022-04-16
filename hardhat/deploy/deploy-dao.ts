import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import verify from "../verify-network";
import { CONTRIBUTION_TIME, QUORUM, VOTE_TIME } from "../helper-deploy";

const deployDAO: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    /// @dev extracting from hardhat.config the 0th index of deployer obj
    const { deployer } = await getNamedAccounts();
    log("Deploying DAO...");
    const DAO = await deploy("DAO", {
        from: deployer,
        args: [
            CONTRIBUTION_TIME,
            VOTE_TIME,
            QUORUM
        ],
        log: true,
        // waitConfirmations to set the number of block confirmations for verifying on live network
    })
    /// @notice if network name is live/testnet and there's an etherscan API key present, verify the network first
    if((!network.name.includes("hardhat") || !network.name.includes("localhost")) && process.env.ETHERSCAN_API_KEY) {
        // TODO: add constructor params? github shows no but idk...
        console.log('inside VERIFICATION BLOCK')
        await verify(DAO.address, [])
    }
    
};

// can add delegation func here if I add token contract...

/// @dev remember to export to prevent 'deployDAO.func is not a function' error
export default deployDAO;
