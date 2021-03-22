<template>
  <div class="information">
    <headers :title="title"></headers>
    <div class="contar">
      <p class="title1">付款凭证</p >
      <img v-for="(item,index) in list.voucherImgs" :src="item" class="infoImg" :key="index">
      <p class="title1">付款银行户名</p >
      <p class="text">{{list.accountName}}</p >
      <p class="title1">付款银行账号</p >
      <p class="text">{{list.account}}</p >
      <p class="title1">联系手机</p >
      <p class="text">{{list.phoneNumber}}</p >
      <p class="title1">付款日期</p >
      <p class="text">{{list.payTime}}</p >
      <p class="title1">备注</p >
      <p class="text">{{list.remark}}</p >
    </div>
  </div>
</template>
<script>
import Headers from '@/components/header'
  export default {
    name: 'remittanceInformation',
    components:{Headers},
    data() {
      return {
        list:[],
        orderNo:'',
        title:'查看汇款凭证',
      }
    },
    mounted() {
      this.orderNo=this.$route.query.id
      this.axios.post('/api/v1/order/queryVoucher', {
        "data": {
          "orderNo":this.orderNo
        },
        "sessionId": this.$cookies.get('sessionId')
      }).then(res=>{
        this.list = res.data.data
      },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })
    },
    methods: {

    },
  }
</script>
<style>
  .contar {
    width: 92%;
    margin: 0 auto;
    margin-top: 6px;
  }

  .title1 {
    padding: 10px 0;
    line-height: 40px;
    color: #666666;
    font-size: 28px;
    margin-top: 20px;
  }

  .infoImg {
    width: 120px;
    height: 120px;
    margin-top: 20px;
  }

  .text {
    font-size: 34px;
    color: #333333;
    font-weight: 600;
    line-height: 48px;
  }
.information{
  height: 100%;
  background: #fff;
}
</style>