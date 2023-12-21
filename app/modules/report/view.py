from db.view import View


class ReportView(View):
    @staticmethod
    def get_table_name() -> str:
        return "AdminReportsView"
    
    @staticmethod
    def create_view() -> str:
        return f"""
        CREATE VIEW {ReportView.get_table_name()} AS SELECT * FROM REPORT;
        """
