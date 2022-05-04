// TODO: receives created proposal from Proposal.tsx, outputs individually

import { Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Proposal } from "../Proposal";
import '../scss/ProposalCard.scss';
import MatTable from './Table';

// use npm react-countdown for 1 hours timer for each proposal
// Might need to use ProposalEvent[] to apply timer from timestamp
interface IProposalTableProps {
  proposals: any[];
  key?: any;
}

const ProposalCard = ({proposals, key}: IProposalTableProps) => {
  // useEffect(() => {
  //   proposals.map

  // },[proposal]);
  const data = proposals;

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
    
      return (
        <div style={{...containerStyle}}>
        <MatTable
          title={<h1>Donations Sent</h1>}
          columns={columns}
          data={data}
          style={{...tableStyle}}
          />
      </div>
      )
}

export default ProposalCard;