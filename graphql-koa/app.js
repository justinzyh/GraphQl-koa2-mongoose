/**
 * @author:水痕
 * @time:2017-12-31 16:30
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:app
 * @describe:
 */
import Koa from 'koa';
const app = new Koa();
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
// 使用koa-bodyparser中间件
app.use(bodyParser());
//设置跨域访问
app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/test') {
      return false;
    }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// 引入用户视图
app.use(require('./routers/user'))
// 引入工作视图
app.use(require('./routers/job'));

// 引入graphql
app.use(require('./routers/graphql'));


app.listen(4000, () => {
  console.log('服务已启动:localhost:3000');
})