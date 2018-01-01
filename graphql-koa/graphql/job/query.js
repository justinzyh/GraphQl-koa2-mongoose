/**
 * @author:水痕
 * @time:2017-12-31 19:21
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:query
 * @describe:
 */

'use strict';

import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import {
  jobType
} from "./model";

// 引入数据模型
import jobModel from './../../models/job';

const Jobs = {
  type: new GraphQLList(jobType), // 返回是一个数组
  args: {},
  async resolve(root, params, options) {
    const result = jobModel.find().exec();
    return result;
  }
}

const Job = {
  type: jobType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(root, params, options) {
    const result = jobModel.findOne({_id: params.id}).exec();
    return result;
  }
}
export default {
  Jobs: Jobs,
  Job: Job
}