from db.view import View


class ReportView(View):
    @staticmethod
    def get_name() -> str:
        return "AdminReportsView"
    
    @staticmethod
    def create_view() -> str:
        return f"""
        CREATE VIEW {ReportView.get_name()} AS SELECT * FROM REPORT;
        """
