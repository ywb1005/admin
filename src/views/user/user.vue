<template>
    <div class="container">
      <h3>管理员列表</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px">
        <el-form :inline="true" class="demo-form-inline">
         <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = true">添 加 管 理 员</el-button>
        </el-form-item>
        </el-form>
        <el-dialog title="添加管理员" v-model="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" class="user-form" prop="again">
              <el-input type="password" v-model="form.again" placeholder="请再次输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">添 加 用 户</el-button>
          </div>
        </el-dialog>
      </el-row>
        <el-row>
        <el-dialog title="修改密码" v-model="dialogUpdateFormVisible">
          <el-form :model="updateForm" :rules="rule" ref="updateForm">
            <el-form-item label="原密码" prop="oldPwd">
              <el-input v-model="updateForm.oldPwd"  type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd">
              <el-input v-model="updateForm.newPwd" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="update">修 改 密 码</el-button>
          </div>
        </el-dialog>
      </el-row>
      <el-row>
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
            prop="role"
            label="角色"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建时间"
            width="300">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
                删 除
              </el-button>
              <el-button
                @click.native.prevent="updateRow(scope.$index, tableData)"
                type="text"
                size="small">
                修改密码
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
  </div>
</template>
<script>
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('admin'))
  export default {
    mounted () {
      this.getUser()
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.again !== '') {
            this.$refs.form.validateField('again')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        dialogFormVisible: false,
        dialogUpdateFormVisible: false,
        load: true,
        form: {
          name: '',
          password: '',
          again: ''
        },
        id: '',
        updateForm: {
          oldPwd: '',
          newPwd: ''
        },
        tableData: [],
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          again: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ]
        },
        rule: {
          oldPwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      deleteRow (index, rows) {
        this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = rows[index].id
          rows.splice(index, 1)
          this.$http.post(API + 'adminUser/delete/' + id, {}, {
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updateRow (index, rows) {
        this.dialogUpdateFormVisible = true
        this.id = rows[index].id
      },
      update () {
        let id = this.id
        this.dialogUpdateFormVisible = false
        this.$http.post(API + 'adminUser/update/' + id, this.updateForm, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '修改成功',
              showClose: true,
              type: 'info'
            })
          } else {
            this.$message({
              message: response.data.message,
              showClose: true,
              type: 'error'
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
      getUser () {
        this.$http.get(API + 'adminUser/list', {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.tableData = response.data.data
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
      addUser () {
        let form = this.form
        delete form.again
        this.$http.post(API + 'adminUser/add', form, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功',
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
