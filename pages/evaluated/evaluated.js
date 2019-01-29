// pages/evaluated/evaluated.js
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //订单信息
    evaluated:'',     //订单信息
    // 评论的星星
    starIndex: 5,                                           //星星的数量
    startext: ['', '非常差', '差', '一般', '好', '非常好' ],  //星星的代表字体
    // 文本域的字数
    evcomment:'',
    //图片评论
    files: [],
    //标签
    labellist: [{                   //标签选择与否
        text: '味道赞',
        flag:false
      },
      {
        text: '食材新鲜',
        flag: false
      },
      {
        text: '轻食主义',
        flag: false

      },
      {
        text: '包装完美',
        flag: false
      },
      {
        text: '分量足',
        flag: false
      },
      {
        text: '商家服务好', 
        flag: false
      },
    ],
    submit:false
  },
  /**
   * 选择点赞
   */
  chooseyes(e) {
    var info = this.data.evaluated;
    info.list[e.currentTarget.dataset.index].yes = e.currentTarget.dataset.index;
    info.list[e.currentTarget.dataset.index].no = 999;
    info.list[e.currentTarget.dataset.index].index = e.currentTarget.dataset.index;
    this.setData({
      evaluated: info
    })
  },
  chooseno(e) {
    var info = this.data.evaluated;
    info.list[e.currentTarget.dataset.index].no = e.currentTarget.dataset.index;
    info.list[e.currentTarget.dataset.index].yes = 999;
    info.list[e.currentTarget.dataset.index].index = e.currentTarget.dataset.index;
    this.setData({
      evaluated: info
    })
  },
  /**
   * 选择标签
   */
  chooselabel(e) {
    var that = this;
    var info = that.data.labellist;
    info[e.currentTarget.dataset.index].flag = !info[e.currentTarget.dataset.index].flag;
    that.setData({
      labellist: info,
    })
    console.log(that.data.labellist)
  },
  /**
   * 选择星星函数
   */
  onChange(e) {
    const index = e.detail.index;
    this.setData({
      starIndex: index
    })
  },
  /**
 * 获取textarea的值
 */
  evcomment: function (e) {

      this.setData({
        evcomment: e.detail.value
      })
  },
  /**
   * 上传查看删除图片的函数
   */
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
    console.log(that.data.files)
  },
  previewImage: function(e) {
    var that = this;
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
    console.log(that.data.files)
  },
  /**
   * 提交
   */
  submit:function(){
    var evaluated = this.data.evaluated
    var starIndex = this.data.starIndex
    var evcomment = this.data.evcomment
    var labellist = this.data.labellist
    var files = this.data.files
    var labellist1=[];
    var list = []
    //传标签
    labellist.forEach(function(item){
      if(item.flag==true){
        labellist1.push(item.text)
      }  
    })
   //传点赞与否
    evaluated.list.forEach(function(item){
      if(item.yes==item.index){
        item.flag=true
        var value={
          name:item.name,
          flag:item.flag
        }
        list.push(value)
      }
      else{
        item.flag = false
        var value = {
          name: item.name,
          flag: item.flag
        }
        list.push(value)
      }
    })
    var sublist=JSON.stringify({
      storeid: evaluated.storeid,
      starIndex:starIndex,
      evcomment: evcomment,
      files: files,
      labellist: labellist1,
      list: list, 
    })
    
    request.requestpost(api.postevaluated,sublist).then(res=>{
      this.setData({
        submit:true
      })
    }).catch(()=>{
      console.log(0)
    })
  },
  /**
   * 评价完成之后返回
   */
  goorder:function(){
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id;
    if(options.orderid){
       id = options.orderid
    }
    request.requestget(api.getevaluated+'?orderid='+id).then(res=>{
      //console.log(res.evaluated)
      var evaluated = res.evaluated
      
      evaluated.list.forEach(function(item){
        item.yes=999,
        item.no=999
      })
      console.log(evaluated)
      this.setData({
        evaluated: evaluated
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

  }
})