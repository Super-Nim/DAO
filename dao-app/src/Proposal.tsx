import {
  isBigNumberish,
  BigNumberish,
} from "@ethersproject/bignumber/lib/bignumber";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import moment from "moment";
import abi from "./abi/abi.json";

import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
} from "react-hook-form";
import FormInputText from "./Reusable/FormInput";
import { arrayBuffer } from "stream/consumers";
type ProposalInputProps = {
  contract: ethers.Contract;
  walletAddress: string;
};

export interface Proposal {
  id: BigNumberish;
  name: string;
  amount: BigNumberish;
  recipient: BigNumberish;
  votes: BigNumberish;
  endTime: BigNumberish;
  executed: boolean;
  hasVoted?: boolean;
}

export interface newProposal {
  id: number;
  name: string;
  amount: number;
  recipient: number;
  votes: number;
  endTime: number;
  executed: boolean;

}

// pass Proposal types to re-usable comp
export interface ProposalEvent extends Proposal {
  timestamp?: BigNumberish;
}

const Proposal = ({ contract, walletAddress }: ProposalInputProps) => {
  const methods = useForm();
  const { control, getValues } = methods;
  const [ proposals, setProposals ] = useState<Proposal[]>([]);

  const createProposal = async () => {
    const name = getValues("proposalName");
    const amount = getValues("proposalAmount");
    const to = getValues("proposalTo");
    const txh = await contract.createProposal(name, amount, to);
    const txReceipt = await txh.wait();
    console.log("txh: ", txh);
    console.log('wait ', txReceipt.events[0].args);
    // this returns proposal struct
    const proposalId = txReceipt.events[0].args[0].toNumber();
    console.log('created ProposalId: ', proposalId);
    const createdProposal = await getProposal(proposalId)

    console.log('created Proposal Struct: ', createdProposal);
  };

  const getProposal = async (id?: number) => {
    let proposalStruct: Proposal[] | undefined;
    /// @dev fetches proposal on creation
    if (id) {
      const nextProposalId = await contract.nextProposalId();
      const proposals: Proposal[] = [];
      /// @notice update proposals array with every proposal
      for(let i = 0; i < nextProposalId; i++) {
        console.log('let i =', i);
        const [proposal, hasVoted] = await Promise.all([
          contract.proposals(i),
          contract.votes(walletAddress, i)
        ]);
        proposals.push({...proposal, hasVoted});
      }
      setProposals(proposals);
      return proposals;


    } 
    /// @dev fetches proposal by inputted id
    else {
      const proposal = getValues("getProposal") as number;
      const txh: any[] = await contract.proposals(proposal);
      proposalStruct = txh.map((prop) => {
        if (isBigNumberish(prop)) {
          return prop.toString();
        } else {
          return prop;
        }
      });  
    }
    console.log('getProposal ', proposalStruct);
    return proposalStruct;
  };

  /// @notice fetches most recent proposal and passes as props to re-usable component
  // TODO: fix event listener, isn't listening for every propsoal for some reason???
  const listenToProposalCreated =  () => {
  
    contract.on(
      "proposalCreated", ({
        id,
        timestamp,
        name,
        amount,
        recipient,
        votes,
        endTime,
        executed,
      }) => {
        console.log("proposalCreated: ", id, timestamp, name, recipient);

        const date = moment
          .unix(timestamp as number)
          .format("MMMM D, Y hh:mm:ss");
        console.log(
          `Proposal, ${name}, created on ${date} has been pre-funded with ${amount} ETH`
        );
      }
    );
  };

  useEffect(() => {
    const init = async () => {
      listenToProposalCreated();
      console.log('proposals length: ', proposals.length);
    };
    init();

    return () => {
      contract.removeAllListeners();
    };
  }, [proposals]);

  return {
    proposals,
    getProposal,
    render:(
    <Grid
      container
      spacing={1}
    >
      <Stack sx={{ pt: 4 }} spacing={2} justifyContent="center">
        <FormInputText name="proposalName" control={control} label="name" />
        <FormInputText name="proposalAmount" control={control} label="amount" />
        <FormInputText name="proposalTo" control={control} label="to" />
        <Button variant="contained" onClick={() => createProposal()}>
          Create Proposal
        </Button>
        <hr />
        <FormInputText name="getProposal" control={control} label="name" />
        <Button variant="contained" onClick={() => getProposal()}>
          Get Proposal
        </Button>
      </Stack>
    </Grid>
  )};
};

export default Proposal;
