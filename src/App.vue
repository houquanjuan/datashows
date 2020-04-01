<template>
      <div id="wrapper" :style="{backgroundImage: bgImage}" style="background-size: cover">
        <div class="block1" v-show="isFullScreen.b1">

          <div class="title-div"><span>CPU利用率排行榜</span>
            <div class="expand-div">
              <span class="fa fa-expand" @click="expandBlock('block1', $event)"></span>
            </div></div>
          <div class="option-div">
            <selections class="selective" :config="config1" :dataList="dataList" @change="selectChanged('cpu')" v-model="defaultCpuData"></selections>
            <selections class="selective" :config="config2" :dataList="topList" @change="selectChanged('cpu')"  v-model="defaultCpuTop"></selections>
          </div>
          <div id="cpuBar" class="chart-content"></div>
        </div>
        <div class="block2" v-show="isFullScreen.b2" >

          <div class="title-div"><span class="inflow-title-1">出入流量</span>
            <div class="expand-div">
              <span class="fa fa-expand" @click="expandBlock('block2', $event)"></span>
            </div>
          </div>
          <div class="inflow-options">
            <div class="selection-div">
              <span class="time-span">指标：</span>
               <selections class="selective" :config="config1" :dataList="inflowTitleList" @change="selectChanged('inflowType')" v-model="inflowTitle"></selections>
            </div>
            <div class="time-period">
              <span class="time-span">时间：</span>
              <flat-pickr v-model="defaultStart" :config="configStart" @on-close="selectStart" class="date-pickr" ></flat-pickr>
              <span class="center-line">至</span>
              <flat-pickr v-model="defaultEnd" :config="configEnd" @on-close="selectEnd" class="date-pickr" ></flat-pickr>
            </div>
          </div>
          <div class="inflow-options">
            <div class="selection-div" id="sele">
              <span class="time-span">主机：</span>
              <selections class="selective" :config="config4" :dataList="masterList" @change="selectChanged('inflow')" v-model="master"></selections>
              <span class="master-selected">已选<i>{{masterCount}}</i>个</span>
            </div>
          </div>
          <div id="inflowLine" ref="inflowLine" class="chart-content">
          </div>
        </div>
        <div class="block3" v-show="isFullScreen.b3">

          <div class="title-div"><span>内存利用率排行榜</span>
            <div class="expand-div">
              <span class="fa fa-expand" @click="expandBlock('block3', $event)"></span>
            </div></div>
          <div class="option-div">
            <selections class="selective" :config="config1" :dataList="dataList" @change="selectChanged('memory')" v-model="defaultMemData"></selections>
            <selections class="selective" :config="config2" :dataList="topList" @change="selectChanged('memory')"  v-model="defaultMemTop"></selections>
          </div>
          <div id="memoryBar" class="chart-content"></div>
        </div>
        <div class="block4" >

          <div class="title-div"><span>当前告警列表</span>
            <div class="expand-div">
              <span class="fa fa-expand" @click="expandBlock('block4', $event)"></span>
            </div></div>
          <div class="selection-div warn-drop">
            <span class="time-span">告警级别：</span>
            <selections class="selective" :config="config3" :dataList="warnType" @change="selectChanged('warn')"  v-model="defaultWarn"></selections>
          </div>
          <div id="warnList" class="chart-content">
            <div class="table-div">
              <div id="easyTable"></div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import eOption from './publicService/echartsOption'
