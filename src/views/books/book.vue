<template>
  <div>
    <headers></headers>
    <sidebar></sidebar>
    <div class="container">
      <h3>书籍列表</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="查询类别">
            <el-select v-model="searchForm.type" placeholder="请选择查询条件">
              <el-option label="ID" value="1"></el-option>
              <el-option label="书籍名" value="2"></el-option>
              <el-option label="分类名" value="3"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="查询条件">
              <el-input v-model="searchForm.key" placeholder="查询条件"></el-input>
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
          style="width: 80%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="书籍名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="category"
            label="书籍分类"
            width="120">
          </el-table-column>
          <el-table-column
            prop="author"
            label="书籍作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="image"
            label="配图"
            width="140">
            <template scope="scope">
              <img :src="scope.row.image">
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button
                @click.native.prevent="updateRow(scope.$index, tableData)"
                type="text"
                size="small">
                修改信息
              </el-button>
              <el-button
                @click.native.prevent="sectionList(scope.$index, tableData)"
                type="text"
                size="small">
                章节列表
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
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
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
      this.getBookList()
    },
    data () {
      return {
        load: true,
        form: {
          page: 1
        },
        searchForm: {
          key: '',
          type: ''
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
      updateRow (index, rows) {
        let id = rows[index].id
        this.$router.push({path: '/book/edit/' + id})
      },
      sectionList (index, rows) {
        let id = rows[index].id
        this.$router.push({path: '/book/' + id + '/section/list'})
      },
      handleCurrentChange (val) {
        this.page.current = val
        console.log(`当前页: ${val}`)
      },
      getBookList (page = 1) {
        let param = {
          page: page
        }
        this.$http.get(API + 'book/list', {
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
            this.tableData = response.data.data.data
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
        this.load = true
        this.$http.post(API + 'user/search', this.searchForm, {
        }).then((response) => {
          if (response.data.code === 0) {
            this.tableData = []
            this.tableData.push(response.data.data)
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
        this.getBookList(this.form.page)
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
