/**
 * @author:水痕
 * @time:2017-12-31 22:20
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:mutation
 * @describe:
 */
'use strict';
import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import {InputResult, userInput} from "./model";

// 导入数据模型
import userModel from './../../models/user';

const UserCreate = {
  type: new GraphQLList(InputResult), // 定义一个返回数组对象的类型
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInput) // 传递参数的类型
    }
  },
  async resolve(root, params, options) {
    // 存储到数据库
    let result = await userModel.create(params.data);
    return [result];
  }
}

export default {
  UserCreate: UserCreate
}