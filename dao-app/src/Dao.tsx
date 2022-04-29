import React, { useEffect, useState } from "react";
import Proposal from "./Proposal";
import FormInputText from "./Reusable/FormInput";
import Timer from "./Reusable/Timer";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import "./scss/Dao.scss";
import Moralis from "moralis/types";
import { Web3EnableOptions } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { getJsonWalletAddress } from "@ethersproject/json-wallets";
import abi from "./abi/abi.json";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import Moment from 'react-moment';
import moment from 'moment';

type DaoInputProps = {
  contract: ethers.Contract;
  signer: ethers.providers.JsonRpcSigner;
  hasMetamask: boolean;
  walletAddress: string;
};

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const connectWallet = {
  marginLeft: "auto",
};

const fillSpace = {
  height: "45vh",
};

export default function DAO({ contract, signer, hasMetamask, walletAddress }: DaoInputProps) {

  const methods = useForm();
  const { control, getValues } = methods;
  const [totalShares, setTotalShares] = useState();
  const [myShares, setMyShares] = useState();
  const [hasContributed, setHasContributed] = useState<boolean>();
  const [blockTimestamp, setBlockTimestamp] = useState(0);
  const [futureDate, setFutureDate] = useState(0);

  const getTotalShares = async () => {
    return await contract.totalShares();
  }

  const {
    enableWeb3,
    web3EnableError,
    isWeb3EnableLoading,
    authenticate,
    account,
  } = useMoralis();

  const getShares = async () => {
    let totalShares = await contract.totalShares();
    totalShares = ethers.utils.formatEther(totalShares);
    let myShares = await contract.shares(walletAddress);
    myShares = ethers.utils.formatEther(myShares);
    setTotalShares(totalShares);
    setMyShares(myShares);
    if (myShares > 0) {
      setHasContributed(true);
    }
  }

  const listenToContributed = () => {
    // const connection = new ethers.providers.WebSocketProvider('http://127.0.0.1:8545/');

    contract.on('contributed', (address) => {
      if (address === walletAddress) {
        /// @dev for dev purposes, keep this for testing with other accounts
        console.log(`address ${address} has contributed to the DAO: `, myShares);
        getShares();
      } else {
        getShares();
      }
    });
  }

  const contribute = async () => {
    const amount = getValues('contribute');
    await contract.contribute({value: ethers.utils.parseEther(amount)});
  }

  const redeem = async () => {
    const amount = getValues('redeem');
    await contract.redeemShare(ethers.utils.parseEther(amount));
  }

  const transfer = async () => {
    const amount = getValues('transfer');
    const to = getValues('to');
    await contract.transferShare(ethers.utils.parseEther(amount), to);
  }


  // TODO: add event listener in contract to re-render component on changes
  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      await getShares();
      listenToContributed();
      const timestamp = (await provider.getBlock(1)).timestamp;
      const momentTime = moment.unix(timestamp).format('MMMM D, Y hh:mm:ss');
      // 24h from block.timestamp, type = moment.Moment
      // block timestamp in ms
      const timestampDate = moment(momentTime).toLocaleString();
      const futureDate = moment(momentTime).add(24, 'hours').toLocaleString();
      const timeStampTime = new Date(timestampDate).getTime();
      const futureTime = new Date(futureDate).getTime();

      setBlockTimestamp(timeStampTime);
      setFutureDate(futureTime);

    }
    init();
    return () => {
      contract.removeAllListeners();
    }
  }, [totalShares]);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            DAO
          </Typography>
          {hasMetamask ? (
            walletAddress ? (
                <Button variant="contained" style={connectWallet} >
                  <span className="addressStyle">
                  {walletAddress}
                  </span>
                </Button>
            ) : (
              <Button
                variant="contained"
                style={connectWallet}
                onClick={() => enableWeb3()}
                disabled={isWeb3EnableLoading}
              >
                Connect Wallet
              </Button>
            )
          ) : (
            "INSTALL METAMASK MANG"
          )}
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              DAO
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              <Stack>
                <Timer futureDate={futureDate} blockTimestamp={blockTimestamp}/>
              </Stack>
            </Typography>
            <h1 className="totalShares">DAO's Shares: {totalShares} Eth</h1>
            {hasContributed ? <h1 className="totalShares">My Shares: {myShares} Eth</h1> : <></>}
            {/*conditional render here if hasContributed is true*/}
            <Grid
              container
              columnGap={6}
              >
            <Stack
              sx={{ pt: 4 }}
              spacing={2}
              justifyContent="center"
            >
              <FormInputText name='contribute' control={control} label='amount' />
              <Button variant="contained" onClick={() => contribute()}>Contribute</Button>
              {/*if contributed show redeem shares else show nothing*/}
              <br/>
              <FormInputText name='redeem' control={control} label='amount' />
              <Button variant="outlined" onClick={() => redeem()}>Redeem Shares</Button>
              <br/>
              <FormInputText name='transfer' control={control} label='amount' />
              <FormInputText name='to' control={control} label='to' />
              <Button variant="outlined" onClick={() => transfer()}>Transfer Shares</Button>
            </Stack>
            <Proposal contract={contract} /> 
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="md">
          {/** Content body
           * before 10 minutes are up, this will display a countdown component
           * investors create proposals, cards output each proposal
           *
           */}
          <Grid container spacing={4}>
            <div style={fillSpace}></div>
            {/* {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card style={cardStyle}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Governance Token
                    </Typography>
                    <Typography>
                      Proposal info...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))} */}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          DAO
        </Typography>
        <Typography variant="subtitle1" align="center">
          All investors will be accredited by shares proportional to the amount
          contributed
        </Typography>
      </Box>
    </>
  );
}
