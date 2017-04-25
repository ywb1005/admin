<template>
  <div class="header">
    <span class="title">一叶书屋后台管理</span>
    <span class="logout" @click="logout">退出</span>
    <span class="welcome">欢迎您!  {{this.user}}</span>
  </div>
</template>
<script>
  export default {
    mounted () {
      let user = JSON.parse(window.localStorage.getItem('admin'))
      this.user = user.name
    },
    created () {
      this.date = new Date().getFullYear()
    },
    data () {
      return {
        user: '叶伟标'
      }
    },
    methods: {
      logout () {
        window.localStorage.removeItem('admin')
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
<style>
  body {
    margin: 0;
  }
  .header{
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index:1023;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    background-color: #20A0FF;
  }
  .title{
    font-size:24px;
    line-height: 65px;
    color:#fff;
    margin-left: 80px;
  }
  .welcome {
    color:#fff;
    line-height: 65px;
    float:right;
    margin-right: 40px;
  }
  .logout{
    color:#fff;
    line-height: 65px;
    float:right;
    margin-right: 40px;
    cursor: pointer;
  }
  .logout:hover{
    color:#FF4949;
  }
</style>
