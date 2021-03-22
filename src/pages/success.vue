<template>
  <div class="white_background">
    <headers :title="title"></headers>
    <popup :srcImg="require('./../assets/images/binding.png')" :startText="textOne" :infoText="textTow"></popup>
    <binding :disabledTRE=true @nextTop="nextGo" :text="text"></binding>
  </div>
</template>
<script>
  import popup from './../components/PopupBinding'
  import binding from './../components/bindingBtn'
  import Headers from '@/components/header'
  export default {
    name: 'success',
    data() {
      return {
        textOne :'机构绑定成功',
        textTow:'完成认证后，个人中心内可同步该机构数据',
        text:'进行机构身份认证',
        title:'机构绑定',
        orderId:''
      }
    },
    components:{
      popup,
      binding,
      Headers
    },
    methods: {
      nextGo(){
        this.orderId=this.$route.query.id
        this.$router.push({name:"identityAuthentication",query:{id:this.orderId}})
      }
    },
  }
</script>
<style lang="css">
.white_background{
  background: #fff;
  min-height: 100%;
}
</style>