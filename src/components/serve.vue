<template>
    <div>
        <div class="bind_serve">
            <h2>绑定机构信息</h2>
            <div class="choose_type">
                <div class="type" :class="type==1?'type_active':''" @click="Tab('1')">选择优谷朗读机构</div>
                <div class="type" :class="type==2?'type_active':''" @click="Tab('2')">新机构入驻</div>
            </div>
            <div class="" v-if="type==1">
                <p class="OrgaName">机构名称</p>
                 <div class="chooseName">
                    <input type="text" :class="chooseBlock?'chooseInptBorder':'chooseInpt'" v-model="search" 
                        placeholder="请输入机构名称进行选择">
                    <ul class="showChoose" v-if="chooseBlock">
                        <li v-for="(item,index) in list" @click="showItem($event,item.orgaId)" :key="index">
                        <span>{{item.orgaName.substr(0,item.orgaName.indexOf(search))}}</span><span
                            style="color:#2A70FE">{{search}}</span><span>{{item.orgaName.substr(item.orgaName.indexOf(search)+search.length)}}</span>
                        </li>
                        <li v-if="NONETEXT">暂无数据</li>
                        <!-- v-for="(item,index) in items"{{item.orgaName}} -->
                    </ul>
                    </div>
                <p class="OrgaTip">仅可选择已购买开通优谷朗读产品服务机构(如购买过优谷朗读亭、留声墙、小舞台、朗读小程序等)</p>
            </div>
            <div class="serve_detail" v-if="type==2">
                <div class="serve_title">机构名称</div>
                <input type="text" class="text" v-model="orgaName">
                <div class="serve_title distance">机构类型</div>
                <div class="choose_list" @click="showPicker = true" >{{orgaType}}<span class="active"><van-icon v-if="!showPicker" name="arrow-down" color="#666" size="20"/></span><van-icon  class="active active_up" v-if="showPicker" name="arrow-up" color="#666" size="20"/></span></div>
                <van-popup v-model="showPicker" round position="bottom">
                    <van-picker
                    title="选择机构类型"
                    show-toolbar
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                    :columns="columns"
                    />
                </van-popup>
                
                <div class="serve_title distance address" >
                    <div>机构地址</div>
                    <div @click="address()">定位<span class="address_icon"><van-icon name="location-o" color="#4086F7"/></span></div>
                </div>
                <input type="text" class="text" v-model="orgaAddress">
                <div class="serve_tip">订单完成支付后，待客服联系机构开通成功后即可在个人中心绑定管理。</div>
            </div>
        </div>
        
    </div>
</template>
<script>

