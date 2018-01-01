/**
 * @author:水痕
 * @time:2017-12-31 16:55
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:user
 * @describe:
 */
'use strict';
import Router from 'koa-router';
import userModel from './../models/user';

const router = new Router()
router.get('/query_user', async (ctx) => {
  let result = await userModel.find().exec();
  ctx.body = result;
})
router.post('/create_user', async (ctx) => {
  let {name, age, job} = ctx.request.body;
  let result = await userModel.create({
    name,
    age,
    job
    });
  // let data = await result.save();
  ctx.body = {
    result,
    success:'ok'
  };
})
module.exports = router.routes();