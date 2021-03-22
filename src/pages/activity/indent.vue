<template>
    <div class="container_write">
        <div v-show="!map">
        <headers :title="title"></headers>
        <div class="wrap">
           <step :type="1"></step>
        <div class="bind"  v-if="orgaList.length>0">
            <div>
                <div class="title">当前绑定机构</div>
                <div class="about">{{orgaList[0].orgaName}}</div>
            </div>
        </div>
        <div v-if="orgaList.length<=0">
            <serve @ORGA="Orga" :getValue="getValue" @clickMap="clickMap" :orgaAddr="orgaAddr" @OrgaContent="OrgaContent"></serve>
        </div>
        <div class="activity">
            <div class="title">
                <div class="buy">活动订购，请选择活动类型</div>
                <div class="serve" @click="showPopup">活动包含服务<span><van-icon name="orders-o" color="#4086F7" size="16"/></span></div>
                <van-popup v-model="show" round :style="{ width: '90%'}" closeable close-icon="close">
                    <div class="content_detail">
                        <div class="content_title">活动包含服务</div>
                        <ul class="list_content">
                            <li>活动策划</li>
                            <li>活动banner图1张、全屏图1张</li>
                            <li>服务器负载均衡</li>
                            <li>作品云存储、数据同步</li>
                            <li>活动时间设置</li>
                            <li>分组别报名</li>
                            <li>作品投票</li>
                            <li>转发作品增加投票次数</li>
                            <li>推荐朗读素材功能</li>
                            <li>作品生成留声卡功能</li>
                            <li>限制参赛地区功能</li>
                            <li>参赛码验证参赛人员</li>
                            <li>生成活动宣传海报功能</li>
                            <li>海量资源库使用</li>
                            <li>制作符合活动主题的朗读素材</li>
                            <li>活动作品审核</li>
                            <li>提供活动数据及作品下载</li>
                        </ul>
                    </div>
                </van-popup>
            </div>
            <div>
                <booking :book="book" @GetActivePrice="TypePrice(arguments)"></booking>
            </div>
            <div class="order">
                <div class="title">增值服务订购，请选择具体服务项</div>
                <div>
                    <sliders :servece="service" @servecePrice="servecePrice(arguments)" ></sliders>
                </div>
            </div>
        </div>
        </div>
        <div class="consent">
            <van-radio-group v-model="radio" icon-size="16">
                <van-radio name="1">
                    <span class="agress">我已同意</span>
                    <span @click="Go_protocol" class="protocol">《活动服务协议》</span>
                </van-radio>
            </van-radio-group>
            <div class="contact"><a href="http://kef.m.iyougu.com/s/33790wo28"> 对价格有疑问<span class="question"><van-icon name="question-o" color="#4086F7" size="16"/></span></a></div>
        </div>
        <div class="order_form">
            <order @order="cr_order" :AllPrice="AllPrice" :disable="disable"></order>
        </div>
        </div>
        <maps v-if="map" @MapAddress="MapAddress" @back_map="back_map"></maps>
    </div>
