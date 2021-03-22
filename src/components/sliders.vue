<template>
<div>
    <div class="wrap_list" @click="show_list()">
        <div class="cart">
            <img src="../assets/images/serve_icon.png" alt="">
            <div class="content">增值服务<div class="content_detail">最终订单价格由活动套餐+增值服务数，可根据活动需求购买选配，也可直接购买增值服务。</div></div>           
        </div>
        <div class="control" v-if="!flag"><span>展开</span><span class="icon_list"><van-icon name="arrow-down" color="#666666" size="16"/></span></div>
        <div class="control" v-else><span style="color:#4086F7">收起</span><span class="icon_list"><van-icon name="arrow-up" color="#4086F7" size="16"/></span></div>
    </div>
    <div class="detail_info" v-if="flag">
        <div class="choose">
            <div class="design" v-for="(item,index) in servece" :key="index">
                <h2 class="list_title">{{item.typeName}}</h2>
                <div>
                    <van-checkbox-group v-model="result" icon-size="20px">
                        <ul>
                    <li v-for="(list,i) in item.childs" :key="i">
                        <van-checkbox @click="checkbox(list)" ref="checkbox" :name="list.serviceId"><span class="leason">{{list.serviceName}}</span></van-checkbox>
                        <span>{{list.unit}}</span>
                    </li>
                </ul>
                    </van-checkbox-group>
                </div>                
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    props:{
        servece:Array,
        getValue:Boolean
    },
    data() {
        return {
            flag:false,
            result: [],
            radio: '1',
            servecePrice:0
        };
    },
    methods:{
        show_list(){
            this.flag = !this.flag
        },
        checkbox(list){
            if (this.result.indexOf(list.serviceId)!= -1){
                this.servecePrice = this.servecePrice + list.price
            }else{
                this.servecePrice = this.servecePrice - list.price
            }
            console.log(this.servecePrice)
            this.$emit('servecePrice',this.servecePrice,this.result)
        }
    },
    // watch:{
    //     getValue(newVal,ordVal){
    //         this.$emit('serviceIds',this.result)
    //     }
    // }
    
}
</script>
<style lang="scss" scoped>
.wrap_list{
    width: 670px;
    height: 164px;
    margin: 0 auto;
    background: #FAFAFA;
    border-radius: 12px;
    position: relative;
    .control{
        position: absolute;
        top: 20px;
        right: 40px;
        font-size: 24px;
        line-height: 34px;
        color: #666;
        .icon_list{
            position: relative;
            top: 8px;
            margin-left: 4px;
        }
    }
    .cart{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 30px 40px;
        img{
            width: 62px;
            margin-right: 30px;
        }
        .content{
            font-size: 28px;
            line-height: 40px;
            font-family: "alibaba_M";
        }
        .content_detail{
            font-size: 20px;
            line-height: 28px;
            margin-top: 8px;
            color: #999;
        }
    }
}
    .detail_info{
        background: #FAFAFA;
        padding-bottom: 56px;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        .choose{
            li{
                margin-top: 48px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                font-size: 28px;
                line-height: 40px;
                padding: 0 40px;
                .leason{
                    margin-left: 18px;
                }
            }
        }
        .list_title{
            font-size: 28px;
            line-height: 40px;
            color: #333;
            padding-left: 20px;
            padding-top: 64px;
            &:before{
                content:' ';
                width: 4px;
                height: 12px;
                background: #4086F7;
                display: inline-block;
                margin-right: 20px;
                vertical-align: middle;
            }
        }
    }
</style>