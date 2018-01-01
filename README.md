### 一、创建项目
* 1、安装一些包

    ```javascript
    npm install koa --save
    npm install isodate --save
    npm install koa --save
    npm install koa-bodyparser --save
    npm install koa-router --save
    // 处理跨域的作用
    npm install koa2-cors --save
    npm install mongoose --save
    // 下面这两个是ES6语法的
    npm install babel-cli --save-dev
    npm install babel-preset-es2015 --save-dev
    ```
    
* 2、配置环境

    ```javascript
    "scripts": {
        "test": "nodemon --exec babel-node --presets=es2015 app.js"
    },
    ```

### 二、在`koa`中使用`mongoose`

* 1、创建`models`层
* 2、定义视图(对数据操作查看源代码)

### 三、在`koa`中使用`graphQl`
* 1、安装包

    ```javascript
    npm install graphql graphql-server-koa --save
    ```
    
* 2、单独创建一个`graphql`的文件夹
* 3、一般一张表对应里面一个文件夹(包括`model`、`query`、`mutation`)

### 四、使用`graphql`构建一个`job`的模型
* 1、`model`中的代码

    ```javascript
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
    ```
    
* 2、创建一个`query`关于`job`的查询语句文件

    ```javascript
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
    ```
    
* 3、项目中统一输出

    ```javascript
    import {
      GraphQLObjectType,
      GraphQLSchema
    } from 'graphql';
    
    // 引入job的查询与操作
    import JobQueries from './job/query';
    import JobMutations from './job/mutation';
    
    
    export default new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Queries',
        fields: Object.assign(
          JobQueries
        )
      }),
      mutation: new GraphQLObjectType({
        name: 'Mutations',
        fields: Object.assign(
          JobMutations
        )
      })
    })
    ```
    
* 4、同理如果要使用`mutation`也是一样的
* 5、配置路由

    ```javascript
    import Router from 'koa-router';
    import {graphiqlKoa, graphqlKoa} from 'graphql-server-koa';
    import schema from "../graphql/schema";
    
    const router = new Router();
    
    router.get('/graphql', async (ctx, next) => {
      const result = await graphqlKoa({
        schema: schema
      })(ctx, next);
      console.log(result);
      ctx.body = result;
    })
    
    router.post('/graphql', async (ctx, next) => {
      await graphqlKoa({
        schema: schema
      })(ctx, next);
    })
    
    // 这个仅仅是在方便在浏览器上查看的,项目上线后可以删除
    router.get('/graphiql', async (ctx, next) => {
      await graphiqlKoa({
        endpointURL: '/graphql'
      })(ctx, next);
    })
    module.exports = router.routes();
    ```
    
* 6、总结
    * 在`graphql`只有`query`和`mutation`
    * 如果是查询语句就用`query`
    * 如果是对数据的增删改就用`mutation`

### 五、在`React`前端(客户端)调用后端使用`graphql`的数据

* 1、安装依赖包

    ```javascript
    npm install react-apollo --save
    npm install apollo-client --save
    npm install apollo-link-http --save
    npm install apollo-cache-inmemory --save
    npm install graphql-tag --save
    ```
    
* 2、`react`的入口文件配置

    ```javascript
    const client = new ApolloClient({
      link: new HttpLink('http://localhost:4000/graphql/'),
      cache: new InMemoryCache()
    });
    // 创建一个上面提到的客户端
    ReactDOM.render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>, document.getElementById('root'));
    registerServiceWorker();
    ```
    
* 3、需要请求数据的地方

    ```javascript
    import React, { Component } from 'react';
    import { graphql } from 'react-apollo';
    import gql from 'graphql-tag';
    class Test01 extends Component{
      render(){
        return(
          <div>
            <h1>你好</h1>
            <h2>{this.props.data.myField1}</h2>
          </div>
        )
      }
    }
    export default graphql(gql`
      query{
        Jobs{
          _id,
          job_name
        }
      }
    `)(Test01)
    ```
    

### 六、在`vue`中使用
* 1、安装包
    
    ```javascript
    npm install vue-graphql --save
    ```
    
* 2、创建一个`graphql.js`文件

    ```javascript
    import Vue from 'vue';
    import VueGraphQL from 'vue-graphql';
    Vue.use(VueGraphQL);
    const graphqlApi = 'http://localhost:4000/graphql/';
    const client = new VueGraphQL.Client(graphqlApi);
    export default client;
    ```
    
* 3、在`main.js`引入

    ```javascript
    import Vue from 'vue'
    import App from './App'
    import router from './router'
    import graphql from './graphql';
    Vue.config.productionTip = false
    
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      graphql,
      template: '<App/>',
      components: { App }
    })
```

* 4、使用查询语句

    ```javascript
    ...
    mounted(){
        this.getGraphQlData();
    },
    methods: {
        getGraphQlData() {
          this.$graphql.request(`
              query{
                Jobs{
                  _id,
                  job_name
                }
              }
            `).then(result => {
            console.log(result);
          })
        }
    }
    ...
    ```
    
* 5、使用`mutations`语句

    ```javascript
    export default {
      name: 'HelloWorld',
      data () {
        return {
         job:'',
        }
      },
      methods: {
        postJob(){
          console.log(this.job);
          this.$graphql.request(`
              mutation{
                JobCreate(data:{job_name:"${this.job}"})
              }
            `).then(result => {
            console.log(result);
          })
          
        }
      }
    }
    ```
    

---
###欢迎加入群聊，我们一起探讨前端技术栈
> 群号:560285778

![这里写图片描述](http://img.blog.csdn.net/20171008104715122?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQva3VhbmdzaHAxMjg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)