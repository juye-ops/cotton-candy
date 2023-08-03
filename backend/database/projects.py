from database import mysql_cli, cursor


class ProjectDB:
    def get_subnet(project):
        query = f"""
        SELECT subnet FROM project_info 
        WHERE project_id=(
            SELECT id FROM project WHERE name=%s
        );
        """

        cursor.execute(query, (project))
        ret = cursor.fetchone()

        return ret["subnet"]

    def get_len():
        query = f"""
        SELECT * from project
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        return len(ret)

    def get_list():
        query = f"""
        SELECT name, description FROM (
            project INNER JOIN project_info 
            ON project.id=project_info.project_id
        );
        """
        cursor.execute(query)
        ret = cursor.fetchall()

        return ret

    def create(name, description, subnet):
        query = f"""
        INSERT INTO project(user_id, name) VALUES (1, %s);
        """
        cursor.execute(query, (name))
        mysql_cli.commit()

        query = f"""
        INSERT INTO project_info (project_id, description, subnet) 
        VALUES (
            (SELECT id FROM project WHERE name=%s),
            %s,
            %s
        );
        """
        cursor.execute(query, (name, description, subnet))
        mysql_cli.commit()

        return
