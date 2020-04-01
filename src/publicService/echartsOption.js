let echarts = require('echarts/lib/echarts')
function getXYData (arrData) {
  let len = arrData.length
  let aArr = []
  let bArr = []
  for (var i = 0; i < len; i++) {
    aArr.push(arrData[i].appSystem)
    bArr.push(arrData[i].num)
  }
  let item = {}
  item.xdata = aArr
  item.ydata = bArr
  return item
}
export default{
  setCpuOption (arr) {
    let serItem = getXYData(arr)
    let arrX = serItem.xdata
    let arrY = serItem.ydata
    var option = {
      tooltip: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '2%',
        // top: '8%',
        containLabel: true
      },
      xAxis: {
        data: arrX,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#D4D4D4',
            opacity: 0.5
          }
        },
        axisLabel: {
          // rotate: -45,
          color: '#D4D4D4'
        }
      },
      yAxis: [{
        type: 'value',
        name: '利用率（%）',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#D4D4D4'
          }
        },
        axisLabel: {
          color: '#D4D4D4'
        }
      }],
      series: [{
        name: 'CPU利用率',
        type: 'bar',
        data: arrY,
        itemStyle: {
          // color: '#1E90FF',
          normal: {
            /* color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ]
            ), */
          //  barBorderRadius: [7, 7, 0, 0],
            color: function (params) { // 首先定义一个数组
              var colorList = [
                '#006400', '#228B22', '#007850', '#15AD66', '#6ABD78', '#6BB073', '#A9CF53',
                '#83AD50', '#999E31', '#808000', '#A0BD2B', '#BDCC12', '#AEBA7F', '#CCE099', '#D7E37F']
              var index = params.dataIndex
              var cc = colorList[index]
              /* if(params.dataIndex >= colorList.length){
                index = params.dataIndex-colorList.length;
              } */
              return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [
                  {offset: 0, color: '#ACE1AF'},
                  /* {offset: 0.5, color: cc}, */
                  {offset: 1, color: cc}
                ])
              // return colorList[params.dataIndex]
            }
          //  barBorderRadius: [7, 7, 0, 0]
          }
          /* emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#2378f7'},
                {offset: 0.7, color: '#2378f7'},
                {offset: 1, color: '#83bff6'}
              ]
            )
          } */
        },
        barMaxWidth: 20
      }]
    }
    return option
  },
  setMemoryOption (arr) {
    let serItem = getXYData(arr)
    let arrX = serItem.xdata
    let arrY = serItem.ydata
    var option = {
      tooltip: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '2%',
        // top: '12%',
        containLabel: true
      },
      xAxis: {
        data: arrX,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#D4D4D4',
            opacity: 0.5
          }
        },
        axisLabel: {
          // rotate: -45,
          color: '#D4D4D4'
        }
      },
      yAxis: [{
        type: 'value',
        name: '利用率（%）',
        // inverse: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#D4D4D4'
          }
        },
        axisLabel: {
          color: '#D4D4D4'
        }
      }],
      series: [{
        name: '内存利用率',
        type: 'bar',
        data: arrY,
        itemStyle: {
          // color: '#1DB0B8',
          // opacity: 0.68,
          normal: {
           // barBorderRadius: [ 7, 7, 0, 0],
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#07b8d9'},
                /* {offset: 0.5, color: '#62c4db'}, */
                {offset: 1, color: '#86e9fc'}
              ]
            )
            // barBorderRadius: [ 7, 7, 0, 0]
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#86e9fc'},
                /*  {offset: 0.7, color: '#62c4db'}, */
                {offset: 1, color: '#07b8d9'}
              ]
            )
          }
        },
        barMaxWidth: 20
      }]
    }
    return option
  },
  setInflowOption (arrData, xType) {
    console.log('xType:' + xType)
    if (xType === 'hour') {
      xType = '（时）'
    } else if (xType === 'day') {
      xType = '（天）'
    } else {
      xType = '（分）'
    }
    let arrY = []
    let arrX = arrData[0].timepoint
    let len = arrData.length
    let legends = []
    for (var i = 0; i < len; i++) {
      let arr1 = arrData[i].inputVal
      let arr2 = arrData[i].outputVal
      let item1 = {
        name: arrData[i].hostName,
        type: 'line',
        data: arr1
      }
      let item2 = {
        name: arrData[i].hostName,
        type: 'line',
        data: arr2
      }
      arrY.push(item1)
      arrY.push(item2)
      legends.push(arrData[i].hostName)
    }
    var option = {
      color: ['#c23531', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
      tooltip: {
        trigger: 'axis',
        transitionDuration: 0
      },
      legend: {
        type: 'scroll',
        data: legends,
        top: 10,
        padding: [5, 10],
        pageIconColor: '#ccc',
        pageIconInactiveColor: '#aaa',
        pageTextStyle: {
          color: '#00c1de'
        },
        // inactiveColor: '#e3e3e3',
        textStyle: {
          color: '#00c1de'
          // color: '#D4D4D4'
        }
      },
      grid: {
        left: '3%',
        // right: '4%',
        bottom: '2%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        name: '时间' + xType,
        boundaryGap: false,
        axisTick: {
          // interval: 1
        },
        data: arrX,
        axisLine: {
          lineStyle: {
            color: '#D4D4D4'
          }
        },
        axisLabel: {
          // rotate: -45,
          color: '#D4D4D4'
          // interval: 1,
          // inside:true
        }
      },
      yAxis: {
        type: 'value',
        name: '流量（KB）',
        axisLine: {
          lineStyle: {
            color: '#D4D4D4'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#333333'
          }
        },
        axisLabel: {
          color: '#D4D4D4'
        }
      },
      series: arrY
    }
    return option
  }
}
