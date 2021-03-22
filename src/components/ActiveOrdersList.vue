<template>
  <div>   
      <div class="contan" v-for="(item,index) in orderList" :key="index">
        <div class="contents">
          <div class="ordersNum">
            <span class="num">订单号：{{item.orderNo}}</span>
            <p class="status" :class="item.orderStatus==3?'status_active':'' || item.orderStatus==2?'status_hs_active':''">{{StatusText(item.orderStatus)}}</p>
          </div>
          <div class="informationText" @click="Go_detail(item.orderStatus,item.orderNo)">
            <div class="informationTile">
              <p>{{item.orderName}}</p>
              <img src="../assets/images/more.png">
            </div>
            <div class="informationTime">
              <span class="timeName">下单时间：</span>
              <span class="Time">{{item.createTime}}</span>
            </div>
            <div class="informationTime">
              <span class="timeName">绑定机构：</span>
              <span class="Time">{{item.orgaName}}</span>
            </div>
          </div>
          <div class="morry" :class="item.orderStatus==4?'finish':''">
            <div class="invoice" v-if="item.orderStatus==4">电子发票</div>
            <p><span>共计</span>￥{{item.amount}}</p>
            
          </div>
        </div>
      </div>
    
  </div>
</template>
<script>
  export default {
    // props: ['orderList','total',]
    props:{
      orderList:{
        type:Array
      },
      total:{
        type:Number
      },
    
    },

    data() {
      return {
        list: [],
        finished: false,
        
      }
    },
    // computed:{
    //   flag(){
    //     return this.loading
    //   }
    // },
    // watch:{
    //   loading(NewVal,ordVal){
    //     this.flag =  newVal
    //   }
    // },
    methods: {
      StatusText(num) {
        if (num == 1) {
          return '待支付'
        }else if(num==2){
          return '核实中'
        }else if(num==3){
          return '核实不通过'
        }else if(num==4){
          return '已支付'
        }
      },
      Go_detail(type,id){
        if(type==1){
          this.$router.push({path:`/pay/${id}`})
        }else{
          this.$router.push({path:`/orderdetail/${id}`})
        }   
      }
    },
  }

</script>
<style>
  .morry {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 30px;
    line-height: 60px;
  }
  .finish{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .morry span {
    font-size: 24px;
    margin-right: 30px;
    color: #666666;
  }

  .morry p {
    font-family: 'alibaba_M';
    color: #FE4600;
    font-size: 48px;
  }

  .informationTime {
    margin-top: 12px;
  }

  .timeName {
    font-size: 28px;
    color: #666666;
    margin-left: 20px;
  }

  .Time {
    font-size: 28px;
    color: #333333;
    font-family: alibaba_M;
  }

  .informationText {
    width: 690px;
    height: 200px;
    background: #F9F9F9;
  }

  .informationTile {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 24px;
  }

  .informationTile p {
    font-family: 'alibaba_M';
    font-size: 34px;
    margin-left: 20px;
  }

  .informationTile img {
    width: 34px;
    height: 34px;
    margin-top: 5px;
    margin-right: 32px;
  }

  .contan {
    width: 100%;
    height: 406px;
    background-color: #fff;
  }

  .contents {
    width: 690px;
    margin: 0 auto;

  }

  .ordersNum {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 98px;
    line-height: 98px;
  }

  .num {
    /* margin-left: 20px; */
    font-size: 28px;
    /* font-weight: bold; */
    font-family: 'alibaba_M';
    color: #666666;
  }

  .status {
    font-family: 'alibaba_B';
    font-size: 34px;
    color: #333333;
  }
  .status_active{
    color:#FE4600;
  }
  .status_hs_active{
    color: #999;
  }
  .invoice{
    width: 176px;
    height: 60px;
    color: #fff;
    background: #4086F7;
    border-radius: 26px;
    line-height: 60px;
    text-align: center;
    font-size: 28px;
  }
</style>