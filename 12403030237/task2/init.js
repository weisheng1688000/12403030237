use exam_12403030237;
db.inventory.drop();
db.orders.drop();
db.inventory.insertOne({ _id: "BOOK-12403030237", title: "NoSQL 数据库教材", stock: 7 });