<template lang="html">
<div>
  <headers :title="title"></headers>
  <div class="whilte_background">    
    <LoginHeader class="headerImg"></LoginHeader>
    <div class="informationPost">
      <div class="phoneNumber">
        <span>手机号</span>
        <input type="text" placeholder="请输入手机号码" @input="search($event)" />
      </div>
      <div class="phoneNumber">
        <span>验证码</span>
        <input class="Codeinpt" type="text" placeholder="请输入验证码" @input="searchCode($event)" />
        <button @click="sendCode" :disabled="codeBtnStatus">{{codeBtn}}</button>
      </div>
      <div class="error">
        <p>{{errText}}</p>
      </div>
    </div>
    <button :class="dataFrom?'landBtnF':'landBtn'" @click="login" v-bind:disabled="dataFrom">登陆</button>
    <p class="regulations">登录即代表同意 <a @click="UserAgreement">用户协议</a> 和 <a @click="serviceAgreement">隐私政策</a></p>
  </div>
</div>
</template>

<script>
  import LoginHeader from './../components/loginHeader'
  import Headers from '@/components/header'
  export default {
    name: 'login',
    data() {
      return {
        myPhone: '',
        myCode: '',
        dataFrom: true,
        codeBtnStatus: false,
        errText: '',
        codeBtn: '发送验证码',
        title:'登录',
        timer: null
      }
    },
    components: {
      LoginHeader,
      Headers
    },
    mounted() {
    },
    methods: {
      serviceAgreement() {
        this.$router.push({path:'/serviceAgreement'})
      },
      UserAgreement() {
        this.$router.push({path:'/userAgree'})
      },
      search(event) {
        this.myPhone = event.currentTarget.value
        if (this.myPhone.length >= 11 && this.myCode.length >= 4) {
          this.dataFrom = false
        } else {
          this.dataFrom = true
        }
      },
      searchCode(event) {
        this.myCode = event.currentTarget.value
        if (this.myPhone.length >= 11 && this.myCode.length >= 4) {
          this.dataFrom = false
        } else {
          this.dataFrom = true
        }
      },
      login() {
        if (!(/^1[3456789]\d{9}$/.test(this.myPhone))) {
          this.errText = '*请输入正确的电话号码'
          return false;
        }else{
          this.axios.post('/api/v1/login/mobileLogin',{
            "data":{
              mobile:this.myPhone,
              smsCode:this.myCode
            }
          }).then(res=>{
            if(res.data.result==true){
              this.$cookies.set('sessionId',res.data.data.sessionId,60 * 60 * 24)
              if(res.data.data.isNewUser==1){
                this.$router.push({name:'InstitutionalBinding'})
              }else{
                this.$router.go(-1)
              }
            }else if(res.data.result==false){
              this.errText='*请输入正确的验证码错误'
            }
          },error=>{
            if(error.response.data.message=='缓存用户信息不存在'){
                this.$cookies.remove("sessionId")
                this.$router.push({path:'/login'})
            }
          })
        }
      },
      sendCode() {
        // console.log('发送成功')
        if (!(/^1[3456789]\d{9}$/.test(this.myPhone))) {
          this.errText = '*请输入正确的电话号码'
          return false;
        } else {
          this.errText = ''
          this.codeBtn = true

          this.axios.post('/api/v1/login/sendSmsCode', {
            data: {
              "mobile": this.myPhone,
            }
          }).then(res => {
          })
          setTimeout(() => {
            this.countDown(60)
          }, 5)
        }
      },

      countDown(val) {
        //判断定时器是否存在
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.codeBtn = '发送中'
        this.codeBtnStatus = false
        //setTiemOut 执行一次
        // setInterval 不断执行，需要条件才会停止
        let tim = val;
        this.timer = setInterval(() => {
          tim--;
          if (tim === 0) {
            clearInterval(this.timer)
            this.codeBtnStatus = false
            this.codeBtn = '重新获取'
          } else {
            this.codeBtnStatus = true
            this.codeBtn = `${tim}s`
          }
        }, 1000)
      },
    },
  }
</script>

<style lang="css">
.whilte_background{
  height: 100%;
  background: #fff;
  padding-top: 80px;
}
  .headerImg {
    /* margin-top: 80px; */
  }

  .informationPost {
    margin-top: 80px;
    border-top: 1px solid #EEEEEE;
  }

  .phoneNumber {
    height: 94px;
    border-bottom: 1px solid #EEEEEE;
  }

  .phoneNumber span {
    font-size: 34px;
    line-height: 94px;
    margin-left: 24px;
  }

  .phoneNumber input {
    height: 48px;
    width: 500px;
    margin-left: 40px;
    border: none;
    font-size: 34px;
  }

  .phoneNumber .Codeinpt {
    width: 280px;
    border-right: 1px solid #EEEEEE;
  }

  .phoneNumber button {
    display: inline-block;
    width: 170px;
    height: 48px;
    border: none;
    font-size: 34px;
    background: #fff;
    color: #4086F7;
    margin-left: 20px;
  }

  .landBtn {
    display: block;
    margin: 0 auto;
    margin-top: 14px;
    width: 700px;
    height: 100px;
    border: none;
    font-size: 36px;
    background: #4086F7;
    color: #fff;
    border-radius: 5px;
  }

  .landBtnF {
    display: block;
    margin: 0 auto;
    margin-top: 14px;
    width: 700px;
    height: 100px;
    border: none;
    font-size: 36px;
    background: #C5DAFC;
    color: #fff;
    border-radius: 5px;
  }

  .regulations {
    text-align: center;
    font-size: 24px;
    color: #999999;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 40px;
  }

  .regulations a {
    color: #666666;
  }

  .error {
    height: 80px;
  }

  .error p {
    line-height: 80px;
    color: #FE4600;
    margin-left: 24px;
    font-size: 24px
  }
</style>