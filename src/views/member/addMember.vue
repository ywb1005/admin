<template>
  <div>
    <headers></headers>
    <sidebar></sidebar>
    <div class="container">
      <h3>添加会员</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加会员</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px;width: 600px;">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="手机号" class="user-form" prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入有效的手机号"></el-input>
          </el-form-item>
          <hr class="line-dashed">
            <el-form-item label="密码" class="user-form" prop="password">
              <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="再次输入密码" class="user-form" prop="again">
            <el-input type="password" v-model="form.again" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="用户角色" class="user-form">
            <el-select v-model="form.role" placeholder="请选择用户角色">
              <el-option label="普通会员" value="1"></el-option>
              <el-option label="高级会员" value="2" :disabled="true"></el-option>
            </el-select>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="电子邮箱" class="user-form" prop="email">
            <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form">
          <el-button type="primary" @click="onSubmit">创 建 用 户</el-button>
        </el-form-item>
        </el-form>
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
        load: true,
        form: {
          mobile: '',
          password: '',
          again: '',
          role: '',
          email: ''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {min: 11, max: 11, message: '号码格式不正确', trigger: 'blur'}
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          again: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let form = this.form
        delete form.again
        this.$http.post(API + 'user/add', form, {
          headers: {'Authorization': 'Bearer ' + user.token}
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '创建成功',
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
  .user-form{
    margin-top: 20px;
  }
  .footer {
    width: 100%;
    margin-left:360px;
  }
</style>
