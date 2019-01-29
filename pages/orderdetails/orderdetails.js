var api = require("../../api/api.js");
var request = require("../../utils/request.js");
// pages/orderdetails/orderdetails.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

    /**
     * 页面的初始数据
     */
    data: {
      tabs: ["订单状态", "订单详情"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      //订单详情
      orderdetail:'',//订单详情数据
      //进度条 订单状态
      wancheng: true,
      current: '',
      title: ['订单提交成功', '订单已支付', '等待商户接单', '商家已确认订单', '配送中', '订单已完成'],
      content: ['单号:152322199612080719，请耐心等待', '', '十分钟内商家未接单，将自动取消', '正在为您准备商品', '骑手正在路上，请耐心等待', '任何意见和吐槽，欢迎联系我们 '],
      ordermap1: ['', '', '', '', '', ''],
      first: {
        code: true,
        date: '11:04'
      },
      second: {
        code: true,
        date: '12:04'
      },
      third: {
        code: true,
        date: '13:04'
      },
      fourth: {
        code: true,
        date: '14:04'
      },
      fifth: {
        code: true,
        date: '15:04'
      },
      sixth: {
        code: true,
        date: '16:04'
      },
      //订单详情相关数据
      orderlist: [{
          name: '草莓布丁',
          count: '1',
          price: '10'
        },
        {
          name: '草莓布丁',
          count: '1',
          price: '5.5'
        },
        {
          name: '草莓布丁',
          count: '3',
          price: '15.5'
        },
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      wx.showNavigationBarLoading()
     
      console.log("进入onload")
      var that = this;
      var ordermap = new Map();
      var info = that.data.ordermap1;
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
      // 模拟后台的数据，map对象
      ordermap.set('1st', that.data.first)
      ordermap.set('2nd', that.data.second)
      ordermap.set('3rd', that.data.third)
      ordermap.set('4th', that.data.fourth)
      ordermap.set('5th', that.data.fifth)
      ordermap.set('6th', that.data.sixth)
      info[0] = ordermap.get('1st'),
        info[1] = ordermap.get('2nd'),
        info[2] = ordermap.get('3rd'),
        info[3] = ordermap.get('4th'),
        info[4] = ordermap.get('5th'),
        info[5] = ordermap.get('6th')
      that.setData({
        // current:ordermap.size,
        current: 5,
        ordermap1: info,

      })
      //获取订单详情数据
      if (options.orderid) {
        var orderid = options.orderid
      }
      request.requestget(api.getorderdetail + '?orderid=' + orderid).then(res=>{
        wx.hideNavigationBarLoading()
        this.setData({
          orderdetail:res.orderdetail
        })
      }).catch(()=>{})
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

    },
    tabClick: function(e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    handleClick() {
      const addCurrent = this.data.current + 1;
      const current = addCurrent > 6 ? 0 : addCurrent;
      this.setData({
        'current': current
      })
    },
    mackphone:function(){
      var orderdetail = this.data.orderdetail
      wx.makePhoneCall({
        phoneNumber: orderdetail.storephone // 仅为示例，并非真实的电话号码
      })
    }
 

  })