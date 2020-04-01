/**
 * Created by dell on 2017/6/26.
 */
import $ from 'jquery'
export default {
  timer: null,
  open: function (type, text) {
    if ($('#publicTipBox').length > 0) {
      if (this.timer != null) {
        clearTimeout(this.timer)
      }
      $('#publicTipBox').stop().remove()
    }
    var color = type === 'success' ? '#5cb85c' : '#DC6547'
    var htmlStr = '<div style="z-index:999999;background-color:' + color + '" class="publicTipBox" id="publicTipBox">' +
      '<span class="publicTipText"> ' + text + '</span>' +
      '</div>'
    $('body').append(htmlStr)
    this.timer = setTimeout(function () {
      $('#publicTipBox').fadeOut(1000, function () {
        $('#publicTipBox').remove()
      })
    }, 3000)
  }
}
