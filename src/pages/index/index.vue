<template>
    <div class="index">
        <div class="banner"></div>
        <div class="intro">
            「<span>优谷活动帮</span>」活动服务订购平台，专注为学校、图书馆、企事业单位等行业客户提供党建、文化活动整体解决方案，帮助客户推动文化建设、打造文化品牌，目前已服务客户超12000家。
        </div>
        <div class="back"></div>
        <div class="num">
            <div class="num_item">
                <p class="title">已服务客户<span class="font_s">（家）</span></p>
                <p>1.2<span class="font_b">万</span><span class="font_m">+</span></p>
            </div>
            <div class="num_item">
                <p class="title">已支持活动<span class="font_s">（场）</span></p>
                <p>3.3<span class="font_b">万</span><span class="font_m">+</span></p>
            </div>
            <div class="num_item">
                <p class="title">活动总访问量</p>
                <p>1.5<span class="font_b">亿</span><span class="font_m">+</span></p>
            </div>
        </div>
        <div class="business">
            <p class="title">完整活动服务闭环</p>
            <p class="detail">OMO线上与线下场景融合</p>
            <div class="flow_chart"></div>
            <div class="words">
                <span>ONLINE</span>
                <span>MERGE</span>
                <span>OFFLINE</span>
            </div>
            <div class="chart"></div>
        </div>
        <div class="active_banner banner_serve">
            <div class="banner_title">活动服务</div>
                <div class="Serve">
                    <div class="s_title">活动类型<span class="title_icon"></span></div>
                    <div>
                        <banner :banner_List="getServices" @NoMore="NoMore"></banner>
                    </div>
                </div>
        </div>
        <div class="Serve">
            <div class="s_title">标准服务<span class="title_icon"></span></div>
            <grid :List="dataList"></grid>
        </div>
        <div class="Serve icon serve_more">
            <div class="s_title">增值服务<span class="title_icon title_icon_yellow"></span></div>
            <grid :List="List"></grid>
        </div>
        <div class="active_banner">
            <div class="banner_title">活动案例</div>
            <div class="navbar">
                <van-tabs title-inactive-color="#999999" title-active-color="#333333"  @click="onClick">
                    <van-tab v-for="(item,index) in tabList" :title="item.typeName" :key="index" :name="item.typeId">
                    <div class="banner_tab"><loop :banner_List="banner_List" ></loop></div>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="active_banner flow_tip">
            <div class="banner_title">服务流程</div>
            <div class="wrap">
                <div class="rf_l"></div>
                <div class="rf_r">
                    <div class="serve_step">
                        <div class="step">
                            <span class="dont"></span><span class="nums">1</span><span class="lang">订购服务</span>
                        </div>
                        <p>按需求选择活动类型、功能服务，完成订购。</p>
                    </div>
                    <div class="serve_step">
                        <div class="step">
                            <span class="dont"></span><span class="nums">2</span><span class="lang">策划方案</span>
                        </div>
                        <p>活动策划经理和您联系，沟通确定活动方案。</p>
                    </div>
                    <div class="serve_step">
                        <div class="step">
                            <span class="dont"></span><span class="nums">3</span><span class="lang">上线活动</span>
                        </div>
                        <p>专业团队制作活动设计/素材，活动上线，参与者报名。</p>
                    </div>
                    <div class="serve_step">
                        <div class="step">
                            <span class="dont"></span><span class="nums">4</span><span class="lang">展示成果</span>
                        </div>
                        <p>实时获取活动报名和作品数据，展示活动成果</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="active_banner costom">
            <div class="banner_title">服务客户</div>
            <p class="intro">优谷朗读已为 <span class="ac_color">12000+</span> 客户提供活动</p>
            <div class="customerCase">
                <img src="../../assets/images/serve_logo.png"/>
            </div>
            <a class="look" @click="costom()">查看更多客户  > </a>
        </div>
        <div class="footer">
            <h2 class="name">广州优谷信息技术有限公司</h2>
            <p class="tel">400-8110807</p>
            <p>邮箱：support@iyougu.com</p>
            <p>地址：广州市天河区棠东东路3号123房</p>
            <p class="info">版权信息：</p>
            <p>Copyright 2020 iyougu.com All Rights Reserved</p>
            <p>备案号：</p>
            <p>粤ICP备16065445</p>
        </div>
        <div class="active_button" @click="Go_activity()">我想订购活动</div>
        <footers :type="1"></footers>
        <div class="nav_bar">
            <a href="http://kef.m.iyougu.com/s/33790wo28" class="service click_item">
                <img src="../../assets/images/index/kefu.png"/>
                <span>客服</span>
            </a>
            <div class="qrcode_dowmload click_item" @click="showqrCode">
                <img src="../../assets/images/index/pingtai.png" />
                <span>平台</span>
            </div>
        </div>
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
                <div class="qcode">
                    <img src="../../assets/images/Orga.jpg" />
                    <p>需使用微信扫码/识别查看活动</p>
                    <p>长按二维码保存到相册</p>
                    <div class="close_qc"  @click="show = false"><van-icon name="close" color="#fff" size="28"/></div>
                </div>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import Grid from '@/components/grid'
