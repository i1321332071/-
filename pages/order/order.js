var api = require("../../api/api.js");
var request = require("../../utils/request.js");
// pages/my/my.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: '', //用户信息
    tabs: ["全部订单", "待评价", "退款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    allorderlist:'',//全部订单
    orderbyevaluate:'',//待评价订单
    orderbyrefund:'', //退款订单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 选择，全部订单，待评价，退款
   */
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id == 0) {
      this.getallorderlist()
    } else if (e.currentTarget.id == 1) {
      this.getorderbyevaluate()
    } else if (e.currentTarget.id == 2) {
      this.getorderbyrefund()
    }
  },
  /**
   * 去评价
   */
  goevaluated: function(e) {
    var id = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: "/pages/evaluated/evaluated?orderid=" + id
    });
  },
  /**
   * 详情
   */
  goorderdetails: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: "/pages/orderdetails/orderdetails?orderid="+id
    });
  },
  /**
   * 再来一单
   */
  rebuy: function(e) {
    console.log(e.currentTarget.dataset.storeid)
    var name = e.currentTarget.dataset.storename
    var id = e.currentTarget.dataset.storeid
    wx.navigateTo({
      url: "/pages/store/store?name=" + name+'&id='+id
    });
  },
  /**
   * 获取数据，赋值
   */

     
  //获取全部数据
  getallorderlist: function() {
    wx.showNavigationBarLoading()
    var that=this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user: res.data
        })
      },
    })
    var phonenumber = that.data.user.phonenumber
    request.requestget(api.getallorderlist + '?phonenumber=' + phonenumber).then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        allorderlist:res.orderlist
      })
    }).catch(() => {

    })
  },
  //获取待评价数据
  getorderbyevaluate: function() {
    wx.showNavigationBarLoading()
    var that = this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user: res.data
        })
      },
    })
    var phonenumber = that.data.user.phonenumber
    request.requestget(api.getorderbyevaluate + '?phonenumber=' + phonenumber).then(res => {
      wx.hideNavigationBarLoading()
      
      this.setData({
        orderbyevaluate:res.orderlist
      })
    }).catch(() => {

    })
  },
  //获取退款数据
  getorderbyrefund: function() {
    wx.showNavigationBarLoading()
    var that = this
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          user: res.data
        })
      },
    })
    var phonenumber = that.data.user.phonenumber
    request.requestget(api.getorderbyrefund + '?phonenumber=' + phonenumber).then(res => {
      wx.hideNavigationBarLoading()
  this.setData({
    orderbyrefund:res.orderlist
  })
    }).catch(() => {

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
    var that = this;
    //获取系统信息来定位选择器的位置，
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getallorderlist()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      activeIndex: 0
    })
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


})