<template>
  <div>
    <headers :title="title"></headers>
    <div class="contan">
      <div class="listChoos">
        <ul>
          <li :class="typeId==0?'act':''" @click="listClick(0)">全部</li>
          <li :class="item.typeId==typeId?'act':''" v-for="(item,index) in ListCase" :key="index" @click="listClick(item.typeId)">{{item.typeName}}</li>
        </ul>
      </div>

      <div class="CaseList">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in orderContent" :key="index" class="caseClick" @click="showCode(index)">
          <div class="case">
            <div class="caseLifeRig">
              <div class="caseImg">
                <img :src="item.images">
              </div>
              <div class="CaseText">
                <div class="caseTilt">
                  <p>{{item.orgaName}}</p>
                  <div style="margin-top: 3px;">
                    <van-icon name="arrow" size="10px" />
                  </div>
                </div>
                <div class="Conten">
                  <p>{{item.activityName}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="caseShow" v-if="index==num && flg" style="background-color: #F8FBFF;">
            <div class="caseLifeRig">
              <div class="caseImg">
                <img :src="item.qrcodeUrl" alt="">
              </div>
              <div class="CaseTextShow" style="position: relative;width: 100%;">
                <div style="position: absolute; right: 0px; top: 3px;">
                  <van-icon name="arrow-left" size="10px" color="#4086F7" />
                </div>
                <div class="showText">
                  <p>使用微信扫码/识别查看活动</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </van-list>
      </div>

    </div>
  </div>
</template>
<script>
import Headers from '@/components/header'
  export default {
    name: 'CustomerCase',
    data() {
      return {
        flg: false,
        ListCase: [],
        ListText: [],
        num: '',
        typeId:0,
        orderContent: [],
        tatol: '',
        size: 1,
        pages:'',
        loading:false,
        finished: false,
        Once: true,
        title:'客户案例',
      }
    },
    components: {
      Headers
    },
    mounted() {
      this.axios.post('/api/v1/activity/getCustomerTypes', {
      }).then(res => {
        this.ListCase = res.data.data
      },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })
    },
    methods: {
      onLoad() {
        this.getActive()
      },
      getActive(){
        if(!this.Once){return}
        
        if(this.pages!=''&&this.pages<=(this.size-1)){
          this.finished = true
          this.loading = false
          return
        }
        this.Once = false
        this.axios.post('/api/v1/activity/getCustomerCases', {
          "data": {
            "pageNum": this.size,
            "pageSize": 10,
            "typeId": this.typeId
          },
          "sessionId": this.$cookies.get('sessionId')
        }).then(res => {
          this.orderContent = this.orderContent.concat(res.data.data.records) 
          this.tatol = res.data.data.total
          this.pages = res.data.data.pages
          if(this.tatol==0){
            this.finished=true
          }else{
            this.size = this.size+1
            this.loading=false
            this.Once = true
            this.finished=false
          }
          
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      }).catch((response) => {
          this.Once = true
          reject(response)
        })
      },
      showCode(index) {
        if (index != this.num) {
          this.flg = false
        }
        this.num = index
        this.flg = !this.flg
      },
      listClick(ID) {
        this.typeId=ID
        this.size=1
        this.pages=''
        this.loading=false
        this.finished= false
        this.Once=true
        this.orderContent=[]
        this.getActive()
      },
    },
    
  }
</script>
<style>
  .CaseTextShow {
    display: flex;
    /* flex-direction: column; */
    margin-top: 32px;
    margin-left: 20px;
  }

  .showText {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .showText p {

    font-size: 28px;

    line-height: 40px;
  }

  .CaseList {
    background-color: #FAFAFA;
    /* margin-top: 20px; */
    padding-top: 16px;
    padding-bottom: 25px;
  }

  .case {
    width: 670px;
    height: 180px;
    background: #FFFFFF;

    box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.03);
    border-radius: 16px;
    margin: 0 auto;
    /* padding-top: 16px; */
    margin-top: 16px;
  }

  .caseShow {
    width: 670px;
    height: 180px;
    box-shadow: 0px 12px 20px 0px rgba(0, 0, 0, 0.03);
    border-radius: 16px;
    margin: 0 auto;
    margin-top: 16px;
  }


  .caseLifeRig {
    width: 92%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }

  .caseImg {
    width: 140px;
    height: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 30px;
  }

  .caseImg img {
    width: 140px;
  }

  .contan {
    width: 100%;
    min-height: 100%;
    padding-bottom: 20px;
  }

  .listChoos {
    padding-bottom: 16px;
    background: #fff;
  }

  .listChoos ul {
    display: flex;
    flex-direction: row;
    /* justify-content: */
    flex-wrap: wrap;
  }

  .listChoos li {
    width: 197px;
    height: 48px;
    border-radius: 24px;
    border: 1px solid #CCCCCC;
    text-align: center;
    line-height: 48px;
    margin-left: 40px;
    font-size: 24px;
    color: #666666;
    margin-top: 16px;
  }

  .listChoos .act {
    color: #fff;
    background-color: #4086F7;
  }

  .CaseText {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    margin-left: 20px;
  }

  .caseTilt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .caseTilt p {

    font-size: 32px;

    color: #333333;

    line-height: 44px;
  }

  .Conten {
    margin-top: 4px;
  }

  .Conten p {
    width: 430px;
    font-size: 24px;
    color: #666666;
    line-height: 34px;
  }
</style>