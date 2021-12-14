import { IWeb3Listener } from "@interfaces/web3.interface";
import Web3 from "web3";
import { CreateHumanDto } from "@dtos/humans.dto";
import { CreateAuctionDto } from "./dtos/auctions.dto";
import { CreateBidDto } from "./dtos/bids.dto";

import HumanABI from "@abis/Human.json";
import HumanConverterABI from "@abis/HumanConverter.json";
import HumanERC20ABI from "@abis/HumanERC20.json";
import HumanERC20StakerABI from "@abis/HumanERC20Staker.json";
import HumanAuctionABI from "@abis/HumanAuction.json";

import HumanService from "@/services/humans.service";
import AuctionService from "@/services/auctions.service";
import { CreateRequestDto } from "./dtos/requests.dto";

import { Request } from "@/interfaces/requests.interface";

class Web3Listener implements IWeb3Listener {
  public web3: Web3;
  public humanService: HumanService = new HumanService();
  public auctionService: AuctionService = new AuctionService();

  public humanContract;
  public converterContract;
  public tokenContract;
  public stakerContract;
  public auctionContract;

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.WebsocketProvider("ws://localhost:7545")
    );
    this.initializeContract();
    this.initializeListener();
  }

  public initializeContract() {
    const humanAddress = "0x69cD9841c6Aa81691f46b64A51E0f8b426035662";
    const auctionAddress = "0x3641033a73b50193A2E4C4f03f5183fCF2FD4999";
    const tokenAddress = "0x4c7d30B2Ab739E69791da9dAE5f2538F762F964F";
    const converterAddress = "0x52Bf4824041Bf8cEb63d951DA6eDd28531A7fdf6";

    this.humanContract = new this.web3.eth.Contract(
      HumanABI.abi as any,
      humanAddress
    );

    this.converterContract = new this.web3.eth.Contract(
      HumanConverterABI.abi as any,
      converterAddress
    );

    this.tokenContract = new this.web3.eth.Contract(
      HumanERC20ABI.abi as any,
      tokenAddress
    );

    this.stakerContract = new this.web3.eth.Contract(
      HumanERC20StakerABI.abi as any,
      humanAddress
    );

    this.auctionContract = new this.web3.eth.Contract(
      HumanAuctionABI.abi as any,
      auctionAddress
    );
  }

  public initializeListener() {
    this.humanContract.events.Mint().on("data", (event) => {
      let data = event.returnValues;
      const humanDto = new CreateHumanDto();
      humanDto.tokenId = data.tokenId;
      humanDto.owner = data.to;
      humanDto.name = data.human.name;
      humanDto.description = data.human.description;
      humanDto.image = "test";
      humanDto.staked = false;
      // humanDto.requests = [];
      this.humanService.createHuman(humanDto);
    });

    this.auctionContract.events.AddAuction().on("data", (event) => {
      let data = event.returnValues;
      const auctionDto = new CreateAuctionDto();
      auctionDto.tokenId = data.tokenId;
      auctionDto.deadline = data.auction.deadline;
      auctionDto.executed = false;
      auctionDto.bids = [data.auction.lastBid];
      this.auctionService.createAuction(auctionDto);
    });

    this.auctionContract.events.AddBid().on("data", (event) => {
      let data = event.returnValues;
      const bidDto = new CreateBidDto();
      bidDto.bidder = data.bid.bidder;
      bidDto.balance = data.bid.balance;
      bidDto.time = data.bid.time;
      this.auctionService.createBid(data.tokenId, bidDto);
    });

    this.auctionContract.events.Execute().on("data", (event) => {
      let data = event.returnValues;
      this.auctionService.updateExecuted(data.tokenId, true);
      console.log("web3.auctionContract.events.Execute() => ", data);
    });

    this.converterContract.events.Stake().on("data", (event) => {
      let data = event.returnValues;
      const humanDto = new CreateHumanDto();
      humanDto.staked = true;
      humanDto.fee = data.fee;
      humanDto.balance = "0";
      humanDto.manual = data.isManual;
      this.humanService.updateHumanByTokenId(data.tokenId, humanDto);
      console.log("web3.converterContract.events.Stake() => ", data);
    });

    this.converterContract.events.Unstake().on("data", (event) => {
      let data = event.returnValues;
      const humanDto = new CreateHumanDto();
      humanDto.staked = false;
      humanDto.fee = "0";
      humanDto.balance = "0";
      humanDto.manual = false;
      console.log("web3.converterContract.events.Unstake() => ", data);
      this.humanService.updateHumanByTokenId(data.tokenId, humanDto);
    });

    this.converterContract.events.AddRequest().on("data", (event) => {
      let data = event.returnValues;
      console.log("web3.converterContract.events.AddRequest() => ", data);
      const requestDto = new CreateRequestDto();
      requestDto.client = data.request.client;
      requestDto.converter = data.request.converter;
      requestDto.humanNumber = data.request.humanNumber;
      requestDto.sourceUri = data.request.sourceUri;
      requestDto.status = data.request.status;
      this.humanService.createRequest(data.request.tokenId, requestDto);
    });

    this.converterContract.events.Use().on("data", (event) => {
      let data = event.returnValues;
      console.log("web3.converterContract.events.Use() => ", data);
      // const humanDto = new CreateHumanDto();
      // humanDto.staked = false;
      // humanDto.fee = "0";
      // humanDto.balance = "0";
      // humanDto.manual = false;
      // console.log("web3.converterContract.events.Unstake() => ", data);
      this.humanService.addBalance(data.tokenId, data.balance);
    });
  }
}

export default Web3Listener;
