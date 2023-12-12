from routers.user import router as user_router
from routers.art import router as art_router
from routers.admin import router as admin_router
from routers.auction import router as auction_router
from routers.bid import router as bid_router
from routers.collection import router as collection_router
from routers.collector import router as collector_router
from routers.rating import router as rating_router
from routers.tag import router as tag_router


routers = [
    user_router,
    art_router,
    admin_router,
    auction_router,
    bid_router,
    collection_router,
    collector_router,
    rating_router,
    tag_router
]