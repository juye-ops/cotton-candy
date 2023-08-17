from database import mysql_cli, select, insert, update, delete


class ContainerDB:
    @select
    def get_list(project):
        query = """
        SELECT name, description FROM (
            container INNER JOIN container_info 
            ON container.id=container_info.container_id
        ) WHERE project_id = (
            SELECT id FROM project
            WHERE name=%s
        );
        """
        arg = (project, )

        return query, arg


    def create(name, project, description, gpu, ports, envs, os, frameworks, ip_addr):
        # Add container
        @insert
        def q1(*args):
            query = """
            INSERT INTO container(project_id, name)
            VALUES (
                (SELECT id FROM project WHERE name=%s),
                %s
            );
            """
            return query, args

        # Add container info
        @insert
        def q2(*args):
            query = """
            INSERT INTO container_info(container_id, description, gpu, ip)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s,
                %s
            );
            """
            return query, args

        # Add ports of container
        @insert
        def q3(*args):
            query = """
            INSERT INTO container_ports(container_id, port)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s
            );
            """
            return query, args


        # Add envs of container
        @insert
        def q4(*args):
            query = """
            INSERT INTO container_envs(container_id, k, v)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s
            );
            """
            return query, args
        # Add os of container
        @insert
        def q5(*args):

            query = """
            INSERT INTO container_os(container_id, version_id)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                (SELECT os_version.id from os_version INNER JOIN os ON os_version.os_id=os.id where name=%s AND version=%s)
            );
            """
            formatter = args
            return query, args

        # Add envs of container
        @insert
        def q6(*args):
            query = """
            INSERT INTO container_framework(container_id, version_id)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                (SELECT framework_version.id from framework_version INNER JOIN framework ON framework_version.framework_id=framework.id where name=%s AND version=%s)
            );
            """
            return query, args

        q1(project, name)
        q2(name, description, gpu, ip_addr)

        for port in ports:
            q3(name, port)

        for k, v in envs.items():
            q4(name, k, v)
    
        q5(name, os["name"], os["version"])

        for framework in frameworks:
            q6(name, framework["name"], framework["version"])

    def edit(old_name, new_name, description, gpu, ports, envs):
        # Modify container
        @update
        def q1(*args):
            query = """
            UPDATE container
            SET name=%s
            WHERE name=%s
            """
            return query, args

        # Modify container info
        @update
        def q2(*args):
            query = """
            UPDATE container_info
            SET
                description=%s,
                gpu=%s
            WHERE container_id=(SELECT id FROM container WHERE name=%s)
            """
            return query, args

        @update
        def q3(*args):
            query = """
            INSERT INTO container_ports(container_id, port)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s
            );
            """
            return query, args

        @update
        def q4(*args):
            query = """
            INSERT INTO container_envs(container_id, k, v)
            VALUES (
                (SELECT id FROM container WHERE name=%s),
                %s,
                %s
            );
            """
            return query, args

        q1(new_name, old_name)
        q2(description, gpu, new_name)
        
        for port in ports:
            q3(new_name, port)

        for k, v in envs.items():
            q4(new_name, k, v)

    @update
    def update_ip(name, ip_addr):
        query = """
        UPDATE container_info
        SET ip=%s
        WHERE container_id=(
            SELECT id FROM container
            WHERE name=%s
        );
        """
        arg = (ip_addr, name)
        return query, arg

    @delete
    def remove(name):
        query = """
        DELETE FROM container
        WHERE name=%s
        """
        arg = (name, )
        return query, arg