// pages/login/login.js
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据,手机号获取
   */
  data: {
    shopcar_switch: true,
    user: '',
  },

  chose_mask: function() {
    this.setData({
      shopcar_switch: false,
    })
    var value = {
      code: 123
    }
    request.requestpost(api.posttlogin, value).then(res => {
      this.setData({
        user: res.user
      })
    }).catch(() => {

    })
  },
  close_mask: function() {
    this.setData({
      shopcar_switch: true,
    })
    wx.showToast({
      title: '提示：不允许则无法登陆',
      icon: 'none',
      duration: 2000
    })
  },
  close_mask1: function() {
    wx.setStorage({
      key: 'user',
      data: this.data.user,
    })
    this.setData({
      shopcar_switch: true,
    })
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.login({
      success: res => {
        console.log(res.code)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})