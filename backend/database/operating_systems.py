from database import mysql_cli, select


class OSDB:
    @select
    def get_os():
        query = """
        SELECT name from os
        """
        arg = ()

        return query, arg

    @select
    def get_versions_by_name(name) -> dict:
        query = """
        SELECT version FROM os_version 
        WHERE os_id=(
            SELECT id from os
            WHERE name=%s
        );
        """
        arg = (name,)

        return query, arg
