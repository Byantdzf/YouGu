<template>
    <div class="booking">
        <div class="booking_item" :class="flag==index?'active_item':''" v-for="(item,index) in book" :key="index" @click="Tab(index,item.typeId,item.price)">
            <img :src="item.images"/>
            <p class="bold">{{item.typeName}}</p>
            <p class="detail">{{item.remark}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        book:Array,
        
    },
    data(){
        return {
            flag:'a',
        }
    },
    methods:{
        Tab(index,id,price){
            this.flag = index
            this.$emit('GetActivePrice',price,id)
            console.log(price)
        }
    },
    // watch:{
    //     getValue(newVal,ordVal){
    //         this.$emit('ATypeId',this.activityTypeId)
    //     }
    // }
}
</script>
<style lang="scss" scoped>
.booking{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .booking_item{
        padding: 32px 22px 0 32px;
        width: 320px;
        height: 280px;
        background:#FAFAFA ;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 30px;
        border-radius: 10px;
    }
    .active_item{
        background-image: linear-gradient( #3154ED, #3997F5);
        color: #fff;
        .detail{
            color: #fff;
        }
    }
    img{
        width: 64px;
    }
    .bold{
        font-size: 28px;
        line-height: 40px;
        margin: 8px 0 20px 0;
    }
    .detail{
        font-size: 20px;
        line-height: 28px;
        color:#999 ;
    }
}
</style>