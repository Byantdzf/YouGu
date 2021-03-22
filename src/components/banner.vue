<template>
    <div class="viewpager">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in banner_List" :key="index" >
                <img :src="item.images" class="banner-image" @click="ShowPop(item)"/>
                <p @click="ShowPop(item)">{{item.orgaName}}</p>
            </swiper-slide>      
        </swiper>
        <div class="pop" v-if="flag">
            <div class="pop_detail">
                <div class="pop_info">
                    <p class="pop_title title_icon_slider">{{List.typeName}}</p>
                    <p class="pop_tip">{{List.details}}</p>
                </div>
                <img :src="List.qrcodeUrl"/>
            </div>
        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
    components: {
        swiper,
        swiperSlide
    },
    props:{
        banner_List:Array
    },
    data(){
        let self = this
        return {       
            List:{},
            flag:false,
            swiperOption: {
                loop: false,
                centeredSlides:true,
                slidesPerView: 3,
                spaceBetween: 8,
                centeredSlides: true,
                centeredSlidesBounds: true,
                observer:true,
                observeParents:true,
                initialSlide:1,
                preventClicksPropagation : true,
                on:{
                    slideChange: function(){
                        self.flag = false
                    },
                    reachEnd:function(){
                        self.$emit('NoMore')
                    }
                },
            }
        }
    },
    computed: { swiper() { return this.$refs.mySwiper.swiper; } },
    methods:{
        ShowPop(item){
            this.List = item
            this.flag = !this.flag
        },
        a(){
            this.$refs.mySwiper.swiper
        }
    }
}
</script>
<style lang="scss" scoped>
.viewpager{
    background: linear-gradient(180deg, #FFFFFF 0%, #EEEEEE 63%, #FFFFFF 100%);
}
.swiper-container{
	height: 300px;
	width: 100%;
}
.swiper-slide {
    width: 206px;
    height:288px;
    background-color: #ffffff;
    border-radius: 16px;
    text-align: center;
    transform: scale(0.85);
    .banner-image {
      border-radius: 16px;
      width: 196px;
      height: 216px;
    }
    p{
        padding: 8px 0 14px 0;
        text-align: center;
        font-size: 34px;
        line-height: 46px;
        font-family: 'alibaba_M';
    }
  }
  .swiper-slide-active{
      transform: scale(1);
  }
  .swiper-slide-prev {
    transform: scale(0.85);
  }
  .swiper-slide-next {
    transform: scale(0.85);
  }

  .swiper-container {
    --swiper-theme-color: #fff;
  }
  .swiper-pagination.swiper-pagination-bullets {
    width: auto;
    right: 60px;
    text-align: right;
  }
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #FFFFFF;
    border-radius: 4px;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    height: 6px;
    border-radius: 5px;
  }
  .pop{
      background:url('../assets/images/pop.png');
      background-size: cover;
      padding: 43px 49px;
      box-sizing: border-box;
      width: 730px;
      height: 226px;
      
      margin: 0 auto;
      .pop_detail{
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          img{
              width: 140px;
              height: 140px;
          }
          .pop_info{
                display:flex;
                flex-direction: column;
                width: 70%;   
                .pop_title{
                    font-size: 32px;
                    line-height: 44px;
                    font-family: 'alibaba_M';
                    margin-bottom: 16px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .pop_tip{
                    font-size: 24px;
                    line-height: 34px;
                    color: #666666;
                }
          }
      }
  }
.title_icon_slider{
  &:before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 14px;
    background: #4086F7;
    margin-right: 8px;
    position: relative;
    top: -5px;
  }
  

}
</style>