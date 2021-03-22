<template>
    <div class="pay">
        <headers :title="title"></headers>
        <div class="step_list"><step :type="2"></step></div>        
        <div class="pay_content">
            <div class="choose_type box_content">
                <div class="type_detail ">
                    <div class="type_title">当前选择活动类型</div>
                    <div class="pay_status">待支付</div>
                </div>
                <div class="type_detail">{{orderList.activityTpye}}</div>
            </div>
            <div class="bind_type box_content">
                <div class="type_title">当前绑定机构</div>
                <div class="type_detail">{{orderList.orgaName}}</div>
            </div>
            <div class="copy_content box_content">
                <div class="type_title">订单编号</div>
                <div class="type_detail" ref="copy">
                    <div>{{orderList.orderNo}}</div>
                    <div class="paste" v-clipboard:copy="data" v-clipboard:success="copyCode" v-clipboard:error="copyCodeError">复制
                    </div>
                </div>
            </div>
        </div>
        <div class="about_serve">
            <div class="service_about">
            <div class="ac_serve" > 
                <h2 class="ac_title title_icon_slider serve_content">包含服务</h2>
                <div v-for="(item,index) in orderList.services" :key="index">
                    <h4 class="ac_title_s">{{item.typeName}}</h4>
                    <div class="content_detail">
                        <ul class="list_content">
                            <li v-for="(list,i) in item.childs" :key="i">{{list.serviceName}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="all_price">
                <p class="title_icon_slider allPrice">总费用<span>（元）</span></p>
                <div class="price"><span>¥</span>{{orderList.amount}}</div>
            </div>
            <div class="pay_way">
                <div class="ac_title title_icon_slider">选择支付方式</div>
                <ul>
                    <li>
                        <div>
                            <img src="../../assets/images/duigong.png">
                            对公转账
                        </div>
                        <div class="choosed"></div>
                    </li>
                    <li>
                        <div>
                            <img src="../../assets/images/weixin.png">
                            微信支付
                        </div>
                        <div class="disable">后续开放</div>
                    </li>
                    <li class="no_slide">
                        <div>
                            <img src="../../assets/images/zhifubao.png">
                            支付宝
                        </div>
                        <div class="disable">后续开放</div>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        <footers :title="title" :step="1" @go_pay="go_pay"></footers>
    </div>
</template>
<script>
import Headers from '@/components/header'
import Footers from '@/pages/activity/bottom'
import Step from '@/pages/activity/step'
export default {
    name:'pay',
    components:{Headers,Footers,Step},
    data(){
        return {
            title:'支付订单',
            data:'',
            orderList:{}
        }
    },
    mounted(){
        this.queryOrder()
    },
    methods:{
        queryOrder(){
            let params = {
                "data": {
                    "orderNo": this.$route.params.id
                },
                "sessionId": this.$cookies.get('sessionId'),
            }
            this.axios.post('/api/v1/order/queryOrder',params).then(res=>{
                if(res.data.code=="200000"){
                    this.orderList = res.data.data
                    this.data = res.data.data.orderNo
                }
                
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
            
        },
        go_pay(){
            this.$router.push({
                path:`/detail/${this.$route.params.id}`
            })
            
        },
        copyCode(){
            this.$toast('复制成功')
        },
        copyCodeError(){
            this.$toast('复制失败')
        }
    }
}
</script>
<style lang="scss" scoped>
.pay{
    background: #fff;
}
.pay_content{
    background: #fff;
    margin-bottom: 40px;
    .box_content{
        margin-top: 36px;
        padding: 0 40px;
    }
    .choose_type{
        .type_detail{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .pay_status{
            font-size: 28px;
            color: #666;
        }
    }
    .type_detail{
        font-size: 34px;
        line-height: 48px;
        font-family: 'alibaba_M';
    }
    .type_title{
        font-size: 28px;
        line-height: 40px;
        color: #999999;
    }
    .pay_status{}
    .copy_content {
        .type_detail{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            line-height: 56px;
        }
        
    }
    .paste{
        width: 152px;
        height: 56px;
        line-height: 56px;
        text-align:center;
        color:#4086F7 ;
        border: 1px solid #4086F7;
        border-radius: 12px;
        font-size: 24px;
        font-family: 'alibaba_R';
        // &:before{
        //     content:' ';
        //     border:2px solid #4086F7;
        //     width: 14px;
        //     height:14px;
        //     display: inline-block;
        //     margin-right: 5px;
        // }
    }

}
.about_serve{
    padding: 14px 20px 0 20px;
    background: #ffffff;
    margin-bottom:210px;
    .ac_serve{
        padding: 0 30px;
        .ac_title{
            font-size: 36px;
            line-height: 50px;
            font-family: 'alibaba_M';
        }
        .ac_title_s{
            margin: 32px 0 24px 0;
            font-size: 28px;
            line-height: 40px;

        }
    }
    .content_detail{
        
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
    .all_price{
        padding:0 40px;
        height: 222px;
        line-height: 222px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-top: 1px dashed #ccc;
        border-bottom: 1px dashed #ccc;
        .allPrice{
            font-family: "alibaba_M";
        }
        p{
            font-size: 36px;
            span{
                font-size: 28px;
            }
            
        }
        .price{
            font-size: 64px;
            color: #FE4600;
            span{
                font-size: 36px;
                padding-right: 6px;
            }
        }
    }
    .pay_way{
        .ac_title{
            font-size: 36px;
            line-height: 50px;
            margin: 62px 0 30px;
            padding:0 30px;
            font-family: "alibaba_M";
        }
        ul{
            padding-bottom: 30px;
            li{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding:0 30px;
                height: 112px;
                line-height: 112px;
                font-size: 36px;
                border-bottom: 1px solid #DDDDDD;
                img{
                    width: 48px;
                    height: 50px;
                    vertical-align: middle;
                    margin-right: 34px;
                }
                .disable{
                    color: #ccc;
                }
                .choosed{
                    width: 36px;
                    height: 36px;
                    border: 1px solid #4086F7;
                    border-radius: 50%;                   
                    float:left;
                    &:before{
                        content:' ';
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background: #4086F7;
                        float:left;
                        margin-left: 4px;
                        margin-top: 4px;
                    }
                }
            }
            .no_slide{
                    border-bottom: none;
                }
        }
    }
}
.step_list{
    padding:0 48px;
}
.title_icon_slider{
  &:before{
    content: '';
    display: inline-block;
    width: 4px;
    height: 20px;
    background: #4086F7;
    margin-right: 10px;
    position: relative;
    top: -4px;
  }
}
.service_about{
    box-shadow: 0 -2px 4px #eee, -10px 20px 20px #eee, 10px 10px 10px #eee;
    border-radius: 6px;
    .serve_content{
        padding-top: 30px;
    }
}
</style>