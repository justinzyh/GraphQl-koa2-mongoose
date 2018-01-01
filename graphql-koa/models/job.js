/**
 * @author:水痕
 * @time:2017-12-31 16:47
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:job
 * @describe:定义工作的模型
 */
'use strict';
import mongoose from './db';

const jobSchema = new mongoose.Schema({
  job_name: String
})

export default mongoose.model('job', jobSchema);