<template>
    <div class="container">
      <h3>评论列表</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">评论管理</el-breadcrumb-item>
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="查询评论">
              <el-input v-model="searchForm.key" placeholder="请输入评论人用户名"></el-input>
            </el-form-item>
          </el-form-item><el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-table
          v-loading="load"
          element-loading-text="玩命加载中"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="username"
            label="评论人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="bookName"
            label="评论书籍名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="评论内容"
            width="300">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            width="120">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="评论时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                删除评论
              </el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination style="padding:40px 400px"
            @current-change="handleCurrentChange"
            layout="prev, pager, next, total"
            :current-page="page.current"
            :page-size="page.per"
            :total="page.total">
          </el-pagination>
      </el-row>
      <div class="footer">
        <span>Copyright by 一页书屋 &copy; 2017</span>
      </div>
    </div>
</template>
<script>
  import headers from 'components/headers.vue'
  import sidebar from 'components/sidebar.vue'
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('admin'))
  export default {
    components: {
      headers, sidebar
    },
    mounted () {
      this.getCommentList()
    },
    data () {
      return {
        load: true,
        form: {
          page: 1
        },
        searchForm: {
          key: ''
        },
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
      deleteRow (index, rows) {
        let id = rows[index].id
        rows.splice(index, 1)
        this.$http.post(API + 'comment/delete/' + id, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '删除成功',
              showClose: true,
              type: 'info'
            })
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      handleCurrentChange (val) {
        this.page.current = val
        console.log(`当前页: ${val}`)
      },
      getCommentList (page = 1) {
        let param = {
          page: page
        }
        this.$http.get(API + 'comment/list', {
          params: param,
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
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
      onSubmit () {
        this.$http.post(API + 'comment/search', this.searchForm, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.page.current = response.data.data.current_page
            this.page.per = response.data.data.per_page
            this.page.total = response.data.data.total
            this.page.last = response.data.data.last_page
            this.page.from = response.data.data.from
            this.page.to = response.data.data.to
            this.tableData = response.data.data.list
            if (response.data.data.data.length === 0) {
              this.$message({
                message: '未找到合适的内容',
                showClose: true,
                type: 'info'
              })
            }
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
        this.getCommentList(this.form.page)
      }
    }
  }
</script>
<style scoped>
  .footer {
    width: 100%;
    margin-left:360px;
  }
</style>
