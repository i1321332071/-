// pages/addlocation/addlocation.js
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    useraddress: '',
    userphone: '',
    addressname: '',
    sex: '',
    chose_sex: [{
      name: '先生',
      id: 0,
     checked: ''
    }, {
      name: '女士',
      id: 1,
        checked:''
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var addressid = '';
    if (options.addressid) {
      addressid = options.addressid
    }
    request.requestget(api.getdeletelocation + '?addressid=' + addressid).then(res => {
      this.setData({
        username: res.address.username,
        useraddress: res.address.useraddress,
        addressname: res.address.addressname,
        sex: res.address.sex,
        userphone: res. address.userphone
      })
    }).catch(() => {})

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
  /**
   * 用户名
   */
  usernameinput: function(e) {
    console.log(e)
    this.setData({
      username: e.detail.detail.value
    })
  },
  /**
   * 手机号
   */
  userphoneinput: function(e) {
    this.setData({
      userphone: e.detail.detail.value
    })
  },
  /**
   * 性别
   */
  radioChange: function(e) {
    if (e.detail.value == 1) {
      this.setData({
        sex: 1
      })
    } else {
      this.setData({
        sex: 0
      })
    }
  },
  /**
   * 详细地址
   */
  useraddressinput: function(e) {
    this.setData({
      useraddress: e.detail.detail.value
    })
  },
  /**
   * 跳转选择地址
   */
  gochose_location: function() {

    var that = this
    wx.chooseLocation({
      success: function(res) {
        that.setData({
          useraddress: res.name
        })
      },
      fail: function() {},
      complete: function() {},
    })

  },
  /**
   * 保存信息
   */
  preserve: function() {
    var username = this.data.username
    var userphone = this.data.userphone
    var useraddress = this.data.useraddress
    var addressname = this.data.addressname
    var sex = this.data.sex
    // if (!username||!userphone || !useraddress || !addressname){
    //   if (!username){
    //     wx.showToast({
    //       title: '请填写用户名',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else if (!userphone){
    //     wx.showToast({
    //       title: '请填写手机号',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else if (!useraddress){
    //     wx.showToast({
    //       title: '请填写收货地址',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else if (!addressname){
    //     wx.showToast({
    //       title: '请填写门牌号',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    //   else{
    //     wx.showToast({
    //       title: '发生错误，请重试',
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // }
    // else{
    var msg = {
      username: username,
      userphone: userphone,
      useraddress: useraddress,
      addressname: addressname,
      sex: this.data.sex
    }
    console.log(msg)
    wx:wx.navigateBack({})
    var addressmsg = JSON.stringify(msg)
  },
  delete:function(){
        wx: wx.navigateBack({})   
  },
  delete1: function () {
    wx.showToast({
      title: '删除成功',
      duration: 1000,
      
    })
  setTimeout(
    this.delete
  , 1200)
  },
  preserve1: function () {
    wx.showToast({
      title: '保存成功',
      duration: 1000,

    })
    setTimeout(
      this.preserve
      , 1200)
  },
})