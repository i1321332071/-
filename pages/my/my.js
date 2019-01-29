// pages/order/order.js
//获取app实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
 user:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
        
  },
  /**
   * 登录注册
   */
  gologin:function(e){
    wx:wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  goregist:function(e){
    wx: wx.navigateTo({
      url: '/pages/loginbyphone/loginbyphone',
    })
  },
  handleContact(e) {
    console.log(e)
    
  },
/**
 * tuichu 
 */
removelogin:function(){
  var that=this
  wx.removeStorage({
    key: 'user',
    success(res) {
      that.onShow();
    }
  })
  
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    wx.getStorage({
      key: 'user',
      success: function(res){
        that.setData({
          user:res.data
        })
      },
      fail:function(){
        that.setData({
          user: ''
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 设置个人地址
   */
  gomylocation:function(){
    wx:wx.navigateTo({
      url: '/pages/mylocation/mylocation'
    })
  }
})