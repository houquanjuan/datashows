<template>
  <div class="pop-wrap" v-show="popShow">
    <div class="pop-mask" @click="popWindowClose"></div>
    <div class="pop-window" :class="popObj.popName=='create'?'create-pop':''">
      <div class="pop-title">
        <div class="pop-title-text">
          {{popObj.popTitle}}
        </div>
        <div class="close-btn" @click="popWindowClose">
          <i class="icon pop-icon fa fa-times"></i>
        </div>
      </div>
      <div class="pop-content">
        <label v-if="popObj.popName=='msg'" class="pop-label">
          <span class="pop-label-name">{{popObj.contentMsg}}</span>
        </label>
      </div>
      <div class="pop-footer">
        <button class="btn-normal btn-md" v-for="btnName in popObj.button" @click="popBtnClick(btnName)">
          <span>{{btnName}}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopItem',
  data() {
    return {
    }
  },
  computed: {
    popShow () {
      return this.$store.state.popShow
    },
    popObj () {
      return this.$store.state.popObj
    },
  },
  mounted () {
  },
  methods: {
    popWindowClose() {
      this.$store.commit('savePopShow', false)
    },
    popBtnClick (name) {
      if (name === '确定') {
        this.$store.commit('savePopShow', false)
      }
    }
  }
}
</script>

<style lang="css">
  .pop-wrap{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    background: rgba(0,0,0,.35);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pop-wrap .pop-mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .pop-wrap .pop-window{
    position: relative;
    min-width: 400px;
    max-width: 80%;
    background: #27343e;
    color: #fff;
    padding: 16px 20px;
    z-index: 0;
  }
  .pop-wrap .pop-window::before{
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(-181deg,#00deff 0,#00baff 74%);
  }
  .pop-wrap .create-pop{
    width: 417px;
  }
  .pop-wrap .pop-title{
    line-height: 16px;
    display: flex;
    justify-content: space-between;
  }
  .pop-wrap .pop-content{
    padding-bottom: 10px;
    min-height: 50px;
    max-height: 500px;
    overflow-y: auto;
  }
  .pop-footer{
    text-align: right;
  }
  .pop-wrap .pop-title .pop-title-text{
    color: #00baff;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 28px;
  }
  .pop-wrap .pop-title .close-btn{
    cursor: pointer;
    /* width: 16px; */
    height: 18px;
    font-size: 0;
    position: relative;
    transition: .3s ease;
  }
  .pop-wrap .pop-title .close-btn:hover{
    transform: rotate(90deg);
  }
  .pop-wrap .pop-title .close-btn::after{
    content: '';
    display: inline-block;
    position: absolute;
    width: 250%;
    height: 250%;
    border-radius: 50%;
    overflow: hidden;
    left: -75%;
    top: -75%;
    background: 0 0;
  }
  .pop-icon{
    font-size: 18px;
    font-style: normal;
    color: #00baff;
    -webkit-font-smoothing: antialiased;
  }
  .pop-wrap .pop-content .pop-label{
    margin-bottom: 30px;
    font-weight: normal;
    cursor: pointer;
    display: block;
  }
  .pop-wrap .pop-content .pop-label2{
    margin-bottom: 10px;
    font-weight: normal;
    cursor: pointer;
    display: block;
  }
  .pop-wrap .pop-content .required{
    margin-right:5px;
    color:red;
  }
  .pop-wrap .pop-content .pop-label-name{
    font-size: 14px;
    color: #fff;
    cursor: default;
  }
  .pop-wrap .pop-content .pop-label-name2{
    font-size: 12px;
    color: #fff;
    cursor: default;
  }
  .pop-wrap .pop-content .screen-name-input{
    display: block;
    line-height: 30px;
    background: #1c222b;
    color: #fff;
    font-size: 12px;
    width: 100%;
    padding: 0 8px;
    margin-top: 8px;
    height: 30px;
  }
  .pop-wrap .pop-content .screen-name-input2{
    display: block;
    line-height: 30px;
    background: #1c222b;
    color: #fff;
    font-size: 12px;
    width: 100%;
    padding: 0 8px;
    margin-top: 2px;
    height: 30px;
  }
  .btn-normal{
    display: inline-block;
    vertical-align: middle;
    height: 32px;
    line-height: 32px;
    padding: 0 30px;
    box-sizing: border-box;
    outline: 0;
    text-align: center;
    font-size: 14px;
    background-image: linear-gradient(-225deg,#00d3f1 0,#12b3ff 100%);
    color: #293f52;
    border: none;
    transition: .3s ease;
    cursor: pointer;
  }
  .btn-normal:hover{
    box-shadow: 0 0 5px 0 #00d3f1;
  }
  .btn-normal.btn-md{
    height: 32px;
    line-height: 32px;
    padding: 0 30px;
  }
</style>
