from typing import Tuple
from db import PgDatabase

create_functions: list[str] = [
    """
    CREATE TABLE "User" (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        profile_image VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        phone VARCHAR(16)
    );
    """,
    """
    CREATE TABLE Collector (
        collector_id SERIAL PRIMARY KEY,
        user_id INT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES "User" (user_id)
    );
    """,
    """
    CREATE TABLE Artist (
        artist_id SERIAL PRIMARY KEY,
        bio VARCHAR(500),
        link VARCHAR(255),
        user_id INT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES "User" (user_id)
    );
    """,
    """
    CREATE TABLE Admin (
        admin_id SERIAL PRIMARY KEY,
        privileges VARCHAR(1),
        user_id INT UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES "User" (user_id)
    );
    """,
    """
    CREATE TABLE Post (
        post_id SERIAL PRIMARY KEY,
        artist_id INT UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
    """,
    """
    CREATE TABLE Collection (
        collection_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        collector_id INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        CONSTRAINT fk_collector
            FOREIGN KEY(collector_id)
                REFERENCES Collector(collector_id)
                ON DELETE CASCADE
    );
    """,
    """
    CREATE TABLE Art (
        art_id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        initial_price DECIMAL,
        artist_id INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        CONSTRAINT fk_artist
            FOREIGN KEY(artist_id)
                REFERENCES Artist(artist_id)
                ON DELETE CASCADE
    );
    """,
    """
    CREATE TABLE Notification (
        notification_id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        seen BOOLEAN NOT NULL DEFAULT FALSE,
        user_id INT NOT NULL,
        CONSTRAINT fk_notf
            FOREIGN KEY(user_id)
                REFERENCES Collector(user_id)
    );
    """,
    """
    CREATE TABLE Collection_Art(
        art_id INT,
        collection_id INT,
        CONSTRAINT fk_art
            FOREIGN KEY(art_id)
                REFERENCES Art(art_id)
                ON DELETE CASCADE,
        CONSTRAINT fk_collection
            FOREIGN KEY(collection_id)
                REFERENCES Collection(collection_id)
                ON DELETE CASCADE,
    CONSTRAINT collection_art_pk PRIMARY KEY(collection_id, art_id)
    );
    """,
    """
    CREATE TABLE Rating (
        rating_id SERIAL PRIMARY KEY,
        score SMALLINT NOT NULL,
        comment VARCHAR(500),
        post_id int NOT NULL,
        collector_id INT NOT NULL,
        CONSTRAINT fk_art
            FOREIGN KEY(post_id)
                REFERENCES Post(post_id)
                ON DELETE CASCADE,
        CONSTRAINT fk_collector
            FOREIGN KEY(collector_id)
                REFERENCES Collector(collector_id)
                ON DELETE CASCADE
    );
    """,
    """
    CREATE TABLE Tag (
        tag_name VARCHAR(255) PRIMARY KEY
    );
    
    CREATE TABLE Tag_JUNCTION_Art (
        tag_name VARCHAR(255) REFERENCES Tag(tag_name),
        art_id SERIAL REFERENCES Art(art_id),
        CONSTRAINT tag_art_pk PRIMARY KEY(tag_name, art_id)
    );
    """,
    """
    CREATE TABLE Auction (
        auction_id SERIAL PRIMARY KEY,
        start_time TIMESTAMPTZ NOT NULL,
        end_time TIMESTAMPTZ NOT NULL,
        active BOOLEAN NOT NULL DEFAULT True,
        art_id INT NOT NULL,
        CONSTRAINT fk_art
            FOREIGN KEY(art_id)
                REFERENCES Art(art_id)
                ON DELETE CASCADE
    );
    """,
    """
    CREATE TABLE Bid (
        bid_id SERIAL PRIMARY KEY,
        price DECIMAL NOT NULL,
        auction_id INT NOT NULL,
        collector_id INT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
        payment_done BOOLEAN NOT NULL DEFAULT False
    );
    """
]


def create_tables() -> Tuple[bool, str]:
    commands = "\n".join(create_functions)
    
    with PgDatabase() as db:
        try:
            db.cursor.execute(commands)
            db.connection.commit()
            return True, "Tables have been created successfully..."
        except Exception as e:
            print("ere")
            return False, str(e)
