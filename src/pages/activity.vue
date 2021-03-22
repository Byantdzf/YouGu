<template>
  <div>
    <headers :title="title"></headers>
    <div class="conten">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="activity activity_card" v-for="(item,index) in orderContent" :key="index" :title="item" @click="showModelList(item)">
          <img class="activityImg" :src="item.imageUrl" alt="">
          <div class="activityInfo">
            <div class="activityTime">
              <p>{{item.activityName}}</p>
              <span>{{dateFormat('YYYY-mm-dd',item.beginTime)}}-{{dateFormat('mm-dd',item.endTime)}}</span>
            </div>
            <div class="activityNum">
              <div>
                <span class="glue">作品:</span>
                <span>{{item.opusNum}}</span>
              </div>
              <div>
                <span class="glue">报名:</span>
                <span>{{item.signNum}}</span>
              </div>
              <div>
                <span class="glue">投票:</span>
                <span>{{item.voteNum}}</span>
              </div>
            </div>
          </div>

        </div>

      </van-list>

      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="qcode">
            <img :src="src" />
            <p>需使用微信扫码/识别查看活动</p>
            <p>长按二维码保存到相册</p>
            <div class="close_qc" @click="show = false">
              <van-icon name="close" color="#fff" size="28" />
            </div>
          </div>
        </div>
      </van-overlay>

    </div>


  </div>
</template>
<script>
import Headers from '@/components/header'
  export default {
    name: 'activity',
    data() {
      return {
        items: [],
        orderContent: [],
        show: false,
        src: '',
        tatol: '',
        size: 1,
        pages:'',
        loading:false,
        finished: false,
        Once: true,
        title:'我的活动',

      }
    },
    components: {
      Headers
    },
    mounted() {
      
    },
    computed: {
    },
    methods: {
      dateFormat(fmt, date) {
        let ret = "";
        date = new Date(date);
        const opt = {
          'Y+': date.getFullYear().toString(), // 年
          'm+': (date.getMonth() + 1).toString(), // 月
          'd+': date.getDate().toString(), // 日
          'H+': date.getHours().toString(), // 时
          'M+': date.getMinutes().toString(), // 分
          'S+': date.getSeconds().toString() // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
            )
          }
        }
        return fmt
      },
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
        this.axios.post('/api/v1/user/getActivityLists', {
          "data": {
            "pageNum": this.size,
            "pageSize": 10,
          },
          "sessionId": this.$cookies.get('sessionId')
        }).then(res => {
          this.orderContent = this.orderContent.concat(res.data.data.records) 
          this.tatol = res.data.data.total
          this.pages = res.data.data.pages
          if(this.tatol==0){
            this.finished=true
            this.Once = true
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
      showModelList(item) {
        this.show = true
        this.src = item.qrcodeUrl
      }
    },
  }
</script>
<style lang="scss">
  .wrapper {
    position: absolute;
    top: 25%;
    left: 10%;
    width: 80%;
  }

  .qcode {
    text-align: center;

  }

  .qcode img {
    width: 320px;
    height: 320px;
    margin-bottom: 40px;
    border-radius: 16px;
  }

  .qcode p {
    font-size: 34px;
    line-height: 48px;
    color: #fff;
    text-align: center;
  }

  .close_qc {
    margin-top: 40px;
  }


  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }

  .activityNum {
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
  }

  .activityNum sapn {
    font-size: 24px;
  }

  .glue {
    color: #999999;
  }

  .activityTime {
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }

  .activityTime p {
    font-size: 32px;
    font-weight: 600;
  }

  .activityTime span {
    font-size: 24px;
    color: #999999;
  }

  .conten {
    width: 689px;
    margin: 0 auto;
  }

  .activity {
    width: 100%;
    height: 385px;
    border-radius: 8px;
    margin-top: 40px;
    box-shadow: 0px 20px 31px -20px rgba(0, 0, 0, 0.16), 0px 0px 20px -10px rgba(0, 0, 0, 0.04);
  }

  .activityImg {
    width: 100%;
    height: 240px;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .activity_card{
    border-radius: 10px;
  }
</style>