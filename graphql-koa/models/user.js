/**
 * @author:水痕
 * @time:2017-12-31 16:34
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:user
 * @describe:
 */
'use strict';
import isodate from 'isodate';
import lastModified from './plugins';
import mongoose from './db';

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 18,
    max: 100
  },
  job: [{
    type: String,
  }],
  add_time: {
    type: Date,
    default: isodate(new Date)
  }
})

// 使用插件
userSchema.plugin(lastModified);

// 默认导出模型
export default mongoose.model('user', userSchema);