<template>
  <div>
    <headers :title="title"></headers>
    <popup :srcImg="require('./../assets/images/cerSuccess.png')" :startText="textOne" :infoText="textTow"></popup>
  </div>
</template>
<script>
  import popup from './../components/PopupBinding'
  import binding from './../components/bindingBtn'
  import Headers from '@/components/header'
  export default {
    name: 'CertificationSuccess',
    data() {
      return {
        textOne :'认证成功',
        textTow:'',
        title:'机构身份认证',
      }
    },
    components:{
      popup,
      binding,
      Headers
    },
    mounted() {
      var a =4
      setInterval(() => {
        a--
        this.textTow=a+'秒后自动跳转至首页'
        if(a==0){
          this.$router.push('index')
        }
      }, 1000);
      
    },
  }
</script>
<style lang="css">

</style>