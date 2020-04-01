export default {
  /**
   * 日期格式转为时间戳
   * @param dateString
   * @returns {Number}
   */
  DateToUnix: function (dateString) {
    var f = dateString.split(' ', 2)
    var d = (f[0] ? f[0] : '').split('-', 3)
    var t = (f[1] ? f[1] : '').split(':', 2)
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime() / 1000
  },
  /**
   * 时间戳转为日期格式
   * @param unixTime
   * @returns {String}
   */
  UnixToDate: function (unixTime) {
    unixTime = parseInt(unixTime) + 8 * 60 * 60
    var time = new Date(unixTime * 1000)
    var ymdhis = ''
    var year = time.getUTCFullYear()
    var month = isAddZero(time.getUTCMonth() + 1)
    var day = isAddZero(time.getUTCDate())
    var hour = isAddZero(time.getUTCHours())
    var minutes = isAddZero(time.getUTCMinutes())
    ymdhis = year + '/' + month + '/' + day + '\n' + hour + ':' + minutes
    return ymdhis
  },
  /**
   * 日期加
   */
  AddDay: function (date, days) {
    var dataArr = date.replace(/-/g, '/')

    var nd = new Date(dataArr)
    nd = nd.valueOf()
    nd = nd + days * 24 * 60 * 60 * 1000
    nd = new Date(nd)
    var y = nd.getFullYear()
    var m = isAddZero(nd.getMonth() + 1)
    var d = isAddZero(nd.getDate())
    var h = isAddZero(nd.getHours())
    var s = isAddZero(nd.getMinutes())
    var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
    return cdate
  },
  /**
   * 日期分钟
   */
  AddMinutes: function (date, mins) {
    var dataArr = date.replace(/-/g, '/')

    var nd = new Date(dataArr)
    nd = nd.valueOf()
    nd = nd + mins * 60 * 1000
    nd = new Date(nd)
    var y = nd.getFullYear()
    var m = isAddZero(nd.getMonth() + 1)
    var d = isAddZero(nd.getDate())
    var h = isAddZero(nd.getHours())
    var s = isAddZero(nd.getMinutes())
    var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
    return cdate
  },
  /**
   * 日期减
   */
  IncreaseDay: function (date, days) {
    var dataArr = date.replace(/-/g, '/')
    var nd = new Date(dataArr)
    nd = nd.valueOf()
    nd = nd - days * 24 * 60 * 60 * 1000
    nd = new Date(nd)
    var y = nd.getFullYear()
    var m = isAddZero(nd.getMonth() + 1)
    var d = isAddZero(nd.getDate())
    var h = isAddZero(nd.getHours())
    var s = isAddZero(nd.getMinutes())
    var cdate = y + '-' + m + '-' + d + ' ' + h + ':' + s
    return cdate
  },
  /**
   * 获取当前时间
   */
  currentDate: function () {
    var date = new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = isAddZero(date.getMonth() + 1)
    var strDate = isAddZero(date.getDate())
    var hour = isAddZero(date.getHours())
    var min = isAddZero(date.getMinutes())
    var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + min
    return currentdate
  },
  moveTable: function (table) {
    var tTD
    for (var j = 0; j < table.rows[0].cells.length - 1; j++) {
      var dom2 = table.rows[0].cells[j + 1]
      var domWidth = dom2.offsetWidth
      var moveWidth = table.rows[0].cells[j].width + domWidth
      console.log('moveWidth:' + moveWidth)
      table.rows[0].cells[j].onmousedown = function () {
        // 记录单元格
        tTD = this
        if (event.offsetX > tTD.offsetWidth - 10) {
          tTD.mouseDown = true
          tTD.oldX = event.x
          tTD.oldWidth = tTD.offsetWidth
        }
        // 记录Table宽度
        // table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
        // tTD.tableWidth = table.offsetWidth;
      }
      table.rows[0].cells[j].onmouseup = function () {
        // 结束宽度调整
        if (tTD == undefined) tTD = this
        tTD.mouseDown = false
        tTD.style.cursor = 'default'
      }
      table.rows[0].cells[j].onmouseout = function () {
        // 结束宽度调整
        if (tTD == undefined) tTD = this
        var ww = event.offsetX
        var ww1 = event.x
        var hh = event.offsetY
        var hh1 = event.y
        var h2 = hh - hh1
        var w2 = ww - ww1
        var width = this.offsetWidth
        var height = this.offsetHeight
        if ((h2 < 0) || (h2 > height) || (w2 < 40) || (w2 > 20)) {
          tTD.mouseDown = false
          tTD.style.cursor = 'default'
        }
      }
      table.rows[0].cells[j].onmousemove = function () {
        // 更改鼠标样式
        if (event.offsetX > this.offsetWidth - 10) {
          this.style.cursor = 'col-resize'
        } else {
          this.style.cursor = 'default'
        }
        // 取出暂存的Table Cell
        if (tTD == undefined) { tTD = this }
        // 调整宽度
        var ww = ''

        if (tTD.mouseDown == true) {
          tTD.style.cursor = 'default'
          if ((tTD.oldWidth + (event.x - tTD.oldX) > 40) && (domWidth - (event.x - tTD.oldX) > 40)) {
            tTD.width = tTD.oldWidth + (event.x - tTD.oldX)
            domWidth = moveWidth - tTD.width
          }

          dom2.style.width = domWidth
          // 调整列宽
          tTD.style.width = tTD.width
          tTD.style.cursor = 'col-resize'

          // 调整该列中的每个Cell
          table = tTD
          while (table.tagName != 'TABLE') table = table.parentElement
          for (j = 1; j < table.rows.length; j++) {
            table.rows[j].cells[tTD.cellIndex].width = tTD.width
            table.rows[j].cells[tTD.cellIndex + 1].width = domWidth
          }
          // 调整整个表
          // table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
          // table.style.width = table.width;
        }
        // console.log('mouse OVEW:' + JSON.stringify(tTD))
      }
    }
  }
}
/**
 * 当小于10的时候前面加0
 * 适用于时间判断
 */
function isAddZero (time) {
  if (time < 10) {
    return '0' + time
  }
  return time
}
