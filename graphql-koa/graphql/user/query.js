/**
 * @author:水痕
 * @time:2017-12-31 21:52
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:query
 * @describe:
 */

'use strict';
import {
  GraphQLList
} from 'graphql';
import {userType} from "./model";
import userModel from './../../models/user';


const users = {
  type: new GraphQLList(userType),
  args: {},
  async resolve(root, params, options) {
    const result = userModel.find().exec();
    return result;
  }
}

export default {
  users:users
}