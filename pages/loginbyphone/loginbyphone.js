// pages/loginbyphone/loginbyphone.js
var util = require("../../utils/util.js");
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phonenumber:'',
    textflag:false,
    textcount:'',
    btflag:false,
    timeCount:0,
    counting: false,
    counttext:'获取验证码',
  },
  /**
   * 获取input的大小
   */
  getphone:function(e){
    var number;
    var flag;
    if (e.detail.cursor==11){
      flag=true
       number = e.detail.value
    }
    else {
      flag=false
      number=''
    }
    this.setData({
      textflag:flag,
      textcount: e.detail.cursor,
      phonenumber:number
    })
  },
  getcheck:function(e){
    var flag;
    var textcount = this.data.textcount
      if(e.detail.cursor == 6 && textcount==11) {
      flag = true
    }
    else {
      flag = false
    }
    this.setData({
      btflag: flag
    })
  },
  /**
   * 倒计时，发送验证码
   */
  timeout:function(){  
    var count=60
    var that=this  
    var textcount = this.data.textcount
    if (textcount==11){
    var myVar = setInterval(function () {
      if (count > 0) {
        count--,
        that.setData({
          counttext: count+'秒',
          textflag:false,
        })
      }
      else {
        clearInterval(myVar)
          that.setData({
            counttext: '获取验证码'
          })
      }
      }, 1000);  
    } else { 
      return;
    }
  },
  /**
   * login
   */
  login:function(){
   var value={
      num:this.data.phonenumber
    }
    request.requestpost(api.posttlogin, value).then(res => {
      wx.setStorage({
        key: 'user',
        data: res.user,
      })
      wx.navigateBack({
      }) 
    }).catch(() => {

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.setData({
      clearTimer: true
    });
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

  }
})