import React, { useEffect, useState } from "react";
import DAO from "./Dao";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import abi from "./abi/abi.json";

declare global {
  interface Window {
    ethereum: any; // else property X does not exist on type window
  }
}
function App() {
  const [hasMetamask, setHasMetamask] = useState(false);
  const { isWeb3Enabled, Moralis } = useMoralis();
  const [chainId, setChainId] = useState<string | number | null>();
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState<ethers.Contract>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


  // const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({
  //     abi: abi,
  //     contractAddress: '0x...',
  //     functionName:
  // })
  //TODO:  trigger when chainID changes/wallet disconnects
  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      const unsubscribe = Moralis.onWeb3Deactivated((result) => {
        console.log(result);
      });
      
      // Unsubscribe to onWeb3Deactivated events
      unsubscribe();
  
      // // Prompt user for account connections
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      const address = await signer.getAddress();
      setWalletAddress(address)
      const contract = new ethers.Contract(contractAddress, abi, signer); // connect to deployed contract
      setContract(contract);
      console.log("Account:", address);
    };
    init();
  }, [isWeb3Enabled]);

  if (signer && contract) {
    return (
      <>
        <DAO contract={contract} signer={signer} hasMetamask={hasMetamask} walletAddress={walletAddress} />
      </>
    );
  } else {
    return (
      <div>
        <h1>Please install Metamask..</h1>
      </div>
    )
  }

  
}

export default App;
