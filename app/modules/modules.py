from typing import Type
from db.model import ModelProtocal

from modules.admin.model import AdminModel
from modules.art.model import ArtModel
from modules.art__collection.model import ArtCollectionModel
from modules.artist.model import ArtistModel
from modules.auction.model import AuctionModel
from modules.bid.model import BidModel
from modules.collection.model import CollectionModel
from modules.collector.model import CollectorModel
from modules.favorite.model import FavoriteModel
from modules.notification.model import NotificationModel
from modules.post.model import PostModel
from modules.rating.model import RatingModel
from modules.report.model import ReportModel
from modules.tag.model import TagModel
from modules.tag__post.model import TagPostModel
from modules.tutorial.model import TutorialModel
from modules.user.model import UserModel


models: list[Type[ModelProtocal]] = [
    AdminModel,
    ArtModel,
    ArtCollectionModel,
    ArtistModel,
    AuctionModel,
    BidModel,
    CollectionModel,
    CollectorModel,
    FavoriteModel,
    NotificationModel,
    PostModel,
    RatingModel,
    ReportModel,
    TagModel,
    TagPostModel,
    TutorialModel,
    UserModel
]

models.sort(key=lambda x: x.get_create_order())

create_functions = [model.create_table() for model in models]

routers = [model.get_router() for model in models]