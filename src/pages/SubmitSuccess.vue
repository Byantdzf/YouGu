<template>
  <div class="white_background">
    <headers :title="title"></headers>
    <popup :srcImg="require('./../assets/images/succicon.png')" :startText="textOne" :infoText="textTow"></popup>
    <button class="btn" @click="Go_activity()">返回活动订单</button>
  </div>
</template>
<script>
import popup from './../components/PopupBinding'
import Headers from '@/components/header'
export default {
  name :'SubmitSuccess',
  data() {
    return {
      textOne:'提交成功',
      textTow:'提交汇款信息后，系统将在1个工作日内完成审核，审核通过后会进行短信通知',
      title:'提交汇款信息',
    }
  },
  components:{
      popup,
      Headers
    },
    methods:{
      Go_activity(){
        this.$router.push({path:'/user'})
      }
    }
}
</script>
<style>
.white_background{
  height: 100%;
  background: #fff;
}
.poputText2{
  width: 80%;
  text-align: center;
}
.btn{
  display:block;
  margin: 0 auto;
  margin-top: 64px;
  border: none;
  width: 304px;
height: 92px;
background: #4086F7;
border-radius: 16px;

font-size: 34px;

color: #FFFFFF;
}
</style>