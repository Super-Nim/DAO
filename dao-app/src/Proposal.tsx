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
import ProposalCard from "./Reusable/ProposalCard";
type ProposalInputProps = {
  contract: ethers.Contract;
};

export interface Proposal {
  id: BigNumberish;
  name: string;
  amount: BigNumberish;
  recipient: BigNumberish;
  votes: BigNumberish;
  endTime: BigNumberish;
  executed: boolean;
}

// pass Proposal types to re-usable comp
export interface ProposalEvent extends Proposal {
  timestamp?: BigNumberish;
}

const Proposal = ({ contract }: ProposalInputProps) => {
  const methods = useForm();
  const { control, getValues } = methods;
  const [ proposals, setProposals ] = useState<Proposal[]>([{
    id: 0,
    name: '',
    amount: 0,
    recipient: 0,
    votes: 0,
    endTime: 0,
    executed: false
  }]);

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
    let proposalStruct: Proposal[];
    /// @dev fetches proposal on creation
    if (id) {
      const proposal = await contract.proposals(id);
      proposalStruct = proposal.map((prop: any) => {
        if (isBigNumberish(prop)) {
          return prop.toString();
        } else {
          return prop;
        }
      });
      setProposals(proposalStruct);
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
    // TODO: getendTime of proposal, pass to ProposalCard.tsx
    // let time = new Date(proposalStruct[5].toString());
    // let normalDate = new Date(proposalStruct[5].toString()).toLocaleString(
    //   "en-GB",
    //   { timeZone: "UTC" }
    // );
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
        // const filterFromMe = contract.filters.proposalCreated(id, timestamp);

        //TODO: add filters to contract to get specific event...
        // contract.filters
        // make this a new func
        // const proposal = await getProposal(id as number);
        // setProposals(proposal);
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
      console.log('useState: ', )
      listenToProposalCreated();
      console.log('proposals length: ', proposals.length);
    };
    init();

    return () => {
      contract.removeAllListeners();
    };
  }, [proposals]);

  return (
    <Grid>
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
      <Stack>
        {proposals.length > 0 ?     
          proposals.map((proposal: Proposal) => {
          return <ProposalCard proposal={proposal}/>
          })
        : <></>}
        
      </Stack>
    </Grid>
  );
};

export default Proposal;
