from database import mysql_cli


class ProjectDB:
    def get_subnet(project):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = f"""
        SELECT subnet FROM project_info 
        WHERE project_id=(
            SELECT id FROM project WHERE name=%s
        );
        """

        cursor.execute(query, (project, ))
        ret = cursor.fetchone()
        
        conn.close()
        
        return ret["subnet"]

    def get_len():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = f"""
        SELECT * from project
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return len(ret)

    def get_list():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = f"""
        SELECT name, description FROM (
            project INNER JOIN project_info 
            ON project.id=project_info.project_id
        );
        """
        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return ret

    def create(name, description, subnet):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = f"""
        INSERT INTO project(user_id, name) VALUES (1, %s);
        """
        cursor.execute(query, (name, ))
        conn.commit()

        query = f"""
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
