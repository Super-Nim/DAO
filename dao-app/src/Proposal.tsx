import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { Button, Container, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
} from "react-hook-form";
import FormInputText from "./Reusable/FormInput";
type ProposalInputProps = {
  contract: ethers.Contract;
};

const Proposal = ({ contract }: ProposalInputProps) => {
  const methods = useForm();
  const { control, getValues } = methods;

  const createProposal = async () => {
    const name = getValues("proposalName");
    const amount = getValues("proposalAmount");
    const to = getValues("proposalTo");
    const txh = await contract.createProposal(name, amount, to);
    console.log("txh: ", txh);
  };

  const getProposal = async () => {
    const proposal = getValues("getProposal") as number;
    const txh: any[] = await contract.proposals(proposal);
    const proposalStruct = txh.map((prop) => {
      if (isBigNumberish(prop)) {
        return prop.toString();
      } else {
        return prop;
      }
    });
    // TODO: getendTime of proposal, pass to ProposalCard.tsx
    let time = new Date(proposalStruct[5].toString());
    let normalDate = new Date(proposalStruct[5].toString()).toLocaleString("en-GB", { timeZone: "UTC" });
    console.log('time: ', time);
    console.log(normalDate);
    console.log("getProposal ", proposalStruct);
  };

  useEffect(() => {
    const init = async () => {
    }
    init();
  })
  return (
    <section>
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
    </section>
  );
};

export default Proposal;
