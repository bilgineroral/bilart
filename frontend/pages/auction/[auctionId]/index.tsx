import * as React from "react";
import { useRouter } from "next/router";
import {
  Badge,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { getAuction } from "@/api/auction";
import { useSnackbar } from "@/store/snackbar";
import { getArt } from "@/api/art";
import { acceptPayment, getBids } from "@/api/bid";
import { getTags } from "@/api/tags";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DomainDivider } from "@/components/shared";

const AuctionPage: React.FC = () => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const theme = useTheme();
  const { query } = router;
  const auctionId = query.auctionId;

  const [art, setArt] = React.useState<Art>();
  const [auction, setAuction] = React.useState<Auction>();
  const [bids, setBids] = React.useState<Bid[]>([]);
  const [bidCount, setBidCount] = React.useState<number>(0);
  const [tags, setTags] = React.useState<Tag[]>([]);

  const fetchArt = async (auction: Auction): Promise<Art | null> => {
    try {
      const data = await getArt(auction.art_id);
      console.log(data);
      if (data.success && data.data != null) {
        setArt(data.data);
        return data.data;
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const fetchAuction = async (): Promise<Auction | null> => {
    try {
      const data = await getAuction(Number(auctionId));
      console.log(data);
      if (data.success && data.data != null) {
        setAuction(data.data);
        return data.data;
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  const fetchBids = async (auction: Auction) => {
    try {
      const data = await getBids({ auction_id: auction.auction_id, price_order: 'desc' });
      console.log(data);
      if (data.success && data.data != null) {
        setBids(data.data);
        setBidCount(data.count ?? 0);
      } else {
        snackbar("error", "unknown error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTags = async (art: Art) => {
    try {
      const data = await getTags({ post_id: art.post_id });
      console.log(data);
      if (data.data != null) {
        setTags(data.data);
      } else {
        snackbar("error", "failed to fetched");
      }
    } catch (err) {
      console.log(err);
      snackbar("error", "failed to fetched");
    }
  };

  const fetch = async () => {
    const auction = await fetchAuction();
    if (auction != null) {
      const art = await fetchArt(auction);
      fetchBids(auction);
      if (art != null) {
        fetchTags(art);
      }
    }
  };

  

  React.useEffect(() => {
    fetch();
  }, [auctionId]);

  const onSelectBid = (bid: Bid) => {
    fetch();
  }

  const formatDate = (dateString: string): string => {
    const timestamp = Date.parse(dateString);
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  };

  return (
    <Stack direction="column" gap={2} sx={{ height: "100%", padding: "20px" }}>
      <Stack
        direction="column"
        gap={1}
        sx={{ position: "relative", height: "100%" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="#fff">
            {art?.title}
          </Typography>
          <div>
            {React.Children.toArray(
              tags.map((tagname) => (
                <Chip
                  label={tagname.tag_name}
                  sx={{ marginLeft: "10px" }}
                  color="primary"
                />
              ))
            )}
          </div>
        </div>
        <DomainDivider color={theme.palette.primary.main} />
        <Typography variant="h4" color="#fff">
          TL {art?.price}
        </Typography>

        <div style={{ display: "flex" }}>
          <Typography
            variant="h5"
            color="#fff"
            style={{ paddingRight: "10px" }}
          >
            Auction
          </Typography>
          <Chip
            label={auction?.active ? "Active" : "Inactive"}
            color={auction?.active ? "primary" : "secondary"}
          />
        </div>
        <DomainDivider color={theme.palette.primary.main} />

        <Typography variant="body1" color="#fff">
          Staring date: {formatDate(auction?.start_time as any)}
        </Typography>
        <Typography variant="body1" color="#fff">
          End date: {formatDate(auction?.end_time as any)}
        </Typography>
        <Typography variant="body1" color="#fff">
          Bid count: {bidCount}
        </Typography>
        <Typography variant="body1" color="#fff">
          Highest bid: {bidCount}
        </Typography>

        <Bids bids={bids} onAcceptBid={onSelectBid} />
      </Stack>
    </Stack>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps() {
  return {
    props: {
      navbar: true,
    },
  };
}

export default AuctionPage;

type BidsProps = {
  bids: Bid[];
  onAcceptBid: (bid: Bid) => void;
};

const Bids: React.FC<BidsProps> = ({ bids, onAcceptBid }) => {
  return (
    <div style={{ padding: "20px", borderRadius: "10px" }}>
      {bids.map((bid, index) => (
        <div
          key={bid.bid_id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "white",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span style={{ paddingLeft: "10px" /* , paddingRight: "30%" */ }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              {bid.profile_image && (
                <img
                  src={bid.profile_image}
                  alt={`${bid.username}'s profile`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "15px",
                  }}
                />
              )}
            </div>
            <b>{bid.username}</b>
          </span>

          <span
            style={{
              color: "#808080",
            }}
          >
            Offering Price: TL {bid.price}
            {
                (index == 0 && (<Chip label={"Highest"} style={{marginLeft: "10px"}}></Chip>))
            }
          </span>


          <BidCheckmark bid={bid} onAcceptBid={onAcceptBid} />
        </div>
      ))}
    </div>
  );
};

type BidCheckmarkProbs = {
  bid: Bid;
  onAcceptBid: (bid: Bid) => void
};

const BidCheckmark: React.FC<BidCheckmarkProbs> = ({ bid, onAcceptBid }) => {
  const [checked, setChecked] = React.useState(false);

  const handleCheck = async (bid: Bid) => {
    const data = await acceptPayment(bid.bid_id);
    if (data.success) {
      setChecked(true);
      onAcceptBid(bid);
    }
  };

  return (
    <IconButton
      onClick={() => handleCheck(bid)}
      color="success"
      aria-label="check"
    >
      {checked ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
    </IconButton>
  );
};
