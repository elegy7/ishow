<style lang="less" rel="stylesheet/less" scoped>
.input-hidden {
    width: 0;
    height: 0;
    overflow: hidden;
}
.modal-title {
    font-size: 1rem;
}
.dropdown-menu {
    left: -100px;
}
.dropdown-item {
    width: 240px;
    padding-right: 0.5rem;
    .fa {
        margin-top: 5px;
        color: chocolate !important;
    }
}
.fa-plus {
    color: #5f5fa8;
}
.remove-warpper {
    width: 30px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: darken(rgb(248, 245, 240), 10%);
    }
}
</style>
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand"
                   to="/#/dashboard">ISHOW</router-link>
      <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->

      <div class="collapse navbar-collapse"
           id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto"
            v-if="$root.userinfo.username">
          <li class="nav-item create active"
              style="margin-right: 100px;"
              @click="createShow">
            <a class="nav-link"
               href="javascript:void(0);">创建新应用
              <i class="fa fa-plus" />
            </a>
          </li>
          <li class="nav-item dropdown active">
            <a class="nav-link dropdown-toggle"
               @click="openMyApp"
               href="#"
               data-toggle="dropdown">
              我的应用
            </a>
            <div class="dropdown-menu">
              <router-link :class="['dropdown-item', {'active': item.id == showId}]"
                           href="javascript:void(0);"
                           :to="{path: '/center', query: {showId: item.id}}"
                           v-for="item in $root.showList">
                {{item.title}}
                <span class="remove-warpper fr"
                      @click="removeShow(item.id, $event)">
                  <i class="fa fa-trash-alt" />
                </span>
              </router-link>
              <a href="#"
                 class="dropdown-item"
                 v-show="!$root.showList.length">暂未创建应用</a>
            </div>
          </li>
          <!-- <li class="nav-item active">
                        <a class="nav-link" href="javascript:void(0);">个人中心</a>
                    </li> -->
          <li class="nav-item">
            <a id="logout"
               class="nav-link"
               href="javascript:void(0);"
               @click="logout">退出登录</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto"
            v-else>
          <li class="nav-item active">
            <a class="nav-link"
               href="javascript:void(0);"
               @click="openModal('#loginModal')">登录</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
               href="javascript:void(0);"
               @click="openModal('#registerModal')">注册</a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="loginModal"
         class="modal fade"
         tabindex="-1"
         role="dialog">
      <div class="modal-dialog modal-dialog-centered"
           role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title"
                id="exampleModalLabel">登录</h6>
            <button type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-hidden">
                <input type="password">
              </div>
              <div class="form-group">
                <label>用户名</label>
                <input class="form-control"
                       type="text"
                       v-model="info.loginname"
                       data-valid="['required']"
                       data-label="用户名"
                       autocomplete="off">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input class="form-control"
                       type="password"
                       v-model="info.password"
                       data-valid="['required']"
                       data-label="密码"
                       autocomplete="off"
                       @keyup.13="login">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#registerModal"
                    class="btn btn-sm btn-outline-info btn-cancel mr-auto">没有账号,我要注册</button>
            <button type="button"
                    class="btn btn-sm btn-info btn-ok"
                    @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
    <div id="registerModal"
         class="modal fade"
         tabindex="-1"
         role="dialog">
      <div class="modal-dialog modal-dialog-centered"
           role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h6 class="modal-title"
                id="exampleModalLabel">新用户注册</h6>
            <button type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>用户名</label>
                <input class="form-control"
                       type="text"
                       v-model="info.username"
                       data-valid="['required', 'base', 'checkname']"
                       data-label="用户名"
                       autocomplete="off">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input class="form-control"
                       type="password"
                       v-model="info.password2"
                       data-valid="['required']"
                       data-label="密码"
                       autocomplete="off">
              </div>
              <div class="form-group">
                <label>确认密码</label>
                <input class="form-control"
                       type="password"
                       v-model="info.password3"
                       data-valid="['required', 'passEQ(0)']"
                       data-label="密码"
                       autocomplete="off">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input class="form-control"
                       type="email"
                       v-model="info.email"
                       data-valid="['required', 'email', 'checkemail']"
                       data-label="邮箱">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button"
                    data-dismiss="modal"
                    data-toggle="modal"
                    data-target="#loginModal"
                    class="btn btn-sm btn-outline-success btn-cancel mr-auto">已有账号,我要登录</button>
            <button type="button"
                    class="btn btn-sm btn-success btn-ok"
                    @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Md5, Util } from '@elegy7/spare'
