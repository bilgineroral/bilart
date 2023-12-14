from db.trigger import Trigger

from modules.notification.model import NotificationModel
from modules.post.model import PostModel
from modules.bid.model import BidModel
from modules.auction.model import AuctionModel
from modules.favorite.model import FavoriteModel
from modules.art.model import ArtModel
from modules.user.model import UserModel
from modules.collector.model import CollectorModel

class BidTrigger(Trigger):
    @staticmethod
    def create_trigger() -> str:
        return f"""
        -- Step 1: Create the Trigger Function
        CREATE OR REPLACE FUNCTION check_bid_price()
        RETURNS TRIGGER AS $$
        DECLARE
            artPrice DECIMAL;
        BEGIN
            -- Get the price of the art associated with the bid
            SELECT {ArtModel.get_table_name()}.price INTO artPrice
            FROM {ArtModel.get_table_name()}
            INNER JOIN {AuctionModel.get_table_name()} ON {ArtModel.get_table_name()}.{ArtModel.get_identifier()} = {AuctionModel.get_table_name()}.{ArtModel.get_identifier()}
            WHERE {AuctionModel.get_table_name()}.{AuctionModel.get_identifier()} = NEW.{AuctionModel.get_identifier()};

            -- Check if the bid price is lower than the art's price
            IF NEW.price < artPrice THEN
                RAISE EXCEPTION 'Bid price cannot be lower than the art''s price.';
            END IF;

            -- If the check passes, allow the bid
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Step 2: Create the Trigger
        CREATE TRIGGER check_bid_before_insert
        BEFORE INSERT ON {BidModel.get_table_name()}
        FOR EACH ROW
        EXECUTE FUNCTION check_bid_price();
    
    
        -- Step 1: Update the Trigger Function
        CREATE OR REPLACE FUNCTION bid_notifier()
        RETURNS TRIGGER AS $$
        DECLARE
            artTitle VARCHAR(128);
            bidderName VARCHAR(128);
        BEGIN
            -- Get the title of the art associated with the auction
            SELECT {PostModel.get_table_name()}.title INTO artTitle
            FROM {ArtModel.get_table_name()}
            NATURAL JOIN {PostModel.get_table_name()}
            NATURAL JOIN {AuctionModel.get_table_name()}
            WHERE {AuctionModel.get_table_name()}.{AuctionModel.get_identifier()} = NEW.{AuctionModel.get_identifier()};
            
            SELECT {UserModel.get_table_name()}.username INTO bidderName
            FROM {UserModel.get_table_name()}
            NATURAL JOIN {CollectorModel.get_table_name()}
            WHERE {CollectorModel.get_table_name()}.{CollectorModel.get_identifier()} = NEW.{CollectorModel.get_identifier()};

            -- Notify the user who made the new bid
            INSERT INTO {NotificationModel.get_table_name()}(content, {UserModel.get_identifier()})
            SELECT 'You made a new bid on "' || artTitle || '"',
                (SELECT {UserModel.get_identifier()} FROM {CollectorModel.get_table_name()} 
                WHERE {CollectorModel.get_identifier()} = NEW.{CollectorModel.get_identifier()})
                WHERE NEW.{BidModel.get_identifier()} IS NOT NULL;

            -- Notify all other users who have made a bid in the same auction
            INSERT INTO {NotificationModel.get_table_name()}(content, {UserModel.get_identifier()})
            SELECT 'New bid made on "' || artTitle || '" by collector ' || bidderName,
                (SELECT {UserModel.get_identifier()} FROM {CollectorModel.get_table_name()} WHERE {CollectorModel.get_identifier()} = {BidModel.get_table_name()}.{CollectorModel.get_identifier()})
            FROM {BidModel.get_table_name()}
            WHERE {BidModel.get_table_name()}.{AuctionModel.get_identifier()} = NEW.{AuctionModel.get_identifier()} AND {BidModel.get_table_name()}.{CollectorModel.get_identifier()} != NEW.{CollectorModel.get_identifier()};

            -- Notify users who have favorited the art
            INSERT INTO {NotificationModel.get_table_name()}(content, {UserModel.get_identifier()})
            SELECT 'New bid made on "' || artTitle || '"',
                (SELECT {UserModel.get_identifier()} FROM {CollectorModel.get_table_name()} WHERE {CollectorModel.get_identifier()} = F.{CollectorModel.get_identifier()})
            FROM {FavoriteModel.get_table_name()}
            NATURAL JOIN {ArtModel.get_table_name()}
            NATURAL JOIN {AuctionModel.get_table_name()}
            WHERE {AuctionModel.get_table_name()}.{AuctionModel.get_identifier()} = NEW.{AuctionModel.get_identifier()};

            -- Return the new record
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Step 2: (Re)Create the Trigger
        DROP TRIGGER IF EXISTS bid_after_insert ON {BidModel.get_table_name()};

        CREATE TRIGGER bid_after_insert
        AFTER INSERT ON {BidModel.get_table_name()}
        FOR EACH ROW
        EXECUTE FUNCTION bid_notifier();
        """