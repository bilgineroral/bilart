import {get, post, put, deleteItem, toQueryString} from "./crude.js";

export const getAuction = async (auctionId: number): Promise<Auction> => {
    return get<Auction>(`https://your-api-url.com/auctions/${auctionId}`);
};

type AuctionQueryParams = {
    start_time?: string;
    end_time?: string;
    gt__startTime?: string;
    gt__endTime?: string;
    lt__startTime?: string;
    lt__endTime?: string;
    active?: boolean;
    art_id?: number;
};

export const getAuctions = async (params: AuctionQueryParams): Promise<Auction[]> => {
    const queryString = toQueryString(params);
    return get<Auction[]>(`https://your-api-url.com/auctions?${queryString}`);
};


type NewAuctionData = {
    start_time: string;
    end_time: string;
    active: boolean;
    art_id: number;
};

export const createNewAuction = async (data: NewAuctionData): Promise<Auction> => {
    return post<NewAuctionData, Auction>(`https://your-api-url.com/auctions`, data);
};


type UpdateAuctionData = {
    start_time?: string;
    end_time?: string;
    active?: boolean;
};

export const updateAuction = async (auctionId: number, data: UpdateAuctionData): Promise<Auction> => {
    return put<UpdateAuctionData, Auction>(`https://your-api-url.com/auctions/${auctionId}`, data);
};

export const deleteAuction = async (auctionId: number): Promise<void> => {
    await deleteItem(`https://your-api-url.com/auctions/${auctionId}`, null);
};



