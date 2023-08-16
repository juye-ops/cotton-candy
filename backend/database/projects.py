from database import mysql_cli, select, insert, update, delete


class ProjectDB:
    @select
    def get_list():
        query = """
        SELECT name, description FROM (
            project INNER JOIN project_info 
            ON project.id=project_info.project_id
        );
        """
        arg = ()

        return query, arg
    
    @select
    def get_containers(name):
        query = """
        SELECT name FROM container
        WHERE project_id=(
            SELECT id FROM project
            WHERE name=%s
        )
        """
        arg = (name,)

        return query, arg
    
    def create(name, description, subnet):
        @insert
        def q1(name):
            query = """
            INSERT INTO project(user_id, name) VALUES (1, %s);
            """
            arg = (name,)

            return query, arg
        
        @insert
        def q2(name, description, subnet):
            query = """
            INSERT INTO project_info (project_id, description, subnet) 
            VALUES (
                (SELECT id FROM project WHERE name=%s),
                %s,
                %s
            );
            """
            arg = (name, description, subnet)

            return query, arg

        q1(name)
        q2(name, description, subnet)

    def edit(old_name, new_name, description, subnet):
        @update
        def q1(old_name, new_name):
            query = """
            UPDATE project
            SET name=%s
            WHERE name=%s;
            """
            arg = (new_name, old_name)

            return query, arg

        @update
        def q2(new_name, description, subnet):
            query = """
            UPDATE project_info
            SET
                description=%s,
                subnet=%s
            WHERE project_id=(SELECT id FROM project WHERE name=%s)
            """
            arg = (description, subnet, new_name)
            
            return query, arg

        q1(old_name, new_name)
        q2(new_name, description, subnet)

    @delete
    def remove(name):
        query = """
        DELETE FROM project
        WHERE name = %s
        """
        arg = (name,)
        return query, arg