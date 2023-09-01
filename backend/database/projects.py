from database import select, insert, update, delete


class ProjectDB:
    @select
    def get_projects():
        query = """
        SELECT name, description FROM (project AS p
            INNER JOIN project_info AS pi
            ON p.id=pi.project_id
        );
        """
        arg = ()

        return query, arg

    @select
    def get_containers_by_name(name):
        query = """
        SELECT name FROM container
        WHERE project_id=(
            SELECT id FROM project
            WHERE name=%s
        )
        """
        arg = (name,)

        return query, arg
    
    @select
    def get_number_of_containers_by_name(name):
        query = """
        SELECT count(*) FROM container
        WHERE project_id=(
            SELECT id FROM project
            WHERE name=%s
        )
        """
        arg = (name,)

        return query, arg

    @select
    def get_info_by_name(name):
        query = """
        SELECT name, description FROM (project AS p
            INNER JOIN project_info AS pi
            ON project.id=project_info.project_id
        ) WHERE name=%s;
        """
        arg = (name,)

        return query, arg

    def insert_project(name, description, subnet):
        @insert
        def q1(*args):
            query = """
            INSERT INTO project(user_id, name) VALUES (1, %s);
            """
            return query, args

        @insert
        def q2(*args):
            query = """
            INSERT INTO project_info (project_id, description, subnet) 
            VALUES (
                (SELECT id FROM project WHERE name=%s),
                %s,
                %s
            );
            """
            return query, args

        q1(name)
        q2(name, description, subnet)

    def update_project_by_name(old_name, new_name, description, subnet):
        @update
        def q1(*args):
            query = """
            UPDATE project
            SET name=%s
            WHERE name=%s;
            """
            return query, args

        @update
        def q2(*args):
            query = """
            UPDATE project_info
            SET
                description=%s,
                subnet=%s
            WHERE project_id=(SELECT id FROM project WHERE name=%s)
            """
            return query, args

        q1(new_name, old_name)
        q2(description, subnet, new_name)

    @delete
    def delete_by_name(name):
        query = """
        DELETE FROM project
        WHERE name = %s
        """
        arg = (name,)
        return query, arg
