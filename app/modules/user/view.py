from db.view import View


class UserView(View):
    @staticmethod
    def get_name() -> str:
        return "AllUsersView"

    @staticmethod
    def create_view() -> str:
        return f"""
        CREATE VIEW {UserView.get_name()} AS
        SELECT * FROM "User"
        NATURAL JOIN Admin
        NATURAL JOIN Collector
        NATURAL JOIN Artist;
        """
