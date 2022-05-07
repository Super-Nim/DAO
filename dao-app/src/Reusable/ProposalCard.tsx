// TODO: receives created proposal from Proposal.tsx, outputs individually

import { Avatar, Button, Card, CardActions, CardContent, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import { ethers } from "moralis/node_modules/ethers";
import React, { useEffect, useState } from "react";
import { Proposal } from "../Proposal";
import '../scss/ProposalCard.scss';
import MatTable from './Table';

// use npm react-countdown for 1 hours timer for each proposal
// Might need to use ProposalEvent[] to apply timer from timestamp
interface IProposalTableProps {
  contract: ethers.Contract;
  proposals: any[];
  walletAddress: string;
  key?: any;
}

const ProposalCard = ({contract, proposals, walletAddress, key}: IProposalTableProps) => {
  // useEffect(() => {
  //   proposals.map

  // },[proposal]);
  const data = proposals;
  const [admin, setAdmin] = useState('');

  const columns = [
    { title: 'ID', field: 'id'},
    { title: 'Name', field: 'name'},
    { title: 'Amount', field: 'amount'},
    { title: 'Recipient', field: 'recipient'},
    { title: 'Votes', field: 'votes'},
    { title: 'End Time', field: 'end'},
    { title: 'Executed', field: 'executed'}
  ]

  const containerStyle = {
    height: '79.5vh'
  };

  const tableStyle = {
    height: '79.5vh'
  };

  async function vote(ballotId: number) {
    await contract.vote(ballotId);
  };

  async function executeProposal(proposalId: number) {
    await contract.executeProposal(proposalId);
  };

  // TODO: replace with scss classes
  // const useStyles = makeStyles((theme) => ({
  //   table: {
  //     width: '1500px',
  //   },
  //   tableContainer: {
  //       borderRadius: 15,
  //       margin: '10px 10px',
  //       width: '1500px'
  //   },
  //   tableHeaderCell: {
  //       // fontWeight: 'bold',
  //       // backgroundColor: theme.palette.primary.dark,
  //       // color: theme.palette.getContrastText(theme.palette.primary.dark),
  //       // textAlign: 'center'
  //   },
  //   avatar: {
  //       backgroundColor: theme.palette.primary.light,
  //       color: theme.palette.getContrastText(theme.palette.primary.light)
  //   },
  //   name: {
  //       fontWeight: 'bold',
  //       color: theme.palette.secondary.dark
  //   },
  //   status: {
  //       fontWeight: 'bold',
  //       fontSize: '0.75rem',
  //       color: 'white',
  //       backgroundColor: 'grey',
  //       borderRadius: 8,
  //       padding: '3px 10px',
  //       display: 'inline-block'
  //   }
  // }));

  // const classes = useStyles();

  function isFinished(proposal: Proposal) {
    const now = new Date().getTime();
    const endTime = proposal.endTime.toString();
    const proposalEnd =  new Date(parseInt(endTime) * 1000).getTime();
    return (proposalEnd > now) ? false : true;
  }

  useEffect(() => {
    const init = async () => {
      const admin = await contract.admin() as string;
      setAdmin(admin);
    }
    init()
    

  }, [])

    
      return (
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >ID</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Amount</TableCell>
            <TableCell >Recipient</TableCell>
            <TableCell >Votes</TableCell>
            <TableCell >End Time</TableCell>
            <TableCell >Executed</TableCell>
            <TableCell >Vote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {proposals?.map((proposal) => (
            <TableRow key={proposal.id.toString()}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar src='.'>{proposal.id.toString()}</Avatar>
                      </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">{proposal.name}</Typography>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{proposal.amount.toString()}</Typography>
                </TableCell>
              <TableCell>{proposal.recipient.toString()}</TableCell>
              <TableCell>
                  <Typography 
                  >{proposal.votes.toString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                  >{proposal.endTime.toString()}</Typography>
                </TableCell>
                <TableCell>
                  {proposal.executed ? 'Yes' : (
                    admin.toLowerCase() === walletAddress.toLowerCase() ? 
                    <Button variant="contained" onClick={() => executeProposal(proposal.id)}></Button>
                   : 'No')}
                </TableCell>
                <TableCell>
                  {isFinished(proposal) ? <Typography>Vote finished</Typography> : (
                    proposal?.hasVoted ? <Typography>Already voted</Typography> : (
                      <Button variant="contained">Vote</Button>
                    )) }
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </TableContainer>
        
   
      )
}

export default ProposalCard;