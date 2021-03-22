<template>
<div class="white">
  <headers :title="title"></headers>
  <div class="conter">    
    <div class="institution">
      <img src="./../assets/images/titleIcon.png" alt="">
      <span>登陆成功</span>
    </div>
    <p class="institutionText">请选择机构进行绑定</p>
    <p class="institutionText2">套餐服务将基于当前绑定机构进行下单</p>
    <div class="institutionName">
      <img src="./../assets/images/gang.png" alt="">
      <span>机构名称</span>
    </div>
    <div class="chooseName">
      <input type="text" :class="chooseBlock?'chooseInptBorder':'chooseInpt'" v-model="search" @input="institutionInfo"
        placeholder="请输入机构名称进行选择">
      <ul class="showChoose" v-if="chooseBlock">
        <li v-for="(item,index) in list" @click="showItem($event,item.orgaId)" :key="index">
          <span>{{item.orgaName.substr(0,item.orgaName.indexOf(search))}}</span><span
            style="color:#2A70FE">{{search}}</span><span>{{item.orgaName.substr(item.orgaName.indexOf(search)+search.length)}}</span>
        </li>
        <li v-if="NONETEXT">暂无数据</li>
        <!-- v-for="(item,index) in items"{{item.orgaName}} -->
      </ul>
    </div>
    <p class="Tips">仅可选择已购买开通优谷朗读产品服务机构(如购买过活动套餐/优谷朗读亭/留声墙/小舞台等)，若有疑问请联系客服</p>
    <binding :disabledTRE=btnClick :text="text1" @nextTop="nextGo"></binding>
  </div>
</div>
</template>
<script>
  import binding from './../components/bindingBtn'
  import Headers from '@/components/header'
  export default {
    name: 'InstitutionalBinding',
    data() {
      return {
        text1: '进行绑定',
        title:'机构绑定',
        search: '',
        list: [],
        chooseBlock: false,
        NONETEXT: false,
        orgaId: '',
        btnClick: false,
      }
    },
    components: {
      binding,
      Headers
    },
    computed: {


    },
    methods: {
      showItem(event, id) {
        this.search = event.currentTarget.innerText
        this.chooseBlock = false
        this.orgaId = id
        if (this.orgaId != '' && this.search != null) {
          this.btnClick = true
        } else {
          this.btnClick = false
        }
      },

      institutionInfo() {
        if (this.search) {
          this.chooseBlock = true
        } else {
          this.chooseBlock = false
        }
        // this.orgaId = ''
        this.btnClick = false
        this.axios.post('/api/v1/login/searchOrgaInfos', {
          data: {
            pageNum: 1,
            pageSize: 10,
            searchContent: this.search ? this.search : ''
          }
        }).then(res => {
          this.list = res.data.data.records
          this.NONETEXT = false

          // console.log(res.data.data.total)
          if (res.data.data.total == 0) {
            this.NONETEXT = true
          }
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })
      },
      nextGo() {
        // console.log(num)
        this.axios.post('/api/v1/login/bindOrga', {
          "data": {
            "orgaId": this.orgaId
          },
          "sessionId": this.$cookies.get('sessionId')
        }).then(res=>{
          // console.log(res)
          this.$router.push({path:"success",query:{id:this.orgaId}})
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })
      },
    },
  }
</script>

<style lang="css">
.white{
  background: #fff;
  height: 100%;
}
  .showChoose {
    width: 702px;
    background-color: #fff;
    position: absolute;
    z-index: 99;
    border: 1px solid #ccc;
    border-top: none;
    height: 500px;
    overflow-y: auto;

    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);

    border-radius: 8px;
    box-sizing: border-box;
  }

  .showChoose li {

    font-size: 34px;
    color: #333;
    line-height: 48px;
    margin-bottom: 32px;
    margin-left: 20px;
    font-family: alibaba_M;
  }

  .conter {
    width: 94%;
    margin: 0 auto;
    min-height: 1200px;
    position: relative;
  }

  .institution {
    padding-top: 48px;
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
    flex-direction: row;
  }

  .institutionName img {
    width: 6px;
    height: 20px;
    margin-top: 16px;
  }

  .institutionName span {
    font-size: 40px;
    margin-left: 16px;
    font-weight: 600;
  }

  .chooseName {
    width: 702px;
    height: 100px;
  }

  .chooseInpt {
    line-height: 80px;
    width: 702px;
    border: none;
    border-bottom: 1px solid #CCCCCC;
    margin-top: 20px;
    font-size: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .chooseInptBorder {
    line-height: 80px;
    width: 702px;
    border: none;
    border: 1px solid #CCCCCC;
    border-bottom: none;
    margin-top: 20px;
    font-size: 40px;
    padding-left: 10px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    box-sizing: border-box;
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .Tips {
    font-size: 24px;
    color: #999999;
    line-height: 46px;
    margin-top: 40px;
  }
</style>