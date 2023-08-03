from database import mysql_cli, cursor

class ContainerDB:
    def get_len():
        query = f"""
        SELECT * from container
        """

        cursor.execute(query)
        ret = cursor.fetchall()
    
        return len(ret)

    def get_list(project):
        query = f"""
        SELECT name, description FROM (
            container INNER JOIN container_info 
            ON container.id=container_info.container_id
        ) WHERE project_id = (
            SELECT id FROM project
            WHERE name=%s
        );
        """
        cursor.execute(query, (project))
        ret = cursor.fetchall()

        return ret


    def create(name, project, description, gpu, ports, envs, os, frameworks):
        # Add container
        query = f"""
        INSERT INTO container(project_id, name)
        VALUES (
            (SELECT id FROM project WHERE name=%s),
            %s
        );
        """
        cursor.execute(query, (project, name))
        mysql_cli.commit()
        
        # Add container info
        query = f"""
        INSERT INTO container_info(container_id, description, gpu)
        VALUES (
            (SELECT id FROM container WHERE name=%s),
            %s,
            %s
        );
        """
        cursor.execute(query, (name, description, gpu))
        mysql_cli.commit()

        # Add ports of container
        for port in ports:
            query = f"""
            INSERT INTO container_ports(container_id, port)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s
            );
            """
            cursor.execute(query, (name, port))
        mysql_cli.commit()

        # Add envs of container
        for k, v in envs.items():
            query = f"""
            INSERT INTO container_envs(container_id, k, v)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s
            );
            """
            cursor.execute(query, (name, k, v))
        mysql_cli.commit()

        # Add os of container
        query = f"""
        INSERT INTO container_os(container_id, version_id)
        VALUES (
            (SELECT id FROM container WHERE name=%s),
            (SELECT os_version.id from os_version INNER JOIN os ON os_version.os_id=os.id where name=%s AND version=%s)
        );
        """
        cursor.execute(query, (name, os['name'], os['version']))
        mysql_cli.commit()

        # Add envs of container
        for framework in frameworks:
            query = f"""
            INSERT INTO container_framework(container_id, version_id)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                (SELECT framework_version.id from framework_version INNER JOIN framework ON framework_version.framework_id=framework.id where name=%s AND version=%s)
            );
            """
            cursor.execute(query, (name, framework['name'], framework['version']))
        mysql_cli.commit()


        return