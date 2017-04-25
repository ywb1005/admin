<template>
    <div class="container">
      <h3>会员上传列表</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/option' }">操作管理</el-breadcrumb-item>
        <el-breadcrumb-item>会员上传列表</el-breadcrumb-item>
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
            label="会员名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bookName"
            label="书籍名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bookAuthor"
            label="书籍作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="上传时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button
                @click.native.prevent="download(scope.$index, tableData)"
                type="info"
                size="small">
                下 载
              </el-button>
            </template>
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
      this.getUploadList(1)
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
      getUploadList (page = 1) {
        let param = {
          page: page
        }
        this.$http.get(API + 'option/upload/list', {
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
      },
      download (index, rows) {
        let url = rows[index].url
        console.log(url)
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', '')
        let evObj = document.createEvent('MouseEvents')
        evObj.initEvent('click', true, true)
        a.dispatchEvent(evObj)
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
