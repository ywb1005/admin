<template>
    <div class="container">
      <h3>添加章节</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加章节</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px;width: 600px;">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="书籍ID" class="user-form" prop="id">
            <el-input v-model="form.id" placeholder="请输入书籍ID"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="章节名称" class="user-form" prop="name">
            <el-input  v-model="form.name" placeholder="请输入章节名称"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="章节序号" class="user-form" prop="index">
            <el-input v-model="form.index" placeholder="请输入章节序号"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="章节配图" class="user-form" prop="image">
            <el-upload
              name="image"
              class="avatar-uploader avatar"
              :show-file-list="false"
              :action="fileAction"
              :headers="headers"
              :on-success="handleSuccess">
              <img v-if="imageUrl" :src="imageUrl" style="" size="tiny" width="140px" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form" label="章节txt上传" prop="url">
            <el-upload
              name="files"
              class="upload-demo"
              :action="zipAction"
              :on-success="Success"
              :headers="headers"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传txt文件, 且不能超过1M</div>
            </el-upload>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form">
            <el-button type="primary" @click="onSubmit"> 添 加 章 节</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
</template>
<script>
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('admin'))
  export default {
    mounted () {
    },
    data () {
      return {
        load: true,
        fileAction: API + 'file',
        zipAction: API + 'files',
        headers: {'Authorization': 'Bearer ' + user.token},
        form: {
          id: '',
          name: '',
          image: '',
          index: '',
          url: ''
        },
        imageUrl: '',
        fileList: [],
        rules: {
          id: [
            { required: true, message: '请输入书籍id', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入书籍名称', trigger: 'blur' }
          ],
          index: [
            { required: true, message: '请输入书籍序号', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '请上传书籍配图', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请上传书籍TXT文件', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSuccess (response, file) {
        this.form.image = response.data
        this.imageUrl = file.url
      },
      Success (response, fileList) {
        this.form.url = response.data
        this.fileList.push(fileList)
      },
      beforeAvatarUpload (file) {
        const isTXT = file.type === 'text/plain'
        const isLt1M = file.size / 1024 / 1024 < 2

        if (!isTXT) {
          this.$message.error('上传文件只能是 TXT 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
        }
        return isTXT && isLt1M
      },
      onSubmit () {
        this.load = true
        this.$http.post(API + 'book/section/create', this.form, {
          headers: this.headers
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '添加成功',
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
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
