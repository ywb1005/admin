<template>
  <div>
    <headers></headers>
    <sidebar></sidebar>
    <div class="container">
      <h3>章节列表</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>章节列表</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row>
        <el-table
          v-loading="load"
          element-loading-text="玩命加载中"
          :data="tableData"
          border
          style="width: 60%">
          <el-table-column
            fixed
            prop="id"
            label="ID"
            width="60">
          </el-table-column>
          <el-table-column
            prop="nodeName"
            label="章节名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="nodeId"
            label="章节序号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="nodeImg"
            label="章节配图"
            width="140">
            <template scope="scope">
              <img :src="scope.row.nodeImg">
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button
                @click.native.prevent="updateRow(scope.$index, tableData)"
                type="text"
                size="small">
                修改信息
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
      this.getSectionList()
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
        let bookId = this.$route.params.id
        this.$router.push({path: '/book/' + bookId + '/section/edit/' + id})
      },
      handleCurrentChange (val) {
        this.page.current = val
        console.log(`当前页: ${val}`)
      },
      getSectionList (page = 1) {
        let param = {
          page: page
        }
        let id = this.$route.params.id
        this.$http.get(API + 'book/' + id + '/section/list', {
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
      }
    },
    watch: {
      'page.current' (val) {
        this.form.page = val
        this.getSectionList(this.form.page)
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
