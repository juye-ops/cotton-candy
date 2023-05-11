def preprocess(client):
    db = client.docker
    collection = db.platforms
    platform = [
        {
            "_id": 0,
            "name": "python",
            "version": ["3.7", "3.8", "3.9", "3.10"]
        },
        {
            "_id": 1,
            "name": "node",
            "version": ["14", "16", "18", "20"]
        }
    ]

    collection.insert_many(platform)