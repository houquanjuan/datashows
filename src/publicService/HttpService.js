/**
 *Created by xiaoxue
 */
import axios from 'axios'
import TipBoxService from './TipBoxService.js'
import loadingBoxService from './loadingBoxService'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = false
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.params = {}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config)
  config.headers = {
    'Content-type': 'application/x-www-form-urlencoded'
  }
  // 在发送请求之前做些什么
  loadingBoxService.open()
  return config
}, function (error) {
  console.log(error)
  // 对请求错误做些什么
  loadingBoxService.close()
  TipBoxService.open('error', error.message)
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.log(response)
  // 对响应数据做点什么
  loadingBoxService.close()
  const res = response.data
  if (res && (response.status === 200 || response.code === 200 || response.statusText === 'OK')) { // 判断请求成功的条件
    console.log(res)
    return res
  } else {
    TipBoxService.open('error', res.message)
    return Promise.reject(res.message)
  }
}, function (error) {
  // 对响应错误做点什么
  loadingBoxService.close()
  TipBoxService.open('error', error.message)
  return Promise.reject(error)
})

export default {
  getLink: function (url, params) {
    return axios({
      url: url + '?time=' + (new Date().getTime()), // 防止get请求在ie下缓存
      method: 'get',
      data: params
    })
  },
  postLink: function (url, params) {
    return axios({
      url: url,
      method: 'post',
      data: 'params=' + JSON.stringify(params)
    })
  },

  uploadFile: function (url, file) {
    return axios({
      method: 'post',
      url: url,
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // let formData = new FormData();
    // formData.append("fileid", file);
    // if (window.FormData) {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open('POST', url);
    //   xhr.onload = function() {
    //     if (xhr.status === 200) {
    //       let obj = JSON.parse(xhr.response);
    //       callback(obj);
    //     } else {
    //       LoadingBoxService.close();
    //       TipBoxService('error', '访问异常，请重试！');
    //     }
    //   }
    //   xhr.send(formData);
    // } else {
    //   loadingBoxService.close();
    //   TipBoxService('error', "不支持H5文件上传");
    // }
  }
}