import Loop from '@/pages/index/loop'
import Footers from '@/components/footer'
import Banner from '@/components/banner'
export default {
    name: 'index',
    components:{Grid,Loop,Footers,Banner},
    data(){
        return {
            flag:true,
            active:0,
            page:1,
            total:0,
            size:10,
            pageNum:1,
            pageAll:0,
            CaseType:0,
            show:false,
            tabList:['品牌案例','政府单位','高等院校','企业单位','品牌案例','高等院校','企业单位'],
            dataList:[
                [{imgUrl:require('../../assets/images/index/icon1.png'),title:'活动策划',tip:'策划全程跟进确保上线'},{imgUrl:require('../../assets/images/index/icon4.png'),title:'资源库使用',tip:'海量素材等你挑选'}],
                [{imgUrl:require('../../assets/images/index/icon2.png'),title:'活动设计',tip:'活动视觉方案、全屏展示'},{imgUrl:require('../../assets/images/index/icon5.png'),title:'素材制作',tip:'定制活动主题的朗读素材'}],
                [{imgUrl:require('../../assets/images/index/icon3.png'),title:'活动功能',tip:'11种活动功能使用'},{imgUrl:require('../../assets/images/index/icon6.png'),title:'作品审核',tip:'专业审核团队把控'}]
            ],
            List:[
                [{imgUrl:require('../../assets/images/index/icon7.png'),title:'设计宣传',tip:'活动对外宣传推广设计'},{imgUrl:require('../../assets/images/index/icon10.png'),title:'奖品代发',tip:'奖品代买和代寄送'}],
                [{imgUrl:require('../../assets/images/index/icon8.png'),title:'推文代写',tip:'公众号/媒体推文撰写'},{imgUrl:require('../../assets/images/index/icon11.png'),title:'活动复盘',tip:'活动总结PPT制作'}],
                [{imgUrl:require('../../assets/images/index/icon9.png'),title:'奖项评选',tip:'评委对活动作品评分'},{imgUrl:require('../../assets/images/index/icon12.png'),title:'线下活动策划',tip:'线下活动保驾护航'}]
            ],
            banner_List:[
            ],
            getServices:[],
        }
    },
    mounted(){
        this.getActivityCases(this.CaseType)
        this.getCaseTypes()

    },
    methods:{
        getActivityCases(id){
            let params = {
            "data": {
                "pageNum": 1,
                "pageSize": 10,
                "typeId": id
            }
        }
        this.axios.post('/api/v1/activity/getActivityCases',params).then(res=>{
            this.banner_List = this.banner_List.concat(res.data.data.records)
            this.pageAll = res.data.data.total
          },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        Go_activity(){
            this.$router.push({name:'indent'})
        },
        getActivityServices(){
            if(this.page>1 && this.total <= (this.page-1)*this.size) {
                this.$toast('没有更多内容了');
                return
            }            
            let params = {
                "data": {
                    "pageNum": this.page,
                    "pageSize": 10
                }
            }
            this.axios.post('/api/v1/activity/getActivityServices',params).then(res=>{
                this.getServices = this.getServices.concat(res.data.data.records)
                this.total = res.data.data.total
                this.page = this.page + 1
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        getCaseTypes(){
            let params = {
                "data": {
                    
                },
            }
            this.axios.post('/api/v1/activity/getCaseTypes',params).then(res=>{
                this.tabList = res.data.data
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        onClick(name, title) {
            this.CaseType = name
            this.pageNum = 1
            this.pageAll = 0
            this.banner_List = []
            this.getActivityCases(name)
        },
        NoMore(){
            this.getActivityServices()
            // console.log("1111")
            //  alert("1111")
        },
        costom(){
            this.$router.push({path:'/CustomerCase'})
        },
        showqrCode(){
            this.show = true
        }
    }

}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.customerCase{
    width: 662px;
    margin: 0 auto;
    img{
        width: 100%;
    }
}

.nav_bar{
    width: 80px;
    height: 250px;
    background: #fff;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
    border-radius: 40px;
    box-sizing: border-box;
    padding: 0 8px;
    position: fixed;
    top: 40%;
    right: 20px;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .click_item{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
           width: 40px;
           height: 40px; 
        }
        span{
            font-size: 22px;
            line-height: 36px;
            color: #666;
            padding-top: 10px;
        }
    }
    .service{
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
}
.index{
    position: relative;
    .title_icon{
            display: inline-block;
            width: 20px;
            height: 2px;
            background: #4086F7;
            position: relative;
            top: -20px;
            left: 6px;
            &:before{
                content: '';
                display: inline-block;
                width: 10px;
                height: 2px;
                background: #4086F7;
                position: absolute;
                top: 10px;
        }
    }
    .title_icon_yellow{
        background: #FF9000;
        &:before{
        background: #FF9000;
        }
    }
    .banner{
        width: 750px;
        height: 480px;
        @include images('../../assets/images/index/banner')
    }
    .intro{
        margin-top: 38px;
        padding: 0 44px 0 46px;
        line-height: 44px;
        font-size: 28px;
        span{
            font-family: 'alibaba_M';
        }
    }
    .back{
        width: 750px;
        height: 188px;
        @include images('../../assets/images/index/solid');
        background-position-x: center;
        position: absolute;
        top: 570px;
    }
    .num{
        padding: 0 56px 0 46px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 38px;
        margin-bottom: 74px;
       .num_item{
           p{
               @include colorA();
               line-height:62px;
               font-family: 'alibaba_R';
               font-size: 62px;
           }
           .title{
               line-height: 26px;
               font-size: 20px;
               font-family: 'alibaba_M';
               margin-bottom: 2px;
           }
           .font_s{
               font-size: 14px;
           }
           .font_b{
               font-size: 30px;
               font-family: 'alibaba_R';
               margin: 0 6px 0 10px;
               position: relative;
               bottom: 6px;
           }
           .font_m{
               font-size: 33px;
               font-family: 'alibaba_R';
               position: relative;
               bottom: 6px;
           }
       }
    }
    .business{
        background-color: #FAFAFA;
        text-align: center;
        font-family: 'alibaba_B';
        padding-top: 80px;
        .title{
            width: 520px;
            height: 80px;           
            font-size: 36px;
            line-height: 80px;
            @include images('../../assets/images/index/title');
            margin: 0 auto;
        }
        .detail{
            font-size: 28px;
            @include colorA();
            line-height: 40px;
            padding: 48px 0;
        }
        .flow_chart{
            width: 702px;
            height: 220px;
            margin: 0 auto;
            @include images('../../assets/images/index/flow');
        }
        .words{
            font-family: 'alibaba_L';
            font-size: 28px;
            line-height: 40px;
            color: #ccc;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding:16px 88px 8px 82px;
        }
        .chart{
            width: 750px;
            height: 602px;
            @include images('../../assets/images/index/phone');
        }
    } 
    .Serve{
        padding: 0 56px 0 36px;
        background: #fff;
    }
    .serve_more{
        padding-bottom: 80px;
    }
    .icon{
        padding-top: 48px;
    }
    .s_title{
        font-size: 30px;
        font-family: "alibaba_M";
        line-height: 42px;
        
        
    }
    .active_banner{
        background:#FAFAFA ;
        padding: 80px 0 48px 0;
        .banner_title{
            @include images('../../assets/images/index/title_s');
            font-size: 36px;
            line-height: 80px;
            font-family: 'alibaba_B';
            text-align: center;
            width: 520px;
            height: 80px;
            margin:0 auto;
        }
        .navbar{
            margin-top: 20px;
        }
        .banner_tab{
            margin-top: 32px;
        }
    }
    .flow_tip{
        background:#fff;
        .banner_title{margin-bottom: 0;}
        .wrap{
            display: flex;
            flex-direction: row;
            padding-left:50px;
            .rf_l{
                background: #4086F7;
                width:2px;
                height: 678px;
                background-image: linear-gradient(#ffffff, #4086F7,#fff);
            }
            .rf_r{
                padding-left: 30px;
                margin-top: 54px;
                .serve_step{
                    margin-bottom: 40px;
                    .step{
                        @include images('../../assets/images/index/back');
                        width: 262px;
                        height: 62px;
                        line-height: 62px;
                        font-family: 'alibaba_B';
                        text-align: center;
                        span{
                            font-size: 34px;                           
                            color: #fff;
                            display: inline-block;
                        }
                        .nums{
                            font-size: 32px;
                            color: #4086F7;
                            width: 60px;
                            position:relative;
                            left:-42px;
                        }
                        .lang{
                            position:relative;
                            left:-16px;
                        }
                        .dont{
                            width: 14px;
                            height: 14px;
                            @include images('../../assets/images/index/dont');
                            position: relative;
                            left: -66px;
                            top: -8px;
                        }
                    }
                    p{
                        padding-left: 40px;
                        font-size: 24px;
                        color: #666;
                        line-height: 34px;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
    .costom{
        background:#fff;
        .intro{
            margin: 48px auto 32px auto;
            font-size: 28px;
            line-height: 40px;
            text-align: center;
            .ac_color{
                color: #4086F7;
                font-family: 'alibaba_M';
                font-size: 32px;
            }
        }
        .look{
            color: #4086F7;
            font-size: 24px;
            line-height: 34px;
            text-align: center;
            margin: 46px 0 80px 0;
            display: block;
        }
    }
    .footer{
        padding: 80px 0 50px 40px;
        background:#FAFAFA ;
        font-size: 28px;
        line-height: 40px;
        .name{
            font-family: 'alibaba_M';
            font-size: 32px;
            line-height: 44px;
        }
        .tel{
            color: #4086F7;
            font-size: 52px;
            line-height: 70px;
            margin:8px 0 10px 0;
        }
        .info{
            margin-top: 30px;
        }
    }
    .active_button{
        width: 668px;
        height: 98px;
        background: linear-gradient(270deg, #3154ED 0%, #3997F5 99%);
        box-shadow: 0px 22px 36px -16px rgba(17, 44, 175, 0.55);
        border-radius: 49px;
        margin: 8px auto 154px;
        font-size: 36px;
        font-family: 'alibaba_m';
        color: #FFFFFF;
        line-height: 98px;
        text-align: center;
    }
    .banner_wrap{
        height: 640px;
    }
    .banner_serve{
        background: #fff;
        .banner_title{
            margin-bottom: 48px;
        }
        .s_title{
            padding: 0 56px 0 36px;
            margin-bottom: 48px;
        }
        .Serve{
            padding: 0;
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
</style>
