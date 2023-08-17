from database import select

class FrameworkDB:
    @select
    def get_list():
        query = """
        SELECT name, type from framework
        """
        arg = ()
        return query, arg

    @select
    def get_version(name) -> dict:
        query = """
        SELECT version FROM framework_version 
        WHERE framework_id=(
            SELECT id from framework
            WHERE name=%s
        );
        """
        arg = (name, )
        return query, arg