<template>
  <div>
    <div class="login">
      <h1 style="padding-left: 70px">书屋后台系统登录</h1>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <hr class="line">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item label="密码" prop="password">
          <el-input  v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item >
          <el-button  @click="onSubmit" type="text">忘记密码?</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 200px;" size="large">书 屋 登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <div class="footer">
      <span>Copyright by 一页书屋 &copy; 2017</span>
    </div>
  </div>
</template>
<script>
  const API = process.env.API
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let params = this.form
        this.$http.post(API + 'login', params, {
        }).then((response) => {
          if (response.data.code === 0) {
            let data = response.data.data
            this.$message({
              message: '登录成功',
              showClose: true,
              type: 'info'
            })
            window.localStorage.setItem('admin', JSON.stringify({name: data.name, token: data.token}))
            this.$router.push({path: '/'})
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .login{
    width: 30%;
    margin: 120px auto;
    border: 1px solid #20a0ff;
    border-radius: 4px;
    padding: 40px 120px;
    background-color: #afddff;
  }
  .line{
    border: 1px dashed #eeeeee;
  }
  .footer {
    width: 100%;
    text-align: center;
  }
</style>
