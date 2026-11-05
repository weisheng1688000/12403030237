1.
db.courses.aggregate([
  { 
    $match: { 
      teacher: "张老师", 
      status: "OPEN" 
    } 
  },
  { 
    $project: { 
      _id: 0, 
      courseId: "$_id",                   // 课程编号
      title: 1,                           // 课程名称
      chapterCount: { $size: "$chapters" } // 动态计算章节数量
    } 
  }
]);

2.
db.courses.updateOne(
  { 
    _id: "COURSE-12403030237-01", 
    "chapters.chapterId": "CH02" 
  },
  { 
    // 使用 $ 定位符进行局部更新，保留其他字段
    $set: { "chapters.$.title": "Redis 基础与应用-37" } 
  }
);

printjson(db.courses.findOne({ _id: "COURSE-12403030237-01" }));

3.db.courses.updateOne(
  { _id: "COURSE-12403030237-01" },
  { 
    $addToSet: { 
      chapters: { 
        chapterId: "CH03", 
        title: "Redis 高级操作", 
        hours: 3
      } 
    } 
  }
);

// 第二次执行
db.courses.updateOne(
  { _id: "COURSE-12403030237-01" },
  { 
    $addToSet: { 
      chapters: { 
        chapterId: "CH03", 
        title: "Redis 高级操作", 
        hours: 3 
      } 
    } 
  }
);

4.
let doc = db.courses.findOne({ _id: "COURSE-12403030237-01" });

// (1) 修改后 'CH02' 的标题
let ch02 = doc.chapters.find(c => c.chapterId === "CH02");
print("(1) CH02 标题: " + ch02.title);

// (2) 两次新增操作后 'CH03' 的数量
let ch03List = doc.chapters.filter(c => c.chapterId === "CH03");
print("(2) CH03 数量: " + ch03List.length);

// (3) 最终章节总数
print("(3) 最终章节总数: " + doc.chapters.length);

// (4) teacher 和 status 是否保持原值
print("(4) teacher: " + doc.teacher + ", status: " + doc.status);