const info = {
    loginname: 'admin',
    password: 'admin',
    password2: '', //注册用
    password3: '', //注册用
    email: ''
}
export default {
    data() {
        return {
            theme: 'light',
            loginModal: false,
            registerModal: false,
            info: Common.clone(info)
        }
    },
    computed: {
        showId() {
            return this.$route.query.showId
        }
    },
    methods: {
        openModal(elName) {
            $(elName).modal('show')
        },
        openMyApp() {
            $('.dropdown-toggle').dropdown()
        },
        login() {
            const self = this
            //表单验证
            const isPass = $('#loginModal')
                .one('hidden.bs.modal', function() {
                    $(this).clearValid()
                })
                .fireValid()
            if (!isPass) return
            Common.fetch({
                url: '/user/login',
                type: 'POST',
                data: {
                    loginame: this.info.loginname,
                    password: Md5(this.info.password),
                    showId: this.$route.query.showId
                },
                success(data, res) {
                    self.getMyShow()
                    self.getSystemShow()
                    Common.reloadAfterLogin && window.location.reload()
                    //将用户信息存在session
                    Util.store.sessionSave('l', 'userinfo', data)
                    self.$root.userinfo = data
                    //关掉登录窗口,弹出登录成功信息
                    $('#loginModal').modal('hide')
                    self.info = Common.clone(info)
                    Common.msg(res.summary)
                }
            })
        },
        register() {
            const self = this
            //表单验证
            const isPass = $('#registerModal')
                .one('hidden.bs.modal', function() {
                    $(this).clearValid()
                })
                .fireValid()
            if (!isPass) return
            Common.fetch({
                url: '/user/register',
                type: 'POST',
                native: true,
                data: {
                    username: this.info.username,
                    password: Md5(this.info.password2),
                    email: this.info.email
                },
                success(result) {
                    if (result.status) {
                        $('#registerModal').modal('hide')
                        $('#loginModal').modal('show')
                        self.info = Common.clone(info)
                        Common.msg(result.summary)
                    } else {
                        Common.msg(result.summary)
                    }
                }
            })
        },
        logout() {
            const self = this
            Common.fetch({
                url: '/user/logout',
                type: 'POST',
                success() {
                    self.$root.userinfo = {}
                    self.$root.unlogin()
                    $('.dropdown-toggle').dropdown('dispose')
                }
            })
        },
        createShow() {
            const self = this
            Common.fetch({
                url: '/show/createShow',
                success(showId) {
                    Common.msg('创建成功')
                    self.getMyShow()
                    // 如果登录用户是管理员, 则更新系统应用列表
                    if (self.$root.userinfo.type == 0) {
                        console.log('invoke')
                        self.getSystemShow()
                    }
                    if (self.showId) return
                    self.$router.push({ path: '/center', query: { showId } })
                }
            })
        },
        // 初始化头部"我的应用"列表
        getMyShow() {
            const self = this
            Common.fetch({
                url: '/show/getMyShow',
                type: 'GET',
                async: false,
                success(data) {
                    self.$root.showList = data
                }
            })
        },
        // 初始化"系统应用"列表
        getSystemShow() {
            const self = this
            Common.fetch({
                url: '/show/getSystemShow',
                type: 'GET',
                success(data) {
                    self.$root.sysShowList = data
                }
            })
        },
        /* 删除一个应用 */
        removeShow(showId, e) {
            e.stopPropagation()
            const self = this
            if (showId == this.showId) {
                Common.msg('不能删除当前打开的应用', '', 'warning')
                return
            }
            Common.Modal.confirm('确定要删除这个应用吗?', '', function() {
                Common.fetch({
                    url: '/show/removeShow',
                    type: 'POST',
                    data: {
                        id: showId
                    },
                    success(data, res) {
                        if (res.status == 1) {
                            self.getMyShow()
                            // 如果登录用户是管理员, 则更新系统应用列表
                            if (self.$root.userinfo.type == 0) {
                                self.getSystemShow()
                            }
                            Common.msg('删除成功')
                            //如果删除的应用是正在浏览的应用,则刷新页面
                            if (data.redirect) window.location.href = '/index'
                        } else {
                            Common.msg('删除失败', '', 'danger')
                        }
                    }
                })
            })
        }
    },
    mounted() {
        $.extend(Common.Valid.asyncRules, {
            checkname: {
                validator(value) {
                    let exist = false
                    Common.fetch({
                        url: '/user/checkname',
                        type: 'GET',
                        data: {
                            username: value
                        },
                        async: false,
                        native: true,
                        success(result) {
                            if (result.status === 0) {
                                exist = true
                            }
                        }
                    })
                    return !exist
                },
                message: '用户名已存在！'
            },
            checkemail: {
                validator(value) {
                    let exist = false
                    Common.fetch({
                        url: '/user/checkemail',
                        type: 'GET',
                        data: {
                            email: value
                        },
                        async: false,
                        native: true,
                        success(result) {
                            if (result.status === 0) {
                                exist = true
                            }
                        }
                    })
                    return !exist
                },
                message: '邮箱已存在！'
            }
        })
        $(this.$el).bindValid()
        /* 如果已登录, 获得该用户所有应用 */
        if (this.$root.userinfo.username) {
            this.getMyShow()
            this.getSystemShow()
        }
    }
}
</script>
