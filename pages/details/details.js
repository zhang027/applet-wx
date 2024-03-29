const util = require('../../utils/util.js');
const { $Toast } = require('../../dist/base/index');
var id=1;
Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    id=options.id;
    console.log('id='+id);
    console.log('options.id=' + options.id)
    console.log(options.id);
    that.getDetails(id);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '生活志',
      path: '/pages/details/details?id='+id
    }
  },
  wxmlTagATap(e) {
    console.log(e);
  },
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.onLoad();
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      //停止当前页面下拉刷新。
      wx.stopPullDownRefresh()
    }, 1000)
  },
  getDetails:function(id){
    wx.request({
      url: util.basePath + '/api/posts/'+id,
      success: res => {
        console.log(res);
        if(res.data.code==200){
            wx.stopPullDownRefresh();
          this.setData({ 
            postTitle: res.data.result.postTitle, 
            postViews: res.data.result.postViews,
            postContentMd: res.data.result.postContentMd,
            postDate: util.getDateDiff(res.data.result.postDate )             
            });
        }else{
            $Toast({ content: '请求错误', type: 'error' });
        }
      }
    })
  }
})