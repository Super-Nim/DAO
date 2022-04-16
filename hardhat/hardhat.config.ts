/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/config';
// module.exports = {
//   solidity: "0.8.13",
// };

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.13",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337
    }
  },
  namedAccounts: { // list of accounts
    deployer: { // name of account that does the deployment
      default: 0, // on any chain, the 0th acc is called 'deployer'
    }

  }
}

export default config;