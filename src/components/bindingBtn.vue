<template>
  <div>
    <button @click="nextBtn" v-bind:disabled="!disabledTRE" :class="disabledTRE?'bindingTrue':'binding'">{{text}}</button>
    <div class="jump">
      <p @click="JumpBlock">暂时跳过</p >
      <img src="./../assets/images/jump.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bindingBtn',
    props: ['text','disabledTRE'],
    methods: {
      nextBtn(){
        this.$emit('nextTop')
      },
      JumpBlock(){
        this.$router.push('index')
      }
    },
  }
</script>
<style>
  .jump {
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #4086F7;
    font-size: 30px;
    margin: 0 auto;
    position: absolute;
    top: 90%;
    left: 0px;
    right: 0px;
    /* width: 32%; */
  }

  .jump img {
    width: 32px;
    height: 32px;
    margin-top: 6px;
  }

  .binding {
    width: 90%;
    border: none;
    border-radius: 5px;
    height: 100px;
    font-size: 36px;
    color: #fff;
    background-color: #C5DAFC;
    margin: 0 auto;
    position: absolute;
    top: 80%;
    left: 0;
    right: 0;
  }
  .bindingTrue{
    width: 90%;
    border: none;
    border-radius: 5px;
    height: 100px;
    font-size: 36px;
    color: #fff;
    background-color: #4086F7;
    margin: 0 auto;
    position: absolute;
    top: 80%;
    left: 0;
    right: 0;
  }
</style>
