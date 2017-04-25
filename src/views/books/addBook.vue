<template>
    <div class="container">
      <h3>添加书籍</h3>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">书籍管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加书籍</el-breadcrumb-item>
      </el-breadcrumb>
      <hr>
      <el-row style="margin-top:40px;width: 600px;">
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
          <el-form-item label="书籍名称" class="user-form" prop="name">
            <el-input v-model="form.name" placeholder="请输入书籍名称"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="分类名称" class="user-form" prop="category">
            <el-input  v-model="form.category" placeholder="请输入分类名称"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="作品摘要" class="user-form" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="作者" class="user-form" prop="author">
            <el-input  v-model="form.author" placeholder="请输入作者"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="书籍权重" class="user-form" prop="weight">
            <el-input v-model="form.weight" placeholder="请输入书籍权重"></el-input>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="关键词" class="user-form" prop="keyword">
            <el-input v-model="form.keyword" placeholder="请输入关键词"></el-input>
            <span style="color: #99A9BF;">关键词之间需要用英文逗号隔开(仙侠,角色,无情)</span>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item label="书籍配图" class="user-form" prop="image">
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
          <el-form-item class="user-form" label="会员阅读">
            <el-switch
              v-model="form.isMember"
              on-color="#13ce66"
              on-text="是"
              off-color="#ff4949"
              off-text="否">
            </el-switch>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form" label="热门书籍">
            <el-switch
              v-model="form.isHot"
              on-color="#13ce66"
              on-text="是"
              off-color="#ff4949"
              off-text="否">
            </el-switch>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form" label="新书">
            <el-switch
              v-model="form.isNew"
              on-color="#13ce66"
              on-text="是"
              off-color="#ff4949"
              off-text="否">
            </el-switch>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form" label="书籍上传">
            <el-upload
              name="files"
              class="upload-demo"
              :action="zipAction"
              :headers="headers"
              :on-success="Success"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传压缩包文件, 且不能超过50M</div>
            </el-upload>
          </el-form-item>
          <hr class="line-dashed">
          <el-form-item class="user-form">
            <el-button type="primary" @click="onSubmit"> 添 加 书 籍</el-button>
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
        zipAction: API + 'files',
        fileAction: API + 'file',
        headers: {'Authorization': 'Bearer ' + user.token},
        form: {
          name: '',
          category: '',
          author: '',
          desc: '',
          weight: '',
          keyword: '',
          image: '',
          downloadUrl: '',
          isMember: false,
          isHot: false,
          isNew: false
        },
        fileList: [],
        imageUrl: '',
        rules: {
          name: [
            { required: true, message: '请输入书籍名称', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请输入书籍分类', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入书籍作者', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入书籍摘要', trigger: 'blur' },
            { max: 300, message: '书籍摘要不能超过300字', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '请上传书籍配图', trigger: 'blur' }
          ],
          keyword: [
            { required: true, message: '请输入书籍关键词', trigger: 'blur' }
          ],
          weight: [
            { required: true, message: '请输入书籍权重', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      beforeAvatarUpload (file) {
        const isZip = file.type === 'application/zip'
        const isLt50M = file.size / 1024 / 1024 < 50
        if (!isZip) {
          this.$message.error('上传文件只能是 ZIP 格式!')
        }
        if (!isLt50M) {
          this.$message.error('上传头像图片大小不能超过 50MB!')
        }
        return isZip && isLt50M
      },
      Success (response, fileList) {
        console.log(fileList)
        this.form.downloadUrl = response.data
        this.fileList.push(fileList)
      },
      handleSuccess (response, file) {
        this.form.image = response.data
        this.imageUrl = file.url
      },
      onSubmit () {
        this.$http.post(API + 'book/create', this.form, {
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
