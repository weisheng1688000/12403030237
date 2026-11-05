use exam_12403030237;
db.courses.drop();
db.courses.insertMany([
  { _id: "COURSE-12403030237-01", title: "NoSQL 数据库", teacher: "张老师", status: "OPEN", chapters: [{ chapterId: "CH01", title: "MongoDB 基础", hours: 2 }, { chapterId: "CH02", title: "Redis 基础", hours: 2 }] },
  { _id: "COURSE-12403030237-02", title: "数据库原理", teacher: "张老师", status: "CLOSED", chapters: [{ chapterId: "CH01", title: "关系模型", hours: 2 }] },
  { _id: "COURSE-12403030237-03", title: "机器学习", teacher: "李老师", status: "OPEN", chapters: [{ chapterId: "CH01", title: "分类", hours: 2 }, { chapterId: "CH02", title: "聚类", hours: 2 }] }
]);