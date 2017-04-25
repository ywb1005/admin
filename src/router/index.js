import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/member'
    },
    {
      path: '/login',
      title: '一叶书屋',
      component (resolve) {
        require(['views/login.vue'], resolve)
      }
    },
    {
      path: '/member',
      title: '会员管理',
      component (resolve) {
        require(['views/base.vue'], resolve)
      },
      children: [
        {
          path: '/member/list',
          title: '会员列表',
          component (resolve) {
            require(['views/member/member.vue'], resolve)
          }
        },
        {
          path: '/member/add',
          title: '添加会员',
          component (resolve) {
            require(['views/member/addMember.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/book',
      title: '书籍管理',
      component (resolve) {
        require(['views/base.vue'], resolve)
      },
      children: [
        {
          path: '/book/list',
          title: '书籍列表',
          component (resolve) {
            require(['views/books/book.vue'], resolve)
          }
        },
        {
          path: '/book/add',
          title: '添加书籍',
          component (resolve) {
            require(['views/books/addBook.vue'], resolve)
          }
        },
        {
          path: '/book/section/add',
          title: '添加章节',
          component (resolve) {
            require(['views/books/addSection.vue'], resolve)
          }
        },
        {
          path: '/book/edit/:id',
          title: '修改书籍',
          component (resolve) {
            require(['views/books/editBook.vue'], resolve)
          }
        },
        {
          path: '/book/:id/section/list',
          title: '章节列表',
          component (resolve) {
            require(['views/books/section.vue'], resolve)
          }
        },
        {
          path: '/book/:id/section/edit/:sectionId',
          title: '修改章节',
          component (resolve) {
            require(['views/books/editSection.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/comment',
      name: '评论管理',
      component (resolve) {
        require(['views/base.vue'], resolve)
      },
      children: [
        {
          path: '/comment/list',
          title: '书籍列表',
          component (resolve) {
            require(['views/comment/comment.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/user',
      title: '系统管理',
      component (resolve) {
        require(['views/base.vue'], resolve)
      },
      children: [
        {
          path: '/user/list',
          title: '书籍列表',
          component (resolve) {
            require(['views/user/user.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/option',
      title: '操作管理',
      component (resolve) {
        require(['views/base.vue'], resolve)
      },
      children: [
        {
          path: '/option/upload',
          title: '会员上传',
          component (resolve) {
            require(['views/options/upload.vue'], resolve)
          }
        },
        {
          path: '/option/download',
          title: '会员上传',
          component (resolve) {
            require(['views/options/download.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/login',
      title: '一叶书屋',
      component (resolve) {
        require(['views/login.vue'], resolve)
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((transition) => {
  NProgress.done()
})

export default router
