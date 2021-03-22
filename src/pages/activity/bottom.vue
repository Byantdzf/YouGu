<template>
    <div class="footers">
        <div class="back" @click="Go_prev">上一步</div>
        <div class="go_pay" @click="Go_order()">{{title}}</div>
    </div>
</template>
<script>
export default {
    props:{
        title:String,
        step:Number
    },
    methods:{
        Go_order(){
            if(this.step==1){
                this.$emit('go_pay') 
            }else if(this.step==2){
                this.$emit('go_info') 
            }                      
        },
        Go_prev(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.footers{
    height:92px;
    width: 660px;
    background: #fff;
    line-height: 92px;
    padding: 40px 20px 40px 70px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position:fixed;
    bottom:0;
    left:0;
    .back{
        font-size: 34px;
    }
    .go_pay{
        width: 496px;
        height: 92px;
        background: #4086F7;
        border-radius: 16px;
        font-size: 34px;
        line-height: 92px;
        text-align: center;
        color: #fff;
    }
}
</style>