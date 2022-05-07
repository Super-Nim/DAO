// TODO: receives created proposal from Proposal.tsx, outputs individually

import { Avatar, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import { ethers } from "moralis/node_modules/ethers";
import React, { useEffect, useState } from "react";
import { Proposal } from "../Proposal";
import '../scss/ProposalTable.scss';

// use npm react-countdown for 1 hours timer for each proposal
// Might need to use ProposalEvent[] to apply timer from timestamp
interface IProposalTableProps {
  contract: ethers.Contract;
  proposals: any[];
  walletAddress: string;
  key?: any;
}

const ProposalTable = ({contract, proposals, walletAddress, key}: IProposalTableProps) => {
  const [admin, setAdmin] = useState('');

  const vote = async (proposalId: number) => {
    console.log('proposalId vote called ', proposalId);
    await contract.vote(proposalId);
    const proposal = await contract.proposals(proposalId);
    console.log('total votes from proposal: ', proposal.votes.toString());
  }

  const executeProposal = async (proposalId: number) => {
    await contract.executeProposal(proposalId);
  };

  function isFinished(proposal: Proposal) {
    const now = new Date().getTime();
    // const endTime = proposal.endTime.toString();
    const proposalEnd =  new Date(parseInt(proposal.endTime.toString()) * 1000).getTime();
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
                  >{ethers.utils.formatEther(proposal.votes)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography 
                  >{(new Date(parseInt(proposal.endTime.toString()) * 1000)).toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  {proposal.executed ? 'Yes' : (
                    admin.toLowerCase() !== walletAddress.toLowerCase() ? 
                    <Button variant="contained" onClick={() => executeProposal(proposal.id.toNumber())}>Execute</Button>
                   : 'No')}
                </TableCell>
                <TableCell>
                  {isFinished(proposal) ? <Typography>Vote finished</Typography> : (
                    proposal?.hasVoted ? <Typography>Already voted</Typography> : (
                      <Button variant="contained" onClick={() => vote(proposal.id.toNumber())}>Vote</Button>
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

export default ProposalTable;