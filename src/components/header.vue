<template>
    <div class="header_pub">
        <div class="title"><span class="back" @click="$router.back(-1)"><van-icon name="arrow-left" size="20" color="#666666"/></span><span>{{title}}</span></div>
    </div>    
</template>
<script>
export default {
    props:{
        title:String
    }
}
</script>
<style lang="scss" scoped>
.header_pub{
    padding:26px 0;
    background: #fff;
    .title{
        text-align: center;
        color:#030303;
        font-size: 34px;
        position: relative;
        .back{
            position: absolute;
            left: 30px;
            top: 0px;
        }
    }
}

</style>