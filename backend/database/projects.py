from database import select, insert, update, delete


class ProjectDB:
    @select
    def get_id_by_name(user_id, name):
        query = """
        SELECT id FROM project
        WHERE user_id=%s AND name=%s
        """
        arg = (user_id, name)
        
        return query, arg

    @select
    def get_projects_by_user_id(user_id):
        query = """
        SELECT name, description FROM (project AS p
            INNER JOIN project_info AS pi
            ON p.id=pi.project_id
        ) WHERE user_id=%s;
        """
        arg = (user_id, )

        return query, arg

    @select
    def get_containers_by_id(id):
        query = """
        SELECT name FROM container
        WHERE project_id=%s
        """
        arg = (id, )

        return query, arg
    
    @select
    def get_number_of_containers_by_id(id):
        query = """
        SELECT count(*) FROM container
        WHERE project_id=%s
        """
        arg = (id, )

        return query, arg

    @select
    def get_info_by_id(id):
        query = """
        SELECT name, description FROM (project AS p
            INNER JOIN project_info AS pi
            ON p.id=pi.project_id
        ) WHERE p.id=%s;
        """
        arg = (id,)

        return query, arg

    def insert_project(user_id, name, description, subnet):
        @insert
        def q1(*args):
            query = """
            INSERT INTO project(user_id, name) VALUES (
                %s,
                %s
            );
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

        q1(user_id, name)
        q2(name, description, subnet)

    def update_project_by_id(id, new_name, description, subnet):
        @update
        def q1(*args):
            query = """
            UPDATE project
            SET name=%s
            WHERE id=%s;
            """
            return query, args

        @update
        def q2(*args):
            query = """
            UPDATE project_info
            SET
                description=%s,
                subnet=%s
            WHERE project_id=%s
            """
            return query, args

        q1(new_name, id)
        q2(description, subnet, id)

    @delete
    def delete_by_name(name):
        query = """
        DELETE FROM project
        WHERE name = %s
        """
        arg = (name,)
        return query, arg
