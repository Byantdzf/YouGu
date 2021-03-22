<template>
    <div class="footers">
        <div class="tab_list">
            <div class="tablist" @click="Tab('1')">
                <van-icon v-if="type!=1" name="apps-o" size="20" color="#ccc"/>
                <van-icon v-if="type==1" name="apps-o" size="20" color="#4086F7"/>
                <div class="tab_name" :class="type==1?'tab_active':''">平台介绍</div>
            </div>
            <div class="tablist" @click="Tab('2')">
                <van-icon v-if="type!=2" name="contact" size="20" color="#ccc"/>
                <van-icon v-if="type==2" name="contact" size="20" color="#4086F7"/>
                <div class="tab_name" :class="type==2?'tab_active':''">个人中心</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        type:Number
    },
    data(){
        return {
            
        }
    },
    methods:{
        Tab(index){
            if(index==1){
                this.$router.push({ path: '/index' })
            }else if (index==2){
                this.$router.push({ path: '/user' })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.footers{
    background:#fff;
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 5px -10px 10px #eee;
    .tab_list{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 14px 0 10px 0;
        .tablist{
            width: 50%;
            display:flex;
            flex-direction: column;
            align-items: center;
            .tab_name{
                font-size: 24px;
                line-height: 34px;
                color: #999999;
            }
            .tab_active{
                color:#4086F7;
            }
        }
    }
}
</style>