<template>
  <div class="recommendPage">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,index) in banner_List" :key="index">
          <div class="banner_wrap">
                <img v-lazy="item.images" @click="showPopup(item)"/>
                <div class="banner_title">
                    <p class="title_icon_slider">{{item.orgaName}}</p>
                    <p class="activityname">{{item.activityName}}</p>
                </div>
          </div>         
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
    <div>
      <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="qcode">
          <img :src="imgsrc" />
          <p>需使用微信扫码/识别查看活动</p>
          <p>长按二维码保存到相册</p>
          <div class="close_qc"  @click="show = false"><van-icon name="close" color="#fff" size="28"/></div>
        </div>
      </div>
    </van-overlay>
    </div>
  </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  props:{
      banner_List:Array,
      flag:Boolean
  },
  data() {
    let self = this
    return {
      imgsrc:'',
      show: false,
      swiperOption: {
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          initialSlide :2
        },
        observer:true,
        observeParents:true,
        initialSlide:0,
        on:{
            reachEnd:function(){
                self.$emit('EvenMore')
            }
        },
      }
    };
  },
  mounted() {
    
  },
  methods:{
    showPopup(index){
      this.imgsrc = index.qrcodeUrl
      this.show = true
    }
  }
};
</script>
<style lang="scss" scoped >
.recommendPage{
    .swiper-container{
        position: relative;
        width: 100%;
        height: 640px;
        .swiper-slide{
            width: 100%;
            .banner_wrap{
                padding: 0 30px;
                img{
                    width: 690px;
                    height: 372px;
                    border-radius: 26px;
                }
            }
            .banner_title{
                margin-top: 48px;
                font-size: 32px;
                line-height: 44px;
                font-family: 'alibaba_B';
                .activityname{
                  font-size: 28px;
                  line-height: 40px;
                  font-family: 'alibaba_M';
                  margin-top: 10px;
                }
            }
        }
    } 
    
} 
.wrapper{
  position: absolute;
  top: 25%;
  left: 10%;
  width: 80%;
  .qcode{
    text-align: center;
    img{
      width:320px;
      height: 320px;
      margin-bottom: 40px;
      border-radius: 16px;
    }
    p{
      font-size: 34px;
      line-height: 48px;
      color:#fff;
      text-align: center;
    }
    .close_qc{
      margin-top: 40px;
    }
  }
}
.title_icon_slider{
  &:before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 18px;
    background: #4086F7;
    margin-right: 12px;
    position: relative;
    top: -5px;
  }
  

}
</style>
