/**
 * @author:水痕
 * @time:2017-12-31 17:02
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:job
 * @describe:
 */
'use strict';
import Router from 'koa-router';
import jobModel from './../models/job';

const router = new Router();

router.get('/query_job', async ctx => {
  let result = await jobModel.find().exec()
  ctx.body = result;
})

router.post('/create_job', async (ctx) => {
  let result = new jobModel({job_name: ctx.request.body.job_name});
  let data = await result.save()
  ctx.body = data;
})

router.post('/remove_job', async (ctx) => {
  let result = await jobModel.findById(ctx.request.body._id).remove().exec()
  ctx.body = result;
})

router.post('/update_job', async (ctx) => {
  let result = await jobModel.findById(ctx.request.body._id).update({job_name: ctx.request.body.job_name}).exec();
  ctx.body = result;
})

module.exports = router.routes();