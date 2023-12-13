from abc import ABC
from typing_extensions import Protocol


class TriggerProtocal(Protocol):
    @staticmethod
    def create_trigger():
        ...


class Trigger(ABC):
    @staticmethod
    def create_trigger():
        ...
