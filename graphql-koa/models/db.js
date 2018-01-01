/**
 * @author:水痕
 * @time:2017-12-31 16:33
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:db
 * @describe:
 */
'use strict';
import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/test");
var db = mongoose.connection;
db.on("error", () => {
  console.log('连接错误');
});
db.once("open", () => {
  console.log("mongoose已经打开");
});

export default mongoose;