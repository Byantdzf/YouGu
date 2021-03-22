<template>
  <div class="container_order">
    <van-tabs v-model="active" @click="tab_type">
      <van-tab title="全部" style="background-color: #F9F9F9;" name="0">
        <div class="listmore">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <OrdersList :orderList="orderContent" :tatol="tatol"></OrdersList>
          </van-list>
        </div>

      </van-tab>
      <van-tab title="待支付" name="1">
        <div class="listmore">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <OrdersList :orderList="orderContent" :tatol="tatol"></OrdersList>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="凭证核实" name="2">
        <div class="listmore">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <OrdersList :orderList="orderContent" :tatol="tatol"></OrdersList>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="已支付" name="3">
        <div class="listmore">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <OrdersList :orderList="orderContent" :tatol="tatol"></OrdersList>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import OrdersList from './../components/ActiveOrdersList'
  export default {
    name: "order",
    data() {
      return {
        orderContent: [],
        active: '',
        tatol: '',
        size: 1,
        pages:'',
        loading:false,
        finished: false,
        Once: true,
        queryType:0
      }
    },
    components: {
      OrdersList
    },
    mounted() {
      // this.getOrder()
    },
    methods: {
      getOrder() {
        if(!this.Once){return}
        
        if(this.pages!=''&&this.pages<=(this.size-1)){
          this.finished = true
          return
        }
        this.Once = false
        this.axios.post('/api/v1/user/getOrderLists', {
          "data": {
            "pageNum": this.size,
            "pageSize": 10,
            "queryType": this.queryType
          },
          "sessionId": this.$cookies.get('sessionId')
        }).then(res => {
          if(res.data.data.records.length==0){
            this.finished = true
            
          }else{
            this.orderContent = this.orderContent.concat(res.data.data.records) 
            this.tatol = res.data.data.total
            this.pages = res.data.data.pages
            this.size = this.size+1
            this.loading=false
            this.finished = false
          }
          this.Once = true
          
        },error=>{
            if(error.response.data.message=='缓存用户信息不存在'){
                this.$cookies.remove("sessionId")
                this.$router.push({path:'/login'})
            }
        }).catch((response) => {
          this.Once = true
          
        })
      },
      onLoad(){
        this.getOrder()
      },
       tab_type(name){
          this.queryType = name
          this.orderContent = []
          this.loading = false
          this.pages=''
          this.size = 1
          this.getOrder()
       }
    },
  }
</script>
<style>
.container_order{
  padding-bottom: 172px;
}
.listmore {
  width: 100%;
  min-height: 1334px;
  background-color: #FAFAFA;
  margin-top: 20px;
}
.contan {
  margin-bottom: 20px;
}
.container_order .van-tabs__nav{
  background: #fff !important;
}
</style>