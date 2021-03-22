<template>
    <div class="order_confirm">
        <div class="price"><span class="icon">¥</span>{{AllPrice}}</div>
        <div class="order_buttom" :class="!disable?'disable':''" @click="go_order()">生成订单</div>
    </div>
</template>
<script>
export default {
    props:{
        AllPrice:Number,
        disable:Boolean
    },
    methods:{
        go_order(){
            // this.$router.push({path:'/pay'})
            this.$emit('order')
        }
    }
}
</script>
<style lang="scss" scoped>
.disable{
    opacity: 0.5;
}
.order_confirm{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 32px;
    height:172px;
    width: 750px;
    box-sizing: border-box;
    .price{
        color: #FE4600;
        font-size: 64px;
        .icon{
            font-size: 36px;
        }
    }
    .order_buttom{
        width: 304px;
        height: 92px;
        background: #4086F7;
        border-radius: 16px;
        font-size: 34px;
        color: #fff;
        line-height: 92px;
        text-align: center;
    }
}
</style>