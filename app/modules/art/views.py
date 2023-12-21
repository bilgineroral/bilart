from db.view import View


class ArtView(View):
    @staticmethod
    def get_name() -> str:
        return "HomeView"
    
    @staticmethod
    def create_view() -> str:
        return f"""
        CREATE VIEW {ArtView.get_name()} AS
        SELECT * FROM Post
        NATURAL JOIN Art
        WHERE Art.collector_id IS NULL;
        """