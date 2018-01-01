<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'app',
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
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
