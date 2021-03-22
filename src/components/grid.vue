<template>
    <div class="container">
        <div class="wrap" v-for="(item,index) in List" :key="index">
            <div class="pirture" v-for="(param,i) in item" :key="i">
                <img :src="param.imgUrl" />
                <p class="words">{{param.title}}</p>
                <p class="tip">{{param.tip}}</p>
            </div>
            <!-- <div class="pirture">
                <img :src="item.imgUrl" />
                <p class="words">{{item.title}}</p>
                <p class="tip">{{item.tip}}</p>
            </div> -->
        </div>
        
    </div>  
</template>
<script>
export default {
    props:{
        List:{
            type:Array
        }
    }
}
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}
.wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33.3%;
}
.pirture{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 52px;
        height: 52px;
        margin-top:38px ;
    }
    .words{
        font-size: 24px;
        line-height: 34px;
        font-family: "alibaba_M";
        margin-top: 16px;
    }
    .tip{
        color: #999;
        font-size: 20px;
        line-height: 28px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
}
</style>