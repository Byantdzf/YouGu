<template>
    <div class="wrap">
        <div class="organization" v-if="bindOrgaList.length>0">
            <div class="cart">
                <div class="title">
                    <div class="name">{{orgaItem.orgaName}}
                        <span class="icon"  v-if="orgaItem.isAuth==1"></span>
                        <!-- <span class="icon1">审核中</span> -->
                        <span class="icon2" v-if="orgaItem.isAuth==0" @click="bindOrga(orgaItem.orgaId)">去认证<span><van-icon name="arrow" size="14" color="#4086F7"/></span></span>
                    </div>
                    <div class="tab_cart" @click="showPopup"><span></span>切换机构</div>
                        <van-overlay :show="show" @click="show = false">
                            <div class="wrapper" @click.stop>
                                <div class="choose_type">
                                    <ul>
                                        <li v-for="(item,index) in bindOrgaList" :key="index" @click="tab_orga(item)">{{item.orgaName}}</li>
                                        <li class="go_bind activity_bind" @click="go_bind"><span></span>去绑定</li>
                                    </ul>
                                </div>
                            </div>
                        </van-overlay>           
                </div>
                <div class="detail">
                    <img src="../../assets/images/Orga.jpg"/>
                    <div class="time">
                        <div class="">平台授权<span class="highlight">{{arr[OrgaData.authStatus]}}</span></div>
                        <div class="date">到期时间<span>{{OrgaData.endTime}}</span></div>
                    </div>
                </div>
            </div>
            <div class="activity_more">
                <div class="title">
                    <div class="name"><span></span>举办活动</div>
                    <div class="icon" @click="go_myActivity"> <van-icon name="arrow" size="20" color="#999"/> </div>
                </div>
                <div class="num">
                    <ul v-if="orgaItem.isAuth==1">
                        <li>
                            <p class="num_l">{{OrgaData.activityNum}}</p>
                            <p>举办活动数</p>
                        </li>
                        <li>
                            <p class="num_l">{{OrgaData.signNum}}</p>
                            <p>报名人数</p>
                        </li>
                        <li>
                            <p class="num_l">{{OrgaData.opusNum}}</p>
                            <p>活动作品数</p>
                        </li>
                        <li>
                            <p class="num_l">{{OrgaData.voteNum}}</p>
                            <p>活动投票数</p>
                        </li>
                        <li>
                            <p class="num_l">{{OrgaData.likeNum}}</p>
                            <p>作品点赞数</p>
                        </li>
                        <li>
                            <p class="num_l">{{OrgaData.shareNum}}</p>
                            <p>作品分享数</p>
                        </li>
                    </ul>
                    <div class="no_data_show" v-if="orgaItem.isAuth==0">机构数据需认证后获取展示</div>
                </div>
            </div>
        </div>
        <div class="organization no_data" v-else>
            <div class="cart">
                <div class="title">
                    <div class="name">暂无绑定机构</div>
                    <div class="go_bind" @click="go_bind"><span></span>去绑定</div>
                </div>
                <div class="no_data_detail">绑定机构并认证后可展示机构活动数据</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        bindOrgaList:Array,
        OrgaData:Object
    },
    data(){
        return {
            flag:false,
            orgaItem:{},
            showPopover: false,
            show: false,
            arr:['未开通','授权中','已到期']
        }
    },
    methods:{
        GetOrgaItem(index){
            this.orgaItem = this.bindOrgaList[index]
        },
        showPopup() {
            this.show = true;
        },
        tab_orga(item){
            this.orgaItem = item;
            this.$emit('Change',item)
            this.show = false
        },
        bindOrga(id){
            this.$router.push({path:'/identityAuthentication',query:{id:id}})
        },
        go_bind(){
            this.$router.push({path:'/InstitutionalBinding'})
        },
        go_myActivity(){
            this.$router.push({path:'/activity'})
        }

    },
    mounted(){
        
    },
    watch:{
        bindOrgaList(NewVal,ordVal){
            this.GetOrgaItem(0)
        }
    }
    
}
</script>
<style lang="scss" scoped>
.wrap{
    padding: 20px;
    background: #F3F4F5;
    margin-bottom: 100px;
    .organization{
        background: #fff;
        border-radius:32px ;
        padding: 0 20px 86px 20px;
        min-height:300px;
        .cart{
            .title{
                height: 156px;
                line-height: 156px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .name{
                    font-size: 34px;
                    padding-left: 6px;
                    span{
                        display: inline-block;
                    }
                    .icon{
                        background: url(../../assets/images/user/icon.png);
                        background-size: cover;
                        width: 86px;
                        height: 34px;
                        margin-left: 12px;
                        
                        position: relative;
                        top: 4px;
                    }
                    .icon1{
                        width: 86px;
                        height: 34px;
                        line-height: 36px;
                        text-align: center;
                        background: #ccc;
                        color: #fff;
                        font-size: 20px;
                        border-radius: 16px;
                    }
                    .icon2{
                        color: #4086F7;
                        font-size: 24px;
                        position: relative;
                        top: -2px;
                        margin-left: 20px;
                        span{
                            position: relative;
                            top: 6px;
                        }
                    }
                }
                .tab_cart{
                    font-size: 28px;
                    span{
                        width: 32px;
                        height: 28px;
                        display: inline-block;
                        background:url(../../assets/images/user/tab.png);
                        background-size: cover;
                        margin-right: 12px;
                        position: relative;
                        top: 4px;
                    }
                }
            }
            .detail{
                background: #F9F9F9;
                height: 164px;
                width: 670px;
                display: flex;
                flex-direction: row;
                align-items: center;
                border-radius: 8px;
                img{
                    width: 120px;
                    // height: 70px;
                    margin: 0 50px 0 20px;
                }
                .time{
                    font-size: 28px;
                    line-height: 50px;
                    div{
                        
                    }
                    .date{
                        
                    }
                    span{
                        margin-left: 32px;
                    }
                    .highlight{
                        color: #4086F7;
                    }
                }
            }
        }
        .activity_more{
            .title{
                padding: 50px 0 30px;
                font-size: 36px;
                line-height: 50px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .name{
                    span{
                        background: #4086F7;
                        width: 6px;
                        height: 24px;
                        display: inline-block;
                        margin-right: 16px;
                        margin-left: 6px;
                        position: relative;
                        top: -2px;
                    }
                }
                .icon{
                    position: relative;
                    top: 6px;
                }
            }
            .num{
                ul{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    text-align: center;
                    li{
                        width: 222px;
                        padding: 35px 0;
                        .num_l{
                            font-size: 48px;
                            line-height: 50px;
                            color: #4086F7;
                            margin-bottom: 6px;
                        }
                        p{
                            font-size: 24px;
                            line-height: 34px;
                        }
                    }
                }
                .no_data_show{
                    color: #999;
                    font-size: 24px;
                    line-height: 34px;
                    text-align: center;
                    padding-top: 116px;
                }
            }
        }
    }
    .no_data{
        .cart{
            .title{
                height: 56px;
                line-height: 56px;
                padding-top:48px;
            }
            
        }
        .no_data_detail{
            font-size: 28px;
            line-height: 40px;
            padding-left: 6px;
        }
    }
}
.go_bind{
    font-size: 28px;
    span{
        width: 34px;
        height: 32px;
        display: inline-block;
        background:url(../../assets/images/user/bind.png);
        background-size: cover;
        position: relative;
        top: 6px;
        left: -8px;
    }
}
.wrapper{
    min-width: 50%;
    max-width: 60%;
    background:#ffffff;
    border-radius: 20px;
    min-height: 30%;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -25%;
    overflow-y: scroll;
}
.choose_type{
    
    ul{
        padding: 0 20px;
    }
    li{
        line-height: 80px;
        font-size:28px;
        border-bottom: 1px solid #eee;
        overflow:hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }
}
.activity_bind{
    color:#4086F7 ;
}
</style>