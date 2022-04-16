/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface DAOInterface extends utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "availableFunds()": FunctionFragment;
    "contribute()": FunctionFragment;
    "contributionEnd()": FunctionFragment;
    "createProposal(string,uint256,address)": FunctionFragment;
    "executeProposal(uint256)": FunctionFragment;
    "investors(address)": FunctionFragment;
    "nextProposalId()": FunctionFragment;
    "proposals(uint256)": FunctionFragment;
    "quorum()": FunctionFragment;
    "redeemShare(uint256)": FunctionFragment;
    "shares(address)": FunctionFragment;
    "totalShares()": FunctionFragment;
    "transferShare(uint256,address)": FunctionFragment;
    "vote(uint256)": FunctionFragment;
    "voteTime()": FunctionFragment;
    "votes(address,uint256)": FunctionFragment;
    "withdraw(uint256,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "admin"
      | "availableFunds"
      | "contribute"
      | "contributionEnd"
      | "createProposal"
      | "executeProposal"
      | "investors"
      | "nextProposalId"
      | "proposals"
      | "quorum"
      | "redeemShare"
      | "shares"
      | "totalShares"
      | "transferShare"
      | "vote"
      | "voteTime"
      | "votes"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "availableFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contribute",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contributionEnd",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createProposal",
    values: [string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "executeProposal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "investors", values: [string]): string;
  encodeFunctionData(
    functionFragment: "nextProposalId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "proposals",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "quorum", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeemShare",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "shares", values: [string]): string;
  encodeFunctionData(
    functionFragment: "totalShares",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferShare",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "vote", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "voteTime", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "votes",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "availableFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contributionEnd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeProposal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "investors", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nextProposalId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "quorum", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "shares", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalShares",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferShare",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voteTime", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "votes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {};
}

export interface DAO extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DAOInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    admin(overrides?: CallOverrides): Promise<[string]>;

    availableFunds(overrides?: CallOverrides): Promise<[BigNumber]>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    contributionEnd(overrides?: CallOverrides): Promise<[BigNumber]>;

    createProposal(
      name: string,
      amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    executeProposal(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    investors(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    nextProposalId(overrides?: CallOverrides): Promise<[BigNumber]>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, string, BigNumber, BigNumber, boolean] & {
        id: BigNumber;
        name: string;
        amount: BigNumber;
        recipient: string;
        votes: BigNumber;
        endTime: BigNumber;
        executed: boolean;
      }
    >;

    quorum(overrides?: CallOverrides): Promise<[BigNumber]>;

    redeemShare(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    shares(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    totalShares(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferShare(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vote(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    voteTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    votes(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  availableFunds(overrides?: CallOverrides): Promise<BigNumber>;

  contribute(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  contributionEnd(overrides?: CallOverrides): Promise<BigNumber>;

  createProposal(
    name: string,
    amount: BigNumberish,
    recipient: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  executeProposal(
    proposalId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  investors(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  nextProposalId(overrides?: CallOverrides): Promise<BigNumber>;

  proposals(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber, string, BigNumber, BigNumber, boolean] & {
      id: BigNumber;
      name: string;
      amount: BigNumber;
      recipient: string;
      votes: BigNumber;
      endTime: BigNumber;
      executed: boolean;
    }
  >;

  quorum(overrides?: CallOverrides): Promise<BigNumber>;

  redeemShare(
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  shares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  totalShares(overrides?: CallOverrides): Promise<BigNumber>;

  transferShare(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vote(
    proposalId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  voteTime(overrides?: CallOverrides): Promise<BigNumber>;

  votes(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  withdraw(
    amount: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    availableFunds(overrides?: CallOverrides): Promise<BigNumber>;

    contribute(overrides?: CallOverrides): Promise<void>;

    contributionEnd(overrides?: CallOverrides): Promise<BigNumber>;

    createProposal(
      name: string,
      amount: BigNumberish,
      recipient: string,
      overrides?: CallOverrides
    ): Promise<void>;

    executeProposal(
      proposalId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    investors(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    nextProposalId(overrides?: CallOverrides): Promise<BigNumber>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber, string, BigNumber, BigNumber, boolean] & {
        id: BigNumber;
        name: string;
        amount: BigNumber;
        recipient: string;
        votes: BigNumber;
        endTime: BigNumber;
        executed: boolean;
      }
    >;

    quorum(overrides?: CallOverrides): Promise<BigNumber>;

    redeemShare(amount: BigNumberish, overrides?: CallOverrides): Promise<void>;

    shares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalShares(overrides?: CallOverrides): Promise<BigNumber>;

    transferShare(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vote(proposalId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    voteTime(overrides?: CallOverrides): Promise<BigNumber>;

    votes(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    availableFunds(overrides?: CallOverrides): Promise<BigNumber>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    contributionEnd(overrides?: CallOverrides): Promise<BigNumber>;

    createProposal(
      name: string,
      amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    executeProposal(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    investors(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    nextProposalId(overrides?: CallOverrides): Promise<BigNumber>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quorum(overrides?: CallOverrides): Promise<BigNumber>;

    redeemShare(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    shares(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    totalShares(overrides?: CallOverrides): Promise<BigNumber>;

    transferShare(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vote(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    voteTime(overrides?: CallOverrides): Promise<BigNumber>;

    votes(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    availableFunds(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    contribute(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    contributionEnd(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createProposal(
      name: string,
      amount: BigNumberish,
      recipient: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    executeProposal(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    investors(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nextProposalId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposals(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quorum(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemShare(
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    shares(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalShares(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferShare(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vote(
      proposalId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    voteTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    votes(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
