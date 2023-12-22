from db.view import View


class ArtView(View):
    @staticmethod
    def get_table_name() -> str:
        return "HomeView"
    
    @staticmethod
    def create_view() -> str:
        return f"""
        CREATE VIEW {ArtView.get_table_name()} AS
        SELECT *, COUNT(Rating.rating_id) as rating_count
        FROM Post
        NATURAL JOIN Art
        NATURAL JOIN Rating
        WHERE Art.collector_id IS NULL
        GROUP BY art_id, post_id, rating_id
        ORDER BY rating_count DESC;
        """
