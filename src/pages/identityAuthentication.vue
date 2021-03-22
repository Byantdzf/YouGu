<template>
<div class="white_background">
  <headers :title="title"></headers>
  <div class="conter">   
    <div class="institution">
      <img src="./../assets/images/titleIcon.png" alt="">
      <span>开始认证</span>
    </div>
    <p class="institutionText">请进行机构身份认证</p>
    <p class="institutionText2">完成认证后，个人中心内可同步该机构数据</p>
    <div class="institutionName">
      <span>优谷朗读系统机构账号</span>
      <p class="institutionText2" style="margin-top: 20px;">完成认证后，个人中心内可同步该机构数据</p>
    </div>
    <div class="chooseName">
      <input type="text" v-model="search" placeholder="请输入登录账号" @input="textIdentity($event)"/>
    </div>
    <p class="Tips">仅已入驻机构均有机构账号，若遗忘可联系客服找回</p>
    <!-- <button class="binding">进行绑定</button> -->
    <!-- <div class="jump">
      <p>暂时跳过</p>
      <img src="./../assets/images/jump.png" alt="">
    </div> -->
    <binding @nextTop="nextTop" :text="text1" :disabledTRE="next"></binding>
  </div>
</div>
</template>
<script>
  import binding from './../components/bindingBtn'
  import Headers from '@/components/header'
  export default {
    name: 'identityAuthentication',
    data() {
      return {
        text1:'进行认证',
        title:'机构身份认证',
        search: '',
        next:false,
        list: [

        ]
      }
    },
    components:{
      binding,
      Headers
    },
    computed: {
    },
    methods: {
      showItem(event) {
        console.log(event.currentTarget.innerHTML)
        this.search = event.currentTarget.innerHTML
      },
      nextTop(){
        this.axios.post('/api/v1/login/authOrga', {
          "data": {
            "orgaAccount": this.search,
            "orgaId": this.$route.query.id,
          },
          "sessionId": this.$cookies.get('sessionId')
        }).then(res => {
            if(res.data.code == 400001){
              this.$toast(res.data.message)
            }else if(res.data.code = 200000){
              this.$route.push({path:'/CertificationSuccess'})
            }else{
              this.$toast(res.data.message)
            }
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
        })
      },
      textIdentity(event){
        if(event.currentTarget.value!=''){
          this.next=true
        }else{
          this.next = false
        }
      }
    },
    
  }
</script>

<style lang="css">
  .showChoose {
    width: 90%;
    background-color: #fff;
    position: absolute;
    z-index: 99;
  }

  .conter {
    width: 90%;
    margin: 0 auto;
  }

  .institution {
    margin-top: 48px;
    display: flex;
    flex-direction: row;

  }

  .institution img {
    width: 24px;
    height: 24px;
    margin-top: 12px;
  }

  .institution span {
    font-size: 40px;
    margin-left: 16px;
    font-weight: 600;
  }

  .institutionText {
    font-weight: 600;
    font-size: 36px;
    line-height: 80px;
  }

  .institutionText2 {
    font-size: 28px;
    color: #999999;
  }

  .institutionName {
    margin-top: 48px;
    display: flex;
    flex-direction: column;
  }

  .institutionName img {
    width:6px;
    height: 20px;
    margin-top: 16px;
  }

  .institutionName span {
    font-size: 40px;

    font-weight: 600;
  }

  .chooseName {
    height: 100px;
  }

  .chooseName input {
    line-height: 80px;
    width: 100%;
    border: none;
    border-bottom: 1px solid #CCCCCC;
    margin-top: 20px;
    font-size: 40px;
  }

  .Tips {
    font-size: 24px;
    color: #999999;
    line-height: 46px;
    margin-top: 40px;
  }
.white_background{
  background: #fff;
  height: 100%;
}
</style>
