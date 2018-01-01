<template>
  <div class="hello">
    <input type="text" placeholder="请输入工作名称" v-model="job"/>
    <button type="button" @click="postJob">提交</button>
  </div>
</template>

<script>
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