</template>
<script>
import Headers from '@/components/header'
import Booking from '@/components/booking'
import Sliders from '@/components/sliders'
import Order from '@/components/order'
import Serve from '@/components/serve'
import Step from '@/pages/activity/step'
import Maps from '@/pages/map.vue'
export default {
    components:{Headers,Booking,Sliders,Order,Serve,Step,Maps},
    computed:{
        AllPrice(){
            return this.activityPrice + this.sPrice
        }
    },
    data(){
        return{
            title:'选择活动服务',
            radio:'',
            OrgaStatus:false,
            show: false,
            book:[],
            service:[],
            orgaList:[],
            orgaUp:{},
            serviceIds:[],
            getValue:false,
            activityTypeId:0,
            activityPrice:0.00,
            sPrice:0.00,
            bindOrgaId:0,
            disable:false,
            map:false,
            orgaAddr:''
        }
    },
    methods:{
        showPopup() {
            this.show = true;
        },
        getActivityTypes(){
            let params = {
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/packages/getActivityTypes',params).then(res=>{
                this.book = res.data.data
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        getServices(){
            let params = {
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/packages/getServices',params).then(res=>{
                this.service = res.data.data
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        getOrgaLists(){
            let params = {
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/user/getOrgaLists',params).then(res=>{
                this.orgaList = res.data.data
                if(res.data.data.length>0){
                    this.bindOrgaId = res.data.data[0].orgaId
                }
                
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        Orga(data){
            this.orgaUp = data
            if(this.orgaUp.bindOrgaId != null){
                this.bindOrgaId = this.orgaUp.bindOrgaId
            }
            this.createOrder()
        },
        CheckForm(){
            if(this.orgaList.length>0){
                if(this.orgaUp != null && this.radio != ''){
                    this.disable = true
                }else{
                    this.disable = false
                }
            }else{
                if(this.OrgaStatus && this.orgaUp != null && this.radio != ''){
                    this.disable = true
                }else{
                    this.disable = false
                }
            }
        },
        OrgaContent(type){
            this.OrgaStatus = type
            this.CheckForm()
        },
        cr_order(){
            this.getValue = true
            if(!this.disable){
                this.getValue = false
                return
            }
            this.createOrder()        
            
        },
        TypePrice(arg){
            this.activityPrice = arg[0]
            this.activityTypeId = arg[1]
            this.CheckForm()
        },
        servecePrice(arg){
            this.sPrice = arg[0]
            this.serviceIds = arg[1]
        },
        createOrder(){
            let params = {
                  "data": {
                    "activityTypeId": this.activityTypeId,
                    // "bindOrgaId": this.bindOrgaId,
                    "serviceIds": this.serviceIds,
                    "orgaAddr":this.orgaUp.orgaAddr,
                    "orgaName":this.orgaUp.orgaName,
                    "orgaType":this.orgaUp.orgaType
                    },
                "sessionId": this.$cookies.get('sessionId'),
            }
            if(this.bindOrgaId != 0){
                params.data.bindOrgaId = this.bindOrgaId
            }
            this.axios.post('/api/v1/order/createOrder',params).then(res=>{
                if(res.data.code=="200000"){
                    this.$router.push({
                        path:`/pay/${res.data.data.orderNo}`
                    })
                }
                
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
            
        },
        MapAddress(addr){
            this.map = false
            this.orgaAddr = addr.cityname + addr.poiaddress + addr.poiname
        },
        clickMap(type){
            this.map = true
        },
        back_map(type){
            this.map = false
        },
        Go_protocol(){
            this.$router.push({path:'/protocol'})
        }
    },
    mounted(){
        this.getOrgaLists()
        this.getActivityTypes()
        this.getServices()
    },
    watch:{
        radio(newVal,ordVal){
            this.CheckForm()
        }
    }
}
</script>
<style lang="scss" scoped>
.container_write{
    background: #fff;
}
.wrap{
    padding: 0 40px;
}
.bind{
    .title{
        font-size: 28px;
        line-height: 40px;
        color: #999;
    }
    .about{
        font-size: 34px;
        line-height: 48px;
        margin-top: 8px;
    }
}
.activity{
    .title{
        line-height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 48px 0 32px 0;
        .buy{
            font-size: 28px;            
            color: #999;
        }
        .serve{
            font-size: 24px;
            color: #666;
            span{
                position: relative;
                top: 8px;
                margin-left: 5px;
            }
        }
    }
    .content_detail{
        padding: 0 30px 60px 30px;
        .content_title{
            font-size: 40px;
            line-height: 56px;
            font-family: 'alibaba_B';
            margin:48px 0 64px 0;
            text-align: center;
        }
        .list_content{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-size: 24px;
            line-height: 34px;
            li{
                padding: 0 50px 0 0;
                margin-bottom: 32px;
                &:before{
                    content:'';
                    display:inline-block;
                    width: 14px;
                    height: 14px;
                    border: 2px solid #4086F7;
                    transform: rotate(45deg);
                    margin-right: 10px;
                }
            }
            
        }
    }
}
.order{
    padding-bottom: 82px;
    margin-bottom: 232px;
    .title{
        margin:48px 0 32px 0 ;
        color: #999;
        font-size: 28px;
        line-height: 40px;
    }
}
.consent{
    padding:0 24px;
    width: 702px;
    height: 60px;
    background: #FAFAFA;
    line-height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 28px;
    position: fixed;
    bottom: 172px;
    align-items: center;
    
    .question{
        position: relative;
        top: 4px;
        margin-left: 6px;
        color: #666;
    }
    .agress{
        color: #999;
        margin: 0 6px;
    }
    .protocol{
        color: #4086F7;
    }
    
}
.order_form{
    background: #fff;
    height:172px;
    width: 750px;
    position: fixed;
    bottom: 0;
}
.contact{
    a{
        color: #666666;
    }
}
</style>