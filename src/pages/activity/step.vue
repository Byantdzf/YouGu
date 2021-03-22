<template>
    <div>
        <div class="step">
            <div class="step1">
                <div v-if="type==1" class="icon icon_active"><span></span></div>
                <div v-if="type!=1" class="success">
                    <span></span>
                </div>
            </div>
            <div class="solid" :class="type!=1?'solid_active':''"></div>
            <div class="step1 step2">
                <div v-if="type==1" class="icon"></div>
                <div v-if="type==2 || type==3" class="icon icon_active"><span></span></div>
                <div v-if="type==4" class="error">
                    <img src="../../assets/images/error.png"/>
                </div>
                <div v-if="type==5" class="success">
                    <span></span>
                </div>
            </div>
            <!-- <div class="step1 step2">
                <div class="success">
                    <span><van-icon name="success" color="#fff" size="14"/></span>
                </div>
            </div> -->
            <!-- <div class="step1 step2">
                
            </div> -->
            <div class="solid" :class="type==4?'error_solid':''|| type==3?'verify':'' || type==5?'solid_active':''">

                    <span v-if="type==3" class="s_l"></span>
                    <span v-if="type==3" class="s_t"></span>
                    <span v-if="type==3" class="s_r"></span>

                
            </div>
            <div class="step1">
                <div v-if="type!=5" class="icon"></div>
                <div v-if="type==5" class="icon icon_active"><span></span></div>
            </div>
        </div>
        <div class="step_words">
            <div>选择服务</div>
            <div>支付订单</div>
            <div>服务跟进</div>
        </div>
        <div class="no_pass" v-if="type==4">
            <div class="error"></div>
            <div class="error_detail">
                <div class="error_title">
                    <div>核实不通过原因</div>
                    <div class="error_word">核实不通过</div>
                </div>
                <div class="error_r">{{remark}}</div>
                <div class="godetail" @click="record">重新提交凭证 > </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        type:Number, // type = 1 选择服务 2 订单支付 3 核实中 4 失败 5 跟进服务,
        remark:String
    },
    methods:{
        record(){
            this.$emit('records')
        }
    }
}
</script>
<style lang="scss" scoped>
.step{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 48px;
    .step1{
        .icon{
            width: 16px;
            height:16px;
            background: #4086F7;
            border-radius: 50%;
            margin: 0 4px;
        }
        .icon_active{
            background: url('../../assets/images/ing.png') no-repeat;
            background-size: cover;
            width: 50px;
            height: 48px;
            border-radius: 0;
            // span{
            //     display: inline-block;
            //     border: 4px solid #fff;
            //     width: 16px;
            //     height: 16px;
            //     background:#4086F7;
            //     border-radius: 50%;
            //     float: left;
            //     margin-top: 9px;
            //     margin-left: 9px;
            // }
        }
        .success{
            background: url('../../assets/images/wancheng.png') no-repeat;
            background-size: cover;
            width: 50px;
            height: 48px;
            border-radius: 0;
            
        }
        .error{
            width: 50px;
            height: 48px;
            img{
                width:100%;
            }
        }
        
    }
    .solid{
        width: 242px;
        height: 4px;
        background: #EEEEEE;
    }
    .error_solid{
        background: #FE4600;
    }
    .solid_active{
        background: #4086F7;
    }
    .verify{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .s_l{
            width: 87px;
            height: 4px;
            display: inline-block;
            background: #4086F7;
        }
        .s_r{
            width: 87px;
            height: 4px;
            display: inline-block;
            background: #EEEEEE;
        }
        .s_t{
            background: url('../../assets/images/heshi.png');
            background-size: cover;
            width: 67px;
            height: 67px;
            display: inline-block;
        }
    }
}
.step_words{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 48px;
    font-size: 24px;
    line-height: 34px;
    padding: 0 8px;
}
.no_pass{
    position: relative;
    min-height: 330px;
    .error{
        background: url('../../assets/images/nopass.png');
        background-size: cover;
        width: 710px;
        height: 20px;
        position: absolute;
        left: -20px;
    }     
    .error_detail{
        background: #fff;
        width: 610px;
        height: 324px;
        padding:0 30px;
        border-bottom-left-radius: 32px;
        border-bottom-right-radius: 32px;
        position: absolute;
        top: 10px;
        left:0px ;
        z-index: 2;
        box-shadow: 12px 12px 12px #eee;
        .error_title{
            font-size: 34px;
            line-height: 48px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 20px 0 8px 0;
            .error_word{
                color: #FE4600;
            }
        }
        .error_r{
            background: #F9F9F9;
            padding: 20px 20px 14px 20px;
            font-size:28px;
            line-height: 40px;
            height: 126px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
        .godetail{
            font-size: 34px;
            line-height: 48px;
            padding: 20px 0;
            color: #4086F7;
            text-align: right;
        }
    }
}

</style>