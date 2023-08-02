from database import mysql_cli, cursor


class ProjectDB:
    def get_len():
        query = f"""
        SELECT * from project
        """

        cursor.execute(query)
        ret = cursor.fetchall()
    
        return len(ret)

    def create(info, subnet):
        query = f"""
        INSERT INTO project(user_id, name) VALUES (1, %s);
        """
        cursor.execute(query, (info['name']))
        mysql_cli.commit()

        query = f"""
        INSERT INTO project_info (project_id, description, subnet) 
        VALUES (
            (SELECT id FROM project WHERE name=%s),
            %s,
            %s
        );
        """
        cursor.execute(query, (info['name'], info['description'], subnet))
        mysql_cli.commit()

        return
