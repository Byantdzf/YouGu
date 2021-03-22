<template>
  <div class="white_background">
    <headers :title="title"></headers>
    <div class="contan white_background_content">
      <div class="SubmitImg">
        <p><span>*</span>付款凭证</p>
        <!-- <van-uploader :after-read="afterRead" class="photograph" /> -->
        <!-- <div style="display: flex; flex-direction: row;"> -->
        <van-uploader v-model="fileList" :multiple="false" :after-read="afterRead" :max-count="3" :deletable="false"/>
        <!-- </div> -->

      </div>
      <div class="submitInformation">
        <p><span>*</span>付款银行户名</p>
        <input type="text" placeholder="请输入付款银行户名" @input="bank($event)" />
      </div>
      <div class="submitInformation">
        <p><span>*</span>付款银行账号</p>
        <input v-model="backUser" type="text" placeholder="请输入付款银行账号" @input="user($event)" />
      </div>
      <div class="submitInformation">
        <p><span>*</span>联系手机</p>
        <input v-model="phone" type="text" placeholder="请输入联系手机" @input="myPhone($event)" />
      </div>
      <div class="submitInformation">
        <p>付款日期</p>
        <input type="text" readonly="readonly" placeholder="请选择付款日期" @click="show = true" :value="date">
        <img src="../assets/images/date.png" @click="show = true" :value="date" />
        <!-- <van-cell title="选择单个日期" :value="date" @click="show = true" /> -->
        <van-calendar v-model="show" @confirm="onConfirm" :min-date="minDate" />
      </div>
      <div class="submitInformation">
        <p>备注</p>
        <input v-model="note" type="text" placeholder="请输入备注信息">
      </div>
      <button :disabled="!disable" :class="disable?'submit':'submitFalse'" @click="submitVoucher()">确认提交</button>
    </div>
  </div>
</template>
<script>
import Headers from '@/components/header'
  export default {
    name: 'SubmitInformation',
    components:{Headers},
    data() {
      return {
        date: '',
        title:'提交汇款信息',
        show: false,
        minDate: new Date(2021, 0, 1),
        fileList: [
         
        ],
        voucherImgs:[],
        disable: false,
        bankName: '',
        backUser: '',
        phone: '',
        note: '',
      }
    },
    computed: {
    },

    mounted() {

    },
    methods: {
      bank(event) {
        this.bankName = event.currentTarget.value;
        this._datelength()
      },
      user(event) {
        this.backUser = event.currentTarget.value;
        this._datelength()
      },
      myPhone(event) {
        this.phone = event.currentTarget.value;
        this._datelength()
      },
      _datelength() {
        // console.log(this.fileList.length)
        if (this.bankName.length <= 50 && this.backUser.length <= 50 && this.phone.length >= 11 && this.fileList.length != 0) {
          this.disable = true
        } else {
          this.disable = false
        }
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        this._datelength()
        let form = new window.FormData();
        form.append('file', file.file);
        this.axios.post(`/api/v1/order/uploadImgUrl?sessionId=${this.$cookies.get('sessionId')}`,form).then(res=>{
            if(res.data.code=="200000"){
                this.voucherImgs = this.voucherImgs.concat(res.data.data)
            }
            
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })

      },
      submitVoucher(){
        let params = {
          "data": {
            "account": this.bankName,
            "accountName": this.backUser,
            "orderNo": this.$route.query.id,
            "payTime": this.date,
            "phoneNumber": this.phone,
            "remark": this.note,
            "voucherImgs": this.voucherImgs
          },
          "sessionId": this.$cookies.get('sessionId')
        }
         this.axios.post('/api/v1/order/submitVoucher',params).then(res=>{
            if(res.data.code=="200000"){
                this.$router.push({path:'/SubmitSuccess'})
            }
            
        },error=>{
          if(error.response.data.message=='缓存用户信息不存在'){
              this.$cookies.remove("sessionId")
              this.$router.push({path:'/login'})
          }
      })

      },
      formatDate(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },
      onConfirm(date) {
        this.show = false;
        this.date = this.formatDate(date);
      },
      
    },
  }
</script>
<style lang="scss" >
.white_background{
  height: 100%;
  background: #fff;
  padding-bottom: 20px;
}
  /* .van-uploader__wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  } */
  .contan {
    width: 92%;
    margin: 0 auto;
    margin-top: 6px;
  }
  .white_background_content{
    width: 92%;
    margin: 0 auto;
    margin-top: 6px;
  }
  .SubmitImg{
    margin-top: 16px;
  }
  .SubmitImg p {
    font-size: 28px;
  }

  .SubmitImg span {
    color: #FE4600;
  }

  .submitInformation img {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 30px;
    bottom: 18px;
  }

  /* .photograph {
     width: 120px;
     height: 120px;
     margin-top: 20px;
   } */

  /* .van-uploader__upload,
  .van-uploader__wrapper {
    width: 100%;
    height: 100%;
  } */

  /* .van-uploader__upload-icon {
    font-size: 50px;
  } */

  .submitInformation {
    margin-top: 40px;
    position: relative;
  }

  .submitInformation p {
    font-size: 28px;
    margin-bottom: 16px;
    line-height: 40px;
  }

  .submitInformation span {
    color: #FE4600;
  }

  .submitInformation input {
    border: none;
    border-bottom: 1px solid #DDDDDD;
    width: 100%;
    font-size: 34px;
    height: 60px;

  }

  .submitFalse {
    margin-top: 90px;
    width: 670px;
    height: 92px;
    background: #C5DAFC;
    border-radius: 16px;
    color: #fff;
    border: none;
    font-size: 34px;
  }

  .submit {
    margin-top: 90px;
    width: 670px;
    height: 92px;
    background: #4086F7;
    border-radius: 16px;
    color: #fff;
    border: none;
    font-size: 34px;
  }

  .van-calendar__month-title {
    font-size: 34px;
  }

  .van-calendar__day {
    font-size: 30px;
    height: 80px;
  }

  .van-calendar__confirm {
    height: 80px;
  }

  .van-calendar__weekday {
    font-size: 30px;
  }

  .van-calendar__header-title {
    font-size: 30px;
  }

  .van-calendar__header-subtitle {
    font-size: 30px;
  }

  .submitInformation .van-button__text {
    color: #fff;
  }

  .van-popup__close-icon {
    font-size: 30px;
  }

  .van-button--normal {
    font-size: 30px;
  }

  .van-calendar__header-subtitle {
    padding: 4px 0 4px 0;
  }
</style>