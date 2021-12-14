import bcrypt from "bcrypt";
import { CreateAuctionDto } from "@dtos/auctions.dto";
import { CreateBidDto } from "@dtos/bids.dto";
import { HttpException } from "@exceptions/HttpException";
import { Auction } from "@interfaces/auctions.interface";
import { Bid } from "@interfaces/bids.interface";
import auctionModel from "@models/auctions.model";
import { isEmpty } from "@utils/util";

class AuctionService {
  public auctions = auctionModel;

  public async findAllAuction(): Promise<Auction[]> {
    const auctions: Auction[] = await this.auctions.find();
    return auctions;
  }

  public async findAuctionById(auctionId: string): Promise<Auction> {
    if (isEmpty(auctionId)) throw new HttpException(400, "You're not humanId");

    const findAuction: Auction = await this.auctions.findOne({
      _id: auctionId,
    });
    if (!findAuction) throw new HttpException(409, "You're not human");

    return findAuction;
  }

  public async findAuctionByTokenId(tokenId: string): Promise<Auction> {
    if (isEmpty(tokenId)) throw new HttpException(400, "You're not humanId");

    const findAuction: Auction = await this.auctions.findOne({
      tokenId: tokenId,
    });
    if (!findAuction) throw new HttpException(409, "You're not human");

    return findAuction;
  }

  public async createAuction(auctionData: CreateAuctionDto): Promise<Auction> {
    if (isEmpty(auctionData))
      throw new HttpException(400, "You're not auctionData");

    const createAuctionData: Auction = await this.auctions.create({
      ...auctionData,
    });

    return createAuctionData;
  }

  public async createBid(tokenId: string, bidData: CreateBidDto): Promise<Bid> {
    if (isEmpty(bidData)) throw new HttpException(400, "You're not bidData");

    const findAuction: Auction = await this.findAuctionByTokenId(tokenId);
    const length = findAuction.bids.push(bidData);
    await this.auctions.findByIdAndUpdate(findAuction._id, findAuction);

    return findAuction.bids[length - 1];
  }

  public async updateExecuted(
    tokenId: string,
    executed: boolean
  ): Promise<Auction> {
    const findAuction: Auction = await this.findAuctionByTokenId(tokenId);
    const updateAuctionByTokenId: Auction =
      await this.auctions.findByIdAndUpdate(findAuction._id, {
        executed,
      });
    if (!updateAuctionByTokenId)
      throw new HttpException(409, "You're not human");

    return updateAuctionByTokenId;
  }

  public async updateAuction(
    auctionId: string,
    auctionData: CreateAuctionDto
  ): Promise<Auction> {
    if (isEmpty(auctionData))
      throw new HttpException(400, "You're not humanData");
    const updateAuctionById: Auction = await this.auctions.findByIdAndUpdate(
      auctionId,
      {
        ...auctionData,
      }
    );
    if (!updateAuctionById) throw new HttpException(409, "You're not human");

    return updateAuctionById;
  }
}

export default AuctionService;
