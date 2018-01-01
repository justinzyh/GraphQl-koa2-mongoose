/**
 * @author:水痕
 * @time:2017-12-31 19:02
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:model
 * @describe:定义job的模型
 */
'use strict';
import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'


export const jobType = new GraphQLObjectType({
  name: 'job',
  fields: {
    _id: {
      type: GraphQLID
    },
    job_name: {
      type: GraphQLString
    }
  }
})

// 定义输入的的模型
export let jobInput = new GraphQLInputObjectType({
  name: 'jobInput',
  fields: {
    job_name: {
      type: GraphQLString
    }
  }
})