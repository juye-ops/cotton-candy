from database import mysql_cli


class ContainerDB:
    def get_len():
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT * from container
        """

        cursor.execute(query)
        ret = cursor.fetchall()

        conn.close()

        return len(ret)

    def get_list(project):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT name, description FROM (
            container INNER JOIN container_info 
            ON container.id=container_info.container_id
        ) WHERE project_id = (
            SELECT id FROM project
            WHERE name=%s
        );
        """
        cursor.execute(query, (project, ))
        ret = cursor.fetchall()

        conn.close()

        return ret

    def create(name, project, description, gpu, ports, envs, os, frameworks, ip_addr):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        # Add container
        query = """
        INSERT INTO container(project_id, name)
        VALUES (
            (SELECT id FROM project WHERE name=%s),
            %s
        );
        """
        cursor.execute(query, (project, name))
        conn.commit()

        # Add container info
        query = """
        INSERT INTO container_info(container_id, description, gpu, ip)
        VALUES (
            (SELECT id FROM container WHERE name=%s),
            %s,
            %s,
            %s
        );
        """
        cursor.execute(query, (name, description, gpu, ip_addr))
        conn.commit()

        # Add ports of container
        for port in ports:
            query = """
            INSERT INTO container_ports(container_id, port)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s
            );
            """
            cursor.execute(query, (name, port))
        conn.commit()

        # Add envs of container
        for k, v in envs.items():
            query = """
            INSERT INTO container_envs(container_id, k, v)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s
            );
            """

            cursor.execute(query, (name, k, v))
        conn.commit()

        # Add os of container
        query = """
        INSERT INTO container_os(container_id, version_id)
        VALUES (
            (SELECT id FROM container WHERE name=%s),
            (SELECT os_version.id from os_version INNER JOIN os ON os_version.os_id=os.id where name=%s AND version=%s)
        );
        """
        cursor.execute(query, (name, os["name"], os["version"]))
        conn.commit()

        # Add envs of container
        for framework in frameworks:
            query = """
            INSERT INTO container_framework(container_id, version_id)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                (SELECT framework_version.id from framework_version INNER JOIN framework ON framework_version.framework_id=framework.id where name=%s AND version=%s)
            );
            """
            cursor.execute(query, (name, framework["name"], framework["version"]))
        conn.commit()

        conn.close()

        return

    def update(old_name, new_name, description, gpu, ports, envs):
        conn = mysql_cli.get_connection()
        cursor = conn.cursor(dictionary=True)

        # Modify container
        query = """
        UPDATE container
        SET name=%s
        WHERE name=%s
        """
        cursor.execute(query, (new_name, old_name))
        conn.commit()

        # Modify container info
        query = """
        UPDATE container_info
        SET
            description=%s,
            gpu=%s
        WHERE container_id=(SELECT id FROM container WHERE name=%s)
        """
        cursor.execute(query, (description, gpu, new_name))
        conn.commit()

        for port in ports:
            query = """
            INSERT INTO container_ports(container_id, port)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s
            );
            """
            cursor.execute(query, (new_name, port))
        conn.commit()

        for k, v in envs.items():
            query = """
            INSERT INTO container_envs(container_id, k, v)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s
            );
            """
            cursor.execute(query, (new_name, k, v))
        conn.commit()
        conn.close()

        return

