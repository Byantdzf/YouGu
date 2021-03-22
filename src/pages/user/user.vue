<template>
    <div class="user">
        <headers :title="title"></headers>
        <div class="user_info">
            用户:<span class="user_name">{{UserInfo.mobile}}</span>
        </div>
        <div class="tab">
            <ul>
                <li :class="flag?'active':''" @click="tab('0')">
                    机构专区
                    <span></span>
                </li>
                <li :class="!flag?'active':''" @click="tab('1')">活动订单<span></span></li>
            </ul>
        </div>
        <div v-if="flag">
            <organ :bindOrgaList="bindOrgaList" :OrgaData="OrgaData" @Change="ChangeOrga"></organ>
        </div>
        <div v-if="!flag">
            <order></order>
        </div>
        <footers :type="2"></footers>
    </div>
</template>
<script>
import Headers from '@/components/header'
import Organ from '@/pages/user/organization'
import Footers from '@/components/footer'
import Order from '@/pages/order'
export default {
    components:{Headers,Organ,Footers,Order},
    data(){
        return {
            title:'个人中心',
            flag:true,
            UserInfo:{},
            bindOrgaList:[],
            OrgaData:{},
            orgaId:''
        }
    },
    methods:{
        tab(index){
            if(index==0){
                this.flag=true
                this.getOrgaLists()
            }else{
                this.flag=false
            }
        },
        getUserInfo(){
            let params = {
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/user/getUserInfo',params).then(res=>{
                if(res.data.code=="200000"){
                    this.UserInfo = res.data.data
                }
                
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
        },
        getOrgaLists(){
            return new Promise((resolve,reject)=>{
                let params = {
                    "sessionId": this.$cookies.get('sessionId'),
                }
                this.axios.post('/api/v1/user/getOrgaLists',params).then(res=>{
                    if(res.data.code=="200000"){
                        resolve(res)
                        this.bindOrgaList = res.data.data
                        if(res.data.data.length>0){
                            this.orgaId = res.data.data[0].orgaId
                        }                   
                    }                
                },error=>{
                    if(error.response.data.message=='缓存用户信息不存在'){
                        this.$cookies.remove("sessionId")
                        this.$router.push({path:'/login'})
                    }
                })
            })
        },
        getOrgaData(){           
            let params = {
            "data": {
                "orgaId": this.orgaId
                },
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/user/getOrgaData',params).then(res=>{
                
                if(res.data.code=="200000"){
                    this.OrgaData = res.data.data
                }
                console.log("aaaa")
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
            
        },
        ChangeOrga(data){
            this.orgaId = data.orgaId
            this.getOrgaData()
        }

    },
    mounted(){
        this.getUserInfo()
        this.getOrgaLists().then((res)=>{
            if(res.data.data.length>0){
                this.orgaId = res.data.data[0].orgaId
                this.getOrgaData()
            }          
        })       
    }
}
</script>
<style lang="scss" scoped>
.user{
    background: #F3F4F5;
    height: 100%;
    .user_info{
        padding:26px 0 26px 24px;
        font-size: 34px;
        line-height: 48px;
        border-bottom:1px solid #eee;
        background: #fff;
        .user_name{
            padding-left: 6px;
        }
    }
    .tab{
        background: #fff;
        ul{
            height: 106px;
            line-height: 106px;
            display: flex;
            flex-direction: row;
            li{
                width: 375px;
                text-align: center;
                color: #999;
                font-size: 34px;
            }
            .active{
                color:#4086F7;
                position: relative;
                span{
                    background:url('../../assets/images/user/active.png');
                    background-size: cover;
                    width:108px;
                    height: 12px;
                    position: absolute;
                    bottom: 8px;
                    left: 134px;
                }
            }
        }
    }
}
</style>