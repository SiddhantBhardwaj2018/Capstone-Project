def unique_coins(db,uid):
    docs = db.stream()
    print(uid)
    d = []
    for doc in docs:
        doc = doc.to_dict()
        if doc['uid'] == uid:
            print(type(doc['wallet']))
            return doc['wallet']
    