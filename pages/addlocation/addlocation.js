// pages/addlocation/addlocation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    useraddress: '',
    userphone: '',
    addressname: '',
    sex: 0,

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
        sex: '女士'
      })
    } else {
      this.setData({
        sex: '先生'
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
        console.log(res)
        that.setData({
          addressname: res.name
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
      sex: sex
    }
    var addressmsg = JSON.stringify(msg)
    // wx:wx.navigateTo({
    //   url: '/pages/mylocation/mylocation?addressmsg='+addressmsg,
    // })
    console.log(msg)
    wx: wx.navigateBack({})
    
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