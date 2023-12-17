import {get, post, put, deleteItem, toQueryString} from "./crude.js";

export const getBid = async (bid_id: number): Promise<Bid> => {
    return get<Bid>(`https://your-api-url.com/bids/${bid_id}`);
};


type BidQueryParams = {
    bid_id?: number;
    price?: string;
    gt__price?: string;
    lt__price?: string;
    auction_id?: number;
    collector_id?: number;
    payment_done?: boolean;
    created_at?: string;
};

export const getBids = async (params: BidQueryParams): Promise<Bid[]> => {
    const queryString = toQueryString(params);
    return get<Bid[]>(`https://your-api-url.com/bids?${queryString}`);
};

type CreateBidData = {
    price: string;
    auction_id: number;
};

export const createNewBid = async (data: CreateBidData): Promise<Bid> => {
    return post<CreateBidData, Bid>(`https://your-api-url.com/bids`, data);
};

export const deleteBid = async (bid_id: number): Promise<void> => {
    await deleteItem(`https://your-api-url.com/bids/${bid_id}`, null);
};

export const acceptPayment = async (bid_id: number): Promise<void> => {
    await post<{bid_id: number}, void>(`https://your-api-url.com/bids/accept_payment/${bid_id}`, { bid_id });
};