// pages/mylocation/mylocation.js
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '', //用户的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showNavigationBarLoading()
    request.requestget(api.getaddress).then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        address: res.addresslist
      })
    }).catch(() => {

    })

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

  },
  /**
   * 跳转增加地址
   */
  addlocation: function() {
    wx: wx.navigateTo({
      url: '/pages/addlocation/addlocation',

    })
  },
  /**
   * 修改地址
   */
  edit: function(e) {
    var addressid = e.currentTarget.dataset.aid  
    wx: wx.navigateTo({
      url: '/pages/deletelocation/deletelocation?addressid=' + addressid,
    })
  }
})