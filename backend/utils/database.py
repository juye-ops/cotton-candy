def preprocess(client):
    db = client.docker
    os = [
        {
            "_id": 0,
            "name": "ubuntu",
            "version": ["3.7", "3.8", "3.9", "3.10"]
        }
    ]

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

    db.platform.insert_many(platform)
    db.os.insert_many(os)