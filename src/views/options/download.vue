<template>
    <div class="container">
      <h3>下载记录</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/option' }">操作管理</el-breadcrumb-item>
        <el-breadcrumb-item>下载记录列表</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top: 40px">
        <el-table
          v-loading="load"
          element-loading-text="玩命加载中"
          :data="tableData"
          border style="width: 70%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bookName"
            label="书籍名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="category"
            label="书籍分类"
            width="140">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="300">
          </el-table-column>
        </el-table>
      </el-row>
      <el-pagination style="padding:40px 400px"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, total"
        :current-page="page.current"
        :page-size="page.per"
        :total="page.total">
      </el-pagination>
  </div>
</template>
<script>
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('admin'))
  export default {
    mounted () {
      this.getDownloadList(1)
    },
    data () {
      return {
        load: true,
        tableData: [],
        page: {
          current: 1,
          per: 5,
          total: 0,
          from: 1,
          to: 1,
          last: 1
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.page.current = val
        console.log(`当前页: ${val}`)
      },
      getDownloadList (page = 1) {
        let param = {
          page: page
        }
        this.$http.get(API + 'option/download/list', {
          params: param,
          headers: {'Authorization': 'Bearer ' + user.token}
        }).then((response) => {
          if (response.data.code === 0) {
            this.page.current = response.data.data.current_page
            this.page.per = response.data.data.per_page
            this.page.total = response.data.data.total
            this.page.last = response.data.data.last_page
            this.page.from = response.data.data.from
            this.page.to = response.data.data.to
            this.tableData = response.data.data.list
            this.load = false
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      }
    },
    watch: {
      'page.current' (val) {
        this.form.page = val
        this.getDownloadList(this.form.page)
      }
    }
  }
</script>
<style scoped>
  .footer {
    width: 100%;
    margin-left:360px;
    position: fixed;
    bottom: 0px;

  }
</style>
