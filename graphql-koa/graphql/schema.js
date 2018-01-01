/**
 * @author:水痕
 * @time:2017-12-31 19:01
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:schema
 * @describe:
 */


'use strict';
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';

// 引入job的查询与操作
import JobQueries from './job/query';
import JobMutations from './job/mutation';

// 引入user
import UserQueries from './user/query';
import UserMutations from './user/mutation';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(
      JobQueries,
      UserQueries
    )
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: Object.assign(
      JobMutations,
      UserMutations
    )
  })
})