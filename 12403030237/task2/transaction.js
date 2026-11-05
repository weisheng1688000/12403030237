1.
const reqId = "REQ-T1-001";
const bookId = "BOOK-12403030237";
const buyCount = 2; // Buy = 1 + A(1) = 2

const deductResult = db.inventory.updateOne(
  { _id: bookId, stock: { $gte: buyCount } },
  { $inc: { stock: -buyCount } }
);

2.
if (res1.matchedCount === 0) {
    print("判断结果：库存不足或教材不存在（扣减失败）");
} else if (res1.modifiedCount === 1) {
    print("判断结果：扣减成功");
} else {
    print("判断结果：数据库执行异常或未发生修改");
}

3.
function purchase(requestId, forceError) {
  try {
    // 1. 先尝试原子扣减库存
    const r = db.inventory.updateOne(
      { _id: bookId, stock: { $gte: buyCount } },
      { $inc: { stock: -buyCount } }
    );
    
    // 判断是否扣减成功
    if (r.matchedCount === 0) throw new Error("库存不足");
    
    // 2. 模拟订单插入前异常
    if (forceError) throw new Error("ForceError");
    
    // 3. 插入订单
    db.orders.insertOne({_id: requestId, bookId: bookId, studentId: SID, quantity: buyCount});
    return {success: true};
    
  } catch(e) {
    // 4. 异常处理：如果扣减成功但后续失败，需要把库存加回去（补偿）
    if (e.message !== "库存不足") {
      db.inventory.updateOne({_id: bookId}, {$inc: {stock: buyCount}});
    }
    return {success: false};
  }
}

4.
T1:
resetData(); let t1_res = purchase("REQ-T1-001", false); let t1_inv = db.inventory.findOne({_id: bookId}); let t1_ord = db.orders.countDocuments(); print(`--- 场景 T1 正常订购 ---\n(1) 场景编号: T1\n(2) 初始库存: ${initialStock}\n(3) 购买数量: ${buyCount}\n(4) 成功次数: ${t1_res.success?1:0}\n(5) 失败次数: ${t1_res.success?0:1}\n(6) 最终库存: ${t1_inv.stock}\n(7) 最终订单数量: ${t1_ord}\n(8) 是否通过本人编写的核验: ${t1_inv.stock===5 && t1_ord===1 ? "是" : "否"}`);

T2:
resetData(1); let t2_res = purchase("REQ-T2-001", false); let t2_inv = db.inventory.findOne({_id: bookId}); let t2_ord = db.orders.countDocuments(); print(`--- 场景 T2 库存不足 ---\n(1) 场景编号: T2\n(2) 初始库存: 1\n(3) 购买数量: ${buyCount}\n(4) 成功次数: ${t2_res.success?1:0}\n(5) 失败次数: ${t2_res.success?0:1}\n(6) 最终库存: ${t2_inv.stock}\n(7) 最终订单数量: ${t2_ord}\n(8) 是否通过本人编写的核验: ${t2_inv.stock===1 && t2_ord===0 ? "是" : "否"}`);

T3:
resetData(); let t3_res = purchase("REQ-T3-001", true); let t3_inv = db.inventory.findOne({_id: bookId}); let t3_ord = db.orders.countDocuments(); print(`--- 场景 T3 中途异常 ---\n(1) 场景编号: T3\n(2) 初始库存: ${initialStock}\n(3) 购买数量: ${buyCount}\n(4) 成功次数: ${t3_res.success?1:0}\n(5) 失败次数: ${t3_res.success?0:1}\n(6) 最终库存: ${t3_inv.stock}\n(7) 最终订单数量: ${t3_ord}\n(8) 是否通过本人编写的核验: ${t3_inv.stock===initialStock && t3_ord===0 ? "是" : "否"}`);

T4:
resetData(); let successCount = 0; let failCount = 0; let loopTimes = Math.floor(initialStock / buyCount) + 1; for (let i = 0; i < loopTimes; i++) { let r = purchase("REQ-T4-" + i, false); if (r.success) successCount++; else failCount++; } let t4_inv = db.inventory.findOne({_id: bookId}); let t4_ord = db.orders.countDocuments(); print(`--- 场景 T4 连续购买 ---\n(1) 场景编号: T4\n(2) 初始库存: ${initialStock}\n(3) 购买数量: ${buyCount}\n(4) 成功次数: ${successCount}\n(5) 失败次数: ${failCount}\n(6) 最终库存: ${t4_inv.stock}\n(7) 最终订单数量: ${t4_ord}\n(8) 是否通过本人编写的核验: ${successCount===3 && failCount===1 && t4_inv.stock===1 && t4_ord===3 ? "是" : "否"}`);
