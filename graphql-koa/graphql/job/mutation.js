/**
 * @author:水痕
 * @time:2017-12-31 19:21
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:mutation
 * @describe:job的mutation
 */

'use strict';
import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import {
  jobInput
} from "./model";

// 引入job的数据模型
import jobModel from './../../models/job';
const JobCreate = {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(jobInput) // 使用模型
    }
  },
  async resolve(root, params, options) {
    console.log('数据==>',params.data);
    const result = new jobModel({job_name:params.data.job_name});
    let data = await result.save();
    return true;
  }
}

export default {
  JobCreate: JobCreate
}