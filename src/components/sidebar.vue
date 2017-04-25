<template>
  <div class="side-bar">
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :router="true" @select="handleSelect">
      <el-submenu index="/member">
        <template slot="title">会员管理</template>
        <el-menu-item index="/member/list">会员列表</el-menu-item>
        <el-menu-item index="/member/add">添加会员</el-menu-item>
        </el-submenu>
      <el-submenu index="/book">
        <template slot="title">书籍管理</template>
        <el-menu-item index="/book/list">书籍列表</el-menu-item>
        <el-menu-item index="/book/add">添加书籍</el-menu-item>
        <el-menu-item index="/book/section/add">添加章节</el-menu-item>
      </el-submenu>
      <el-submenu index="/comment">
        <template slot="title">评论管理</template>
        <el-menu-item index="/comment/list">评论列表</el-menu-item>
      </el-submenu>
      <el-submenu index="/option">
        <template slot="title">操作管理</template>
        <el-menu-item index="/option/upload">会员上传</el-menu-item>
        <el-menu-item index="/option/download">下载记录</el-menu-item>
      </el-submenu>
      <el-submenu index="/user">
        <template slot="title">系统管理</template>
        <el-menu-item index="/user/list">管理员列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    created () {
      this.date = new Date().getFullYear()
    },
    data () {
      return {
        data: '',
        defaultActive: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.defaultActive = key
        console.log(key, keyPath)
      }
    }
  }
</script>
<style>
  .side-bar{
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 200px;
    min-width: 45px;
    max-height: 100vh;
    height: 100%;
    z-index: 1023;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    background: #eff2f7;
  }
  .font{
    padding-top: 1%;
    text-align: center;
    margin: 0 auto;
  }
</style>
