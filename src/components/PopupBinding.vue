<template>
  <div class="poput">
    <img :src="srcImg">
    <span class="poputText1">{{startText}}</span>
    <span class="poputText2">{{infoText}}</span>
  </div>
</template>
<script>
export default {
  name:'popupBinding',
  props:['srcImg','startText','infoText']
}
</script>
<style lang="css">
  .poput{
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .poput img{
    width: 120px;
    height: 120px;
  }
  .poput span{
    margin-top: 12px;
  }
  .poputText1{
    font-size: 34px;
    color: #4086F7;

  }
  .poputText2{
    color: #666666;
    font-size: 28px;
  }
</style>
