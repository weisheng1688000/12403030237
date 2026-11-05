个人信息
- 学号：12403030237
- 个人参数：S=37, A=1, B=1, C=2
- MongoDB 数据库：`exam_12403030237`
- Redis 键前缀：`exam:12403030237:`

运行环境与依赖
- 操作系统：Windows 11
- 数据库：MongoDB, Redis (集群模式, 端口 7001-7006)
- 语言：JavaScript (在 mongosh 和 redis-cli 中执行)

各题执行方法
Task 1 (MongoDB 课程查询与维护)
1. 进入 `task1` 目录，在 `mongosh` 中运行 `init.js` 初始化数据。
2. 运行 `query.js` 执行查询、更新和验证操作。
3. 运行结果见 `result.png`，文字说明见 `note.txt`。

Task 2 (MongoDB 原子扣减与事务)
1. 进入 `task2` 目录，在 `mongosh` 中运行 `init.js` 初始化数据。
2. 运行 `transaction.js` 执行 T1-T4 四个测试场景。
3. 运行结果见 `result_t1_t4.png`，文字说明见 `note.txt`。

Task 3 (Redis 学习信息与排行榜)
1. 确保 Redis 集群已启动。
2. 使用 `redis-cli -c -p 7001` 连接。
3. 依次复制 `redis_commands.txt` 中的命令执行。
4. 运行结果见 `result.png`，数据类型说明见 `data_type_note.txt`。