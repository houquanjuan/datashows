<template>
    <div class="table-div">
      <table class="table-style" id="tableWarn">
     <!-- <thead>
        <tr align="center"  class="warn-title">
          <td class="item1">应用系统</td>
          <td class="item2">标题</td>
          <td class="item3">级别</td>
          <td class="item4">数量</td>
          <td class="item5">发生时间</td>
        </tr>
        </thead>-->
        <tbody>
        <tr align="center"  class="warn-title">
          <td class="item12">应用系统</td>
          <td class="item22">标题</td>
          <td class="item32">级别</td>
          <td class="item42">数量</td>
          <td class="item52">发生时间</td>
        </tr>
        <tr class="warn-content-item" v-for="warn in warnList" :key="warn.id">
          <td class="item21" :title="warn.appSystem">{{warn.appSystem}}</td>
          <td class="item22" :title="warn.event">{{warn.event}}</td>
          <td class="item32" :title="warn.severity">{{warn.severity}}</td>
          <td class="item42" :title="warn.num">{{warn.num}}</td>
          <td class="item52" :title="warn.occurTime">{{warn.occurTime}}</td>
        </tr>
        </tbody>
      </table>
     <!-- <table"0" cellpadding="2" width="100%" border="1">
        <tbody>
        <tr align="center" bgcolor="#dcdcdc">
          <td style="width:100px;">用户编号</td>
          <td>试用时间</td>
          <td>转正时间</td>
          <td>性别</td>
          <td>姓名拼音</td>
          <td>生日时间</td>
          <td>民族</td>
          <td>身高</td>
        </tr>
        <tr>
          <td>2000001</td>
          <td>1997-3-13</td>
          <td>1997-3-13</td>
          <td>1</td>
          <td>WZJ</td>
          <td>1965-3-13</td>
          <td>汉</td>
          <td>171</td>
        </tr>
        <tr>
          <td>2000045</td>
          <td>2001-2-15</td>
          <td>2001-3-15</td>
          <td>0</td>
          <td>WY</td>
          <td>1978-8-5</td>
          <td>汉</td>
          <td>162</td>
        </tr>
        <tr>
          <td>2000046</td>
          <td>2001-2-23</td>
          <td>2001-3-23</td>
          <td>0</td>
          <td>LQ</td>
          <td>2001-2-23</td>
          <td>汉</td>
          <td>171</td>
        </tr>
        </tbody>
      </table>-->
    </div>
</template>

<script>
import dateUtil from '../publicService/commonUtls.js'
export default {
  data () {
    return {}
  },
  props: ['warnList'],
  mounted () {
    this.createTable()
  },
  methods: {
    createTable() {
      let table = document.getElementById('tableWarn')
      console.log('cells width:' + table.rows[0].cells.length)
      let header = table.rows[0]
      let tableX = header.clientWidth
      let length = header.cells.length
      console.log('cells tableX:' + tableX)
      console.log('cells length:' + length)
      dateUtil.moveTable(table)
    }
  }
}
</script>

<style scoped>

</style>