export default {
    props:{
        getValue:Boolean,
        orgaAddr:String
    },
    data(){
        return {
            type:1,
            map:false,
            orgaAddress:'',
            showPicker: false,
            search: '',
            list: [],
            NONETEXT:false,
            columns: ['政企单位','中小学','高等院校','职业学校','图书馆','景区','幼儿园','其他'],
            chooseBlock: false,
            orgaType:'',
            orgaName:'',
            orgaId:'',
            orderList:{}
            
        }
    },
    methods:{
        Tab(index){
            this.type = index
            if(index==1){
                this.orgaType = '',
                this.orgaName = '',
                this.orgaAddress = ''
            }else{
                this.search = ''
            }
        },
        onConfirm(value) {
            this.orgaType = value;
            this.showPicker = false;
        },
        address(){
            this.$emit('clickMap',true)
        },
        institutionInfo() {
            if (this.search) {
                this.chooseBlock = true
                } else {
                this.chooseBlock = false
                }
                this.orgaId = ''
                this.btnClick = false
                this.axios.post('/api/v1/login/searchOrgaInfos', {
                data: {
                    pageNum: 1,
                    pageSize: 10,
                    searchContent: this.search ? this.search : ''
                }
                }).then(res => {         
                // console.log(res.data.data.total)
                if (res.data.data.total == 0) {
                    this.NONETEXT = true
                    this.list = []
                }else{
                    this.list = res.data.data.records
                    this.NONETEXT = false
                } 
            },error=>{
                if(error.response.data.message=='缓存用户信息不存在'){
                    this.$cookies.remove("sessionId")
                    this.$router.push({path:'/login'})
                }
            })
      },
    showItem(event, id) {
        this.search = event.currentTarget.innerText
        this.chooseBlock = false
        this.orgaId = id
        if (this.orgaId != '' && this.search != null) {
          this.btnClick = true
        } else {
          this.btnClick = false
        }
      },
    },
    watch:{
        orgaAddr(newVal,ordVal){
            this.orgaAddress = newVal
        },
        getValue(newVal,ordVal){
            if(this.type == 1){
                this.orderList = {"bindOrgaId":this.orgaId}
            }else{
                this.orderList = {
                    orgaType:this.orgaType,
                    orgaName:this.orgaName,
                    orgaAddr:this.orgaAddress
                }
            }
            
            this.$emit('ORGA',this.orderList)
        },
        search(newVal,ordVal){
            if(newVal == ''){
                this.$emit('OrgaContent',false)
            }else{
                this.$emit('OrgaContent',true)
            }
            for(let i=0;i<this.list.length;i++){
                if (newVal == this.list[i].orgaName){
                    console.log(111111)
                    this.chooseBlock = false
                    this.list = []
                    return
                }
            }
            this.list = []
            this.institutionInfo()
        },
        orgaName(newVal,ordVal){
            if(newVal != '' && this.orgaType !=''&&this.orgaAddress!==''){
                this.$emit('OrgaContent',true)
            }else{
                this.$emit('OrgaContent',false)
            }
        },
        orgaType(newVal,ordVal){
            if(newVal != '' && this.orgaName !=''&&this.orgaAddress!==''){
                this.$emit('OrgaContent',true)
            }else{
                this.$emit('OrgaContent',false)
            }
        },
        orgaAddress(newVal,ordVal){
            if(newVal != '' && this.orgaName !=''&&this.orgaType!==''){
                this.$emit('OrgaContent',true)
            }else{
                this.$emit('OrgaContent',false)
            }
        }

    }
}
</script>
<style lang="scss" scoped>
.bind_serve{
    h2{
        padding: 32px 0 20px 0;
        font-size: 36px;
        line-height: 50px;
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
    .choose_type{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .type{
            width: 320px;
            height:92px;
            border: 1px solid #ccc;
            border-radius: 16px;
            line-height: 92px;
            box-sizing: border-box;
            font-size: 32px;
            padding-left: 24px;
        }
        .type_active{
            background: #4086F7;
            color: #fff;
        }
    }
    .serve_detail{
        margin-top: 30px;
        .serve_title{
            font-size: 34px;
            line-height: 48px;
            
        }
        .distance{
            margin: 28px 0 22px 0;
        }
        .address{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .address_icon{
                position: relative;
                top: 4px;
                margin-left: 4px;
            }
        }
        .text{
            display: inline-block;
            border: none;
            border-bottom: 1px solid #999;
            padding: 20px 0;
            width: 100%;
            font-size: 34px;
            line-height: 48px;
            padding-left: 20px;
            box-sizing: border-box;
            border-radius: 0;
        }
        .choose_list{
            width:100%;
            height: 88px;
            border: 1px solid #999;
            background: #fff;
            font-size: 34px;
            line-height: 88px;
            padding-left: 20px;
            box-sizing: border-box;
            border-radius: 8px;
            position: relative;
            .active{
                position: absolute;
                top: 6px;
                right: 20px;
            }
            .active_up{
                top: 20px;
            }
        }
        .serve_tip{
            font-size: 24px;
            line-height: 34px;
            color: #666;
            margin-top: 20px;
        }
    }
}
.OrgaName{
    font-size: 34px;
    line-height: 48px;
    padding: 48px 0 20px 0;
}
.chooseName {
    width: 670px;
    height: 100px;
    position: relative;
  }

  .chooseInpt {
    line-height: 48px;
    width: 670px;
    border: none;
    border-bottom: 1px solid #CCCCCC;
    margin-top: 20px;
    font-size: 34px;
    padding-left: 10px;
    box-sizing: border-box;
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .chooseInptBorder {
    line-height: 48px;
    width: 670px;
    border: none;
    border: 1px solid #CCCCCC;
    border-bottom: none;
    margin-top: 20px;
    font-size: 34px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .Tips {
    font-size: 24px;
    color: #999999;
    line-height: 46px;
    margin-top: 40px;
  }
  .showChoose {
    width: 670px;
    background-color: #fff;
    position: absolute;
    z-index: 99;
    border: 1px solid #ccc;
    border-top: none;
    height: 500px;
    overflow-y: auto;

    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);

    border-radius: 8px;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .showChoose li {

    font-size: 34px;
    color: #333;
    line-height: 48px;
    margin-bottom: 32px;
    margin-left: 20px;
    font-family: alibaba_M;
  }
.OrgaTip{
    font-size: 24px;
    line-height: 34px;
    color: #666;
    padding-bottom: 20px;
}
</style>