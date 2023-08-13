from database import mysql_cli


class ProjectDB:
    def get_len():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT * from project
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return len(ret)

    def get_list():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT name, description FROM (
            project INNER JOIN project_info 
            ON project.id=project_info.project_id
        );
        """
        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return ret

    def get_containers(project_name):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT name FROM container
        WHERE project_id=(
            SELECT id FROM project
            WHERE name=%s
        )
        """
        cursor.execute(query, (project_name,))
        ret = cursor.fetchall()

        conn.close()

        return ret

    def create(name, description, subnet):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        INSERT INTO project(user_id, name) VALUES (1, %s);
        """
        cursor.execute(query, (name, ))
        conn.commit()

        query = """
        INSERT INTO project_info (project_id, description, subnet) 
        VALUES (
            (SELECT id FROM project WHERE name=%s),
            %s,
            %s
        );
        """
        cursor.execute(query, (name, description, subnet))
        conn.commit()

        conn.close()

        return

    def update(old_name, new_name, description, subnet):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        UPDATE project
        SET name=%s
        WHERE name=%s;
        """
        cursor.execute(query, (old_name, new_name))
        conn.commit()

        query = """
        UPDATE project_info
        SET
            description=%s,
            subnet=%s
        WHERE project_id=(SELECT id FROM project WHERE name=%s)
        """
        cursor.execute(query, (description, subnet, new_name))
        conn.commit()

        conn.close()

        return
