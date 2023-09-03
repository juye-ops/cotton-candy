from database import select, insert, update, delete

class UserDB:
    @select
    def get_register_token():
        query = """
        SELECT token FROM signup_token
        """
        arg = ()
        return query, arg

    @select
    def get_id_by_username(username):
        query = """
        SELECT id FROM user
        WHERE username=%s
        """
        arg = (username, )
        return query, arg
    
    @select
    def get_user_by_username(username):
        query = """
        SELECT username, password FROM (user AS u
            INNER JOIN user_password AS ua
            ON u.id=ua.user_id
        )
        WHERE username=%s
        """
        arg = (username, )

        return query, arg
    
    @select
    def get_rtoken_by_username(username):
        query = """
        SELECT refresh_token FROM user_auth
        WHERE user_id = (
            SELECT id FROM user
            WHERE username=%s
        )
        """
        arg = (username, )

        return query, arg

    def insert_user(username, password):
        @insert
        def q1(*args):
            query = """
            INSERT INTO user(username)
            VALUES (
                %s
            )
            """
            return query, args
        
        @insert
        def q2(*args):
            query = """
            INSERT INTO user_password(user_id, password)
            VALUES (
                (SELECT id FROM user WHERE username=%s),
                %s
            )
            """
            return query, args

        q1(username)
        q2(username, password)
    
    @insert
    def insert_refresh_token(username, token):
        query = """
        INSERT INTO user_auth(user_id, refresh_token)
        VALUES (
            (SELECT id FROM user WHERE username=%s),
            %s
        )
        ON DUPLICATE KEY UPDATE refresh_token=%s
        """
        arg = (username, token, token)
        return query, arg

    @delete
    def delete_refresh_token_by_username(username):
        query = """
        DELETE FROM user_auth
        WHERE user_id=(
            SELECT id FROM user
            WHERE username=%s
        )
        """
        arg = (username, )
        return query, arg