import Urls from './publicService/urls.js'
import dateUtil from './publicService/commonUtls.js'
import httpService from './publicService/HttpService.js'
import TipBoxService from './publicService/TipBoxService.js'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/dark.css'
import selections from './components/selections.vue'
export default {
  name: 'App',
  data () {
    return {
      tableWidth:'',
      bgImage: 'url(' + require('./assets/background2.png') + ')',
      cpuChart: '',
      memoryChart: '',
      inflowChart: '',
      warnChart: '',
      // master: '',
      master: [],
      masterStatus: true,
      timeType: 'day',
      selStartTime: '',
      selEndTime: '',
      websock: null,
      startTimes: [],
      endTimes: [],
      inflowTitle: 'MySql流量',
      isFullScreen: {
        b1: true,
        b2: true,
        b3: true,
        b4: true
      },
      configStart: {
        dateFormat: 'Y-m-d H:i',
        enableTime: true,
        minuteIncrement: 1,
        allowInput: true,
        minDate: '',
        maxDate: '',
        time_24hr: true
      },
      configEnd: {
        dateFormat: 'Y-m-d H:i',
        enableTime: true,
        minuteIncrement: 1,
        allowInput: true,
        minDate: '',
        maxDate: '',
        time_24hr: true
      },
      defaultStart: '',
      defaultEnd: '',
      defaultWarn: '所有告警',
      defaultCpuData: '实时数据',
      defaultCpuTop: 'Top15',
      defaultMemData: '实时数据',
      defaultMemTop: 'Top15',
      warnType: ['所有告警', '主要告警', '次要告警'],
      dataList: ['实时数据', '24小时平均数据'],
      topList: ['Top5', 'Top10', 'Top15'],
      inflowTitleList: ['MySql流量', '外网网卡流量'],
      config1: {
        width: '140px',
        zindex: 20
      },
      config2: {
        width: '100px'
      },
      config3: {
        width: '200px'
      },
      config4: {
        isMutil: true,
        width: '385px',
        search: true,
        maxNum: 10
      },
    }
  },

  created () {

    // 页面刚进入时开启长连接
    this.initWebSocket()
  },
  components: {
    flatPickr,
    selections,
  },
  destroyed () {
    // 页面销毁时关闭长连接
    this.websocketclose()
    // this.websock.close()
  },
  beforeDestroy () {
    // this.websock.close()
  },
  computed: {
    warnList () {
      let warns = this.$store.state.warningList
      if (this.defaultWarn !== '所有告警') {
        warns = warns.filter(data => data.severity ==this.defaultWarn)
      }
      return warns
    },
    masterList () {
      let arr=this.$store.state.masterList
      let arr2=[],arr3=[]
      if (this.inflowTitle === 'MySql流量'){
        if(arr.hasOwnProperty('hostList')){
         arr2= arr.hostList
        }
      }else{
        if(arr.hasOwnProperty('hostList2')) {
          arr2= arr.hostList2
        }
      }
     /* arr3=[].concat(arr2)
      let len = arr3.length
      if (len !== 0) {
        if (len > 10) {
          arr3 = arr3.slice(0, 10)
        }
        this.master = [].concat(arr3)
      }else{
        this.master=[]
      }*/
      return arr2
    },
    masterCount () {
      return this.master.length
    },

  },
  watch:{
    inflowTitle(value1,value2){
      console.log('watch;'+value1)
      let arr=this.$store.state.masterList
      let arr2=[]
      if (value1 === 'MySql流量'){
        if(arr.hasOwnProperty('hostList')){
          arr2 = arr.hostList
        }
      }else{
        if(arr.hasOwnProperty('hostList2')) {
          arr2 = arr.hostList2
        }
      }
      let len = arr2.length
      if (len !== 0) {
        if (len > 10) {
          arr2 = arr2.slice(0, 10)
        }
        this.master = [].concat(arr2)
      }else{
        this.master=[]
      }
      this.getInflowList(this)
    }
  },
  mounted () {
    this.getMasters()
    this.chartInit()
    this.getCPUList()
    this.getMemList()
    this.getWarningList()
   // this.getInflowList(this)
    this.changEcharts()

    this.readyChat(this)
  },
  methods: {
    setWwarnList (that) {
      let warns = that.$store.state.warningList
      if (that.defaultWarn !== '所有告警') {
        warns = warns.filter(data => data.severity == that.defaultWarn)
      }
      let column = [{
        field: 'appSystem',
        align: 'center',
        title: '应用系统',
        width: '22%',
        formatter: function(value, row, index) {
          return '<span class="table-span" title="' + value + '">' + value + '</span>'
        }
      }, {
        field: 'event',
        align: 'center',
        title: '标题',
        width: '35%',
        formatter: function(value, row, index) {
          return '<span class="table-span" title="' + value + '">' + value + '</span>'
        }
      }, {
        field: 'severity',
        align: 'center',
        title: '级别',
        width: '12%',
        formatter: function(value, row, index) {
          return '<span title="' + value + '">' + value + '</span>'
        }
      }, {
        field: 'num',
        align: 'center',
        title: '数量',
        width: '10%',
        formatter: function(value, row, index) {
          return '<span title="' + value + '">' + value + '</span>'
        }
      }, {
        field: 'occurTime',
        align: 'center',
        title: '发生时间',
        width: '21%',
        formatter: function(value, row, index) {
          return '<span class="table-span" title="' + value + '">' + value + '</span>'
        }
      }]
      $('#easyTable').datagrid({
        data: warns,
        total: warns.length,
        fit: true,
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [column],
        rowStyler: function(index, row) {
          return 'height:35px;'
        },
      });
    },

    expandBlock (type, e) {
      let dom = document.getElementsByClassName(type)

      let currentDom = e.currentTarget
      if (currentDom.classList.contains('fa-expand')) { // 放大按钮
      /* if(type!='block4'){
         $('.block4').css('opacity',0)
         $('.'+type).parent().css('overflow','hidden')
       }*/

        currentDom.classList.remove('fa-expand')
        currentDom.classList.add('fa-compress')
        dom[0].classList.add('full-screen')
        if (type === 'block1') {
          this.isFullScreen.b2 = false
          this.isFullScreen.b3 = false
          this.isFullScreen.b4 = false
          $('.block4').css('opacity',0)
          $('.'+type).parent().css('overflow','hidden')
          this.cpuChart.resize()
        } else if (type === 'block2') {
          this.isFullScreen.b1 = false
          this.isFullScreen.b3 = false
          this.isFullScreen.b4 = false
          $('.block4').css('opacity',0)
          $('.'+type).parent().css('overflow','hidden')
          this.inflowChart.resize()
        } else if (type === 'block3') {
          this.isFullScreen.b1 = false
          this.isFullScreen.b2 = false
          this.isFullScreen.b4 = false
          $('.block4').css('opacity',0)
          $('.'+type).parent().css('overflow','hidden')
          this.memoryChart.resize()
        } else {
          this.isFullScreen.b1 = false
          this.isFullScreen.b2 = false
          this.isFullScreen.b3 = false
        }
      } else {
        currentDom.classList.add('fa-expand')
        currentDom.classList.remove('fa-compress')
        dom[0].classList.remove('full-screen')
        if (type === 'block1') {
          this.isFullScreen.b2 = true
          this.isFullScreen.b3 = true
//          this.isFullScreen.b4 = true
          $('.block4').css('opacity',1)
          $('.'+type).parent().css('overflow','')
          this.cpuChart.resize()
        } else if (type === 'block2') {
          this.isFullScreen.b1 = true
          this.isFullScreen.b3 = true
//          this.isFullScreen.b4 = true
          $('.block4').css('opacity',1)
          $('.'+type).parent().css('overflow','')
          this.inflowChart.resize()
        } else if (type === 'block3') {
          this.isFullScreen.b1 = true
          this.isFullScreen.b2 = true
         // this.isFullScreen.b4 = true
          $('.block4').css('opacity',1)
          $('.'+type).parent().css('overflow','')
          this.memoryChart.resize()
        } else {
          this.isFullScreen.b1 = true
          this.isFullScreen.b2 = true
          this.isFullScreen.b3 = true
        }

      }
   /*    if(this.isFullScreen.b4){
        // $('#easyTable').datagrid('resize')
        this.getWarningList()
      }*/
     /* if(!this.isFullScreen.b4){
        $('.block4').css('opacity',0)
        $('#wrapper').css('overflow','hidden')
      }else{
        $('.block4').css('opacity',1)
        $('#wrapper').css('overflow','auto')

      }*/
//      $('#easyTable').datagrid('resize')
      $('#easyTable').datagrid({
        fitColumns:true
      })
      $('#easyTable').datagrid({
        fitColumns:false
      })
    },
    setInflowData (that) {
      let arrs = that.$store.state.inflowList
      let list = []
      if (that.inflowTitle === 'MySql流量') {
        list = arrs.netFlowList
      } else {
        list = arrs.netFlowList2
      }
     // let arr = that.master.split(',')
      let arr = that.master

      console.log('master:'+that.master+'    指标：'+that.inflowTitle)
     /* let name=list[0].hostName
      let iii=arr.indexOf(name)*/
      console.log('data list:'+list)
      if (arr.length==0) {
        TipBoxService.open('error', '请选择主机')
        that.inflowChart.setOption({}, true)
      } else {
        let arr2 = []
        arr2=list.filter(data => arr.indexOf(data.hostName) !== -1)
        let len2 = arr2.length
        if (len2 > 0 && (arr2[0].timepoint.length === 0)) {
          TipBoxService.open('error', '服务器错误')
        } else {
          console.log('this.timeType:' +that.timeType)
          let option = eOption.setInflowOption(arr2, that.timeType)
          that.inflowChart.setOption(option, true)
        }
      }
    },
    setBarData (that, type) { // 填充柱体数据
      let arr = []
      let arr2 = []
      let arr3 = []
      let datas = []
      let fData = []
      let select1 = ''
      let select2 = ''
      if (type === 'cpu') {
        arr = that.$store.state.cpuList
        arr2 = arr.cpuList
        arr3 = arr.cpuAVGList
        select1 = that.defaultCpuData
        select2 = that.defaultCpuTop
      } else {
        arr = that.$store.state.memoryList
        arr2 = arr.memList
        arr3 = arr.memAVGList
        select1 = that.defaultMemData
        select2 = that.defaultMemTop
      }
      if (select1 === '实时数据') {
        datas = arr2
      } else {
        datas = arr3
      }
      if (select2 === 'Top5') {
        fData = datas.slice(0, 5)
      } else if (select2 === 'Top10') {
        fData = datas.slice(0, 10)
      } else {
        fData = datas
      }
      if (type === 'cpu') {
        let option = eOption.setCpuOption(fData)
        that.cpuChart.setOption(option)
      } else {
        let option = eOption.setMemoryOption(fData)
        that.memoryChart.setOption(option)
      }
    },
    selectChanged (type) {
      if (type === 'cpu') {
        this.$options.methods.setBarData(this, type)
      } else if (type === 'memory') {
        this.$options.methods.setBarData(this, type)
      } else if (type === 'inflow') {
        this.$options.methods.setInflowData(this)
      } else if (type === 'inflowType') {
      //  this.$options.methods.setInflowData(this)
      } else if (type === 'warn') {
        this.$options.methods.setWwarnList(this)
      }
    },
    selectStart () { // 选择开始时间
      console.log('select start time :{startTime:' + this.defaultStart + ' , endTime:' + this.defaultEnd + '}')
      let sTime = dateUtil.DateToUnix(this.defaultStart)
      let eTime = dateUtil.DateToUnix(this.defaultEnd)
      let jiange = eTime - sTime
      // let fiveMinutes = new Date(5 * 60 * 1000).getTime() / 1000
      let oneHour = new Date(2 * 60 * 60 * 1000).getTime() / 1000
      let servenDay = new Date(7 * 24 * 60 * 60 * 1000).getTime() / 1000
      let oneTime = dateUtil.AddMinutes(this.defaultStart, 2 * 60)
      if (jiange < oneHour) { // 开始时间与结束时间之间晓宇5分钟，或者结束时间小于开始时间
        this.defaultEnd = oneTime
      } else if (jiange > servenDay) { // 开始时间与结束时间超过7天
        this.defaultEnd = dateUtil.AddDay(this.defaultStart, 6)
      }
      this.configEnd.minDate = oneTime
      this.configEnd.maxDate = dateUtil.AddDay(this.defaultStart, 6)
      this.$options.methods.getInflowList(this)
      this.$options.methods.readyChat(this)
    },
    selectEnd () { // 选择结束时间
      this.$options.methods.getInflowList(this)
      this.$options.methods.readyChat(this)
    },
    initWebSocket () { // 初始化weosocket
      console.log('...........into socket...................')
      const wsuri = Urls.websocketUrl // ws地址
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },
    readyChat (that) {
      console.log('webscok:' + that.websock)
      if (that.websock.readyState === 1) { // this.websock.readyState = 1 表示连接成功，可以立即发送信息
        this.websocketSend(that)
      } else if (that.websock.readyState === 0) { // 表示正在连接，设置300ms后发送信息
        setTimeout(function () {
          that.websocketSend(that)
        }, 300)
      } else { // 连接未创建或者创建失败，则重新创建连接，并设置500ms后发送信息
        that.initWebSocket()
        setTimeout(function () {
          that.websocketSend(that)
        }, 500)
      }
    },
    websocketonopen () {
      console.log('WebSocket连接成功')
    },
    websocketonerror (e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage (e) { // 数据接收
      const redata = JSON.parse(e.data)
      console.log('socket data:' + JSON.stringify(redata.type ))
      if (redata.type === 'cpuList') {
        this.$store.commit('getCpuList', redata.data)
        this.$options.methods.setBarData(this, 'cpu')
      } else if (redata.type === 'memList') {
        this.$store.commit('getMemList', redata.data)
        this.$options.methods.setBarData(this, 'memory')
      } else if (redata.type === 'notifyList') {
        this.$store.commit('getWarnList', redata.data)
        this.setWwarnList(this)
      } else if (redata.type === 'netFlowList') {
        this.$store.commit('getInflowList', redata.data)
        this.timeType = redata.dateType
        this.$options.methods.setInflowData(this)
      }
    },
    websocketclose (e) { // 关闭
      this.websock.close()
      console.log('connection closed ')
    },
    websocketSend (that) {
      let data = {'dateStart': that.defaultStart, 'dateEnd': that.defaultEnd}
      that.websock.send(JSON.stringify(data))
    },
    getCPUList () { // 获取cpu利用率列表
      let that = this
      httpService.getLink(Urls.getCpuRateUrl)
        .then(res => {
          let arr = res
          that.$store.commit('getCpuList', arr)
          that.$options.methods.setBarData(that, 'cpu')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getMemList () { // 获取内存利用率列表
      let that = this
      httpService.getLink(Urls.getMemRateUrl)
        .then(res => {
          let arr = res
          that.$store.commit('getMemList', arr)
          // that.$options.methods.setMemChart(that)
          that.$options.methods.setBarData(that, 'memory')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getInflowList (that) { // 获取主机网卡出入流列表
      let data = {'dateStart': that.defaultStart, 'dateEnd': that.defaultEnd}
      httpService.postLink(Urls.getInflowUrl, data)
        .then(res => {
          let arr = res.netFlowList2
          that.timeType = res.dateType
          console.log('res.dateType:' + that.timeType)
          that.$store.commit('getInflowList', res)
          that.$options.methods.setInflowData(that)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getWarningList () { // 获取当前告警列表
      let that = this
      httpService.getLink(Urls.getWarnUrl)
        .then(res => {
          that.$store.commit('getWarnList', res.notifyList)
          that.setWwarnList(that)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getMasters () { // 获取主机列表
      let that = this
      httpService.getLink(Urls.getMasterUrl)
        .then(res => {
          let arr = []
          if(res.hasOwnProperty('hostList')){
            arr= res.hostList
          }
          let len = arr.length
          if (len !== 0) {
            if (len > 10) {
              arr = arr.slice(0, 10)
            }
            this.master = [].concat(arr)
          }else{
            this.master=[]
          }
          that.$store.commit('getMasterList', res)
          that.$options.methods.getInflowList(that)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    chartInit () { // 页面图表初始化
      this.cpuChart = this.$echarts.init(document.getElementById('cpuBar'))
      this.memoryChart = this.$echarts.init(document.getElementById('memoryBar'))
      this.inflowChart = this.$echarts.init(document.getElementById('inflowLine'))
      let currentTime = dateUtil.currentDate()
      // let minTime = dateUtil.IncreaseDay(currentTime, 10)
      this.defaultEnd = currentTime
      this.defaultStart = dateUtil.IncreaseDay(currentTime, 1)
      console.log('start time:' + this.defaultStart)
      this.configEnd.minDate = this.defaultStart
      this.configEnd.maxDate = dateUtil.AddDay(this.defaultStart, 6)
      // this.configEnd.maxDate = currentTime
      // this.configStart.maxDate = currentTime
      // this.configStart.minDate = minTime
    },
    changEcharts () { // 页面自适应
      window.addEventListener('resize', () => {
        this.cpuChart.resize()
        this.memoryChart.resize()
        this.inflowChart.resize()
      //  this.warnChart.resize()
      })
    },
    setEcharts (type, that) { // 图表渲染
      let option = ''
      if (type === 'cpuBar') {
        option = eOption.setCpuOption(that.cpuList)
        that.cpuChart.setOption(option)
      } else if (type === 'inflowLine') {
        option = eOption.setInflowOption(that.inflowList)
        that.inflowChart.setOption(option, true)
      } else if (type === 'memoryBar') {
        option = eOption.setMemoryOption(that.memXDatas, that.memYDatas)
        that.memoryChart.setOption(option)
      } else {
      }
    }
  }
}
</script>
<style lang="css">
</style>
