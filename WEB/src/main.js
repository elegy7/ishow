import Vue from 'vue/dist/vue.esm.js'
import router from './router'
import Entry from './pages/Entry'
import Common from './common/common.js'
import './assets/style/common.less'
import './assets/plugins/bootstrap/bootstrap.min.js'
//是否展示提示信息
Vue.config.productionTip = true
/*Vue初始化*/
/* eslint-disable no-new */
window.onload = function() {
    new Vue({
        el: 'Entry',
        data() {
            return {
                userinfo: Common.Util.store.sessionGet('l', 'userinfo') || {},
                showList: [],
                sysShowList: [],
                bgimage: '/public/images/default_bg.jpg'
            }
        },
        router,
        methods: {
            unlogin() {
                Common.Util.store.sessionRemove('l', 'userinfo')
                this.$router.push('/')
            },
            checkIsLogin() {
                if (!this.userinfo.username) {
                    Common.Util.store.sessionRemove('l', 'userinfo')
                    $('#loginModal').modal('show')
                    // this.$router.push('/')
                }
            }
        },
        watch: {
            '$route.query'() {
                this.checkIsLogin()
            }
        },
        components: {
            Entry
        },
        created() {
            this.checkIsLogin()
            Common.init(this)
        }
    })
}
