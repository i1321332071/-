var home = require("../../utils/home.js");
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
//腾讯地图 逆地址解析
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'E3UBZ-PFDWW-4BFRY-OP7CE-WLN56-SJFNM' // 必填
});  

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    offline:false,
    aaa:'',
    //全局数据
    addressname: '',  //坐标名字
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    searchValue: '麻辣烫',                                //搜索框中的数据
    //common文件夹的数据
    hidden1:true,              //综合排序的开关
    hidden2:true,              //筛选的开关 
    selected:0,                //导航的选择 排序，销量， 速度 减配送，筛选
    sortSelected:'综合排序',    //综合排序的默认条件
    //筛选的列表数据
    characteristicList:'',//商家特色数据
    avepricelist:'',      //人均价数据
    discountlist:'',      //优惠活动数据
    condition: [],         //筛选条件
    conditioncount: '',   //筛选条件数量
    selectcondition:[],   //筛选条件>优惠活动
    selectcondition1: [],   //筛选条件>人均价
    selectcondition2: [],   //筛选条件>商家特色
    maskList1: '',        //排序的数据。mask1
    icon_top: '',      //筛选小红点top
    // 轮播数
    swiperList: [
      {
        src:'../../images/home_3.jpg'
      },
      {
        src: '../../images/home_4.jpg'
      }
    ],   //轮播数据
    restaurant:'',    //店铺数据
  },
  /**
   * 事件处理函数
   * */
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    //获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          icon_top: 630 / (750 / res.windowWidth),
        });
      }
    });

    qqmapsdk.reverseGeocoder({     
      success: function (res) {//成功后的回调
        that.setData({
          addressname: res.result.formatted_addresses.recommend
            })
      }
    })
    //网页版js获取位置
    //获取位置
    // wx.getLocation({
    //   success: function(res) { 
    //     var location=res.latitude+','+res.longitude
    //     wx.request({
    //       type: 'gcj02',
    //       url: 'http://apis.map.qq.com/ws/geocoder/v1/',
    //       data:{
    //         "key":"E3UBZ-PFDWW-4BFRY-OP7CE-WLN56-SJFNM",
    //         "location": location
    //       },
    //       method:'GET',
    //       success:function(res){
    //         that.setData({
    //           addressname: res.data.result.formatted_addresses.recommend
    //         })
    //       }
    //     })
    //   },
    // })
  //获取店铺信息
    request.requestget(api.getrestaurant).then(function (res) {
        // console.log("resolve：",res)  
        that.setData({
          offline:false,
          restaurant: res.restaurant
        })
    }).catch(() => {
      this.setData({
      offline:true
      })
    })
  //静态数据赋值
  this.setData({
    characteristicList: home.characteristicList,
    avepricelist: home.avepricelist,
    discountlist: home.discountlist,
    maskList1: home.maskList1,
    //swiperList: home.swiperList
  })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 点击选择准确定位
   */
  golocation:function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          addressname: res.name
        })
      },
      fail: function () { },
      complete: function () { },
    })
  },
  /**
   * 点击搜索框触发，跳转至搜索pages
   */
  gosearch: function () {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },
  /**
   * 点击店铺触发。跳转至商户
   */
  gostore:function(e){
    var name = e.currentTarget.dataset.storename
    var id = e.currentTarget.dataset.storeid
    wx.navigateTo({
      url: "/pages/store/store?name=" + name+'&id='+id
    });
  },
  /**
   * common 文件夹的触发方法
   */
  //点击综合排序触发，页面上移，遮幕层，综合排序页打开，
  onOverallTag:function(e){
    //判断页面偏移量
    var scrolltop="";
    var flag="";
    if (e.currentTarget.offsetTop > 200) { scrolltop= e.currentTarget.offsetTop-88}
    else {
      scrolltop = 336 - 150
    }
    wx.pageScrollTo({
      scrollTop: scrolltop,
      duration: 200,
      success: this.setData({
        hidden2: true,
        hidden1: false,
        selected: e.currentTarget.dataset.index,     
      })
    })
  },
  //点综合排序页的选项改变内容
  setsortSelected: function (e) {
    var that = this;
    console.log(e)
    this.setData({
      sortSelected: that.data.maskList1[e.currentTarget.dataset.index].sort
    })
  },
//点击 销量高，速度快 减配送触发，字体变粗，页面上移
  onTapTag:function(e){
    //判断页面偏移量,负责动作
    var scrolltop = "";
    if (e.currentTarget.offsetTop > 200) { scrolltop = e.currentTarget.offsetTop - 88 }
    else {
      scrolltop = 336 - 150
    }
    //负责实现字体的变化
    wx.pageScrollTo({
      scrollTop: scrolltop,
      duration: 200,
      success: 
      this.setData({
        hidden2: true,
        selected: e.currentTarget.dataset.index,
        
      })
    });
    //实现向后台发送请求
    request.requestget(api.getcondition + '?condition=' + e.currentTarget.dataset.index).then(res=>{
      this.setData({
        offline: false,
        restaurant: res.restaurant
      })
    }).catch(()=>{
      this.setData({
        offline: true
      })
    })
  },
//点筛选触发，字体变粗，页面上移，遮幕层，综合排序页打开，
  onFilter:function(e){
    //判断页面偏移量
    var scrolltop = "";
    if (e.currentTarget.offsetTop > 200) { scrolltop = e.currentTarget.offsetTop - 88 }
    else {
      scrolltop = 336 - 150
    }
    wx.pageScrollTo({
      scrollTop: scrolltop,
      duration: 200,
      success: this.setData({
        selected: e.currentTarget.dataset.index,
        hidden2:false
      })
    });
  },
  //关闭综合排序的页面
  offmask1:function(){
     this.setData({
      hidden1: true
      
     })
  },
  //点击遮幕层触发，关闭筛选页面
  offmask2: function () {
   
    this.setData({
      hidden2: true
    })
  },
//点击完成触发，关闭筛选
  offmask_: function (e) {
    var selectcondition = this.data.selectcondition
    var selectcondition1 = this.data.selectcondition1
    var selectcondition2 = this.data.selectcondition2
    var list = []
    selectcondition.forEach(function(item){
      list.push(item)
    })
    selectcondition1.forEach(function (item) { 
      list.push(item)
    })
    selectcondition2.forEach(function (item) { 
      list.push(item)
    })
    console.log(list)
    this.setData({
      hidden2: true,
      condition: list
    })
  },
  //清空筛选条件
  clear: function (e) {
    var selectcondition = this.data.selectcondition
    var selectcondition1 = this.data.selectcondition1
    var selectcondition2 = this.data.selectcondition2
    var conditioncount = this.data.conditioncount
    var info = this.data.characteristicList 
    var info1 = this.data.avepricelist
    var info2 = this.data.discountlist
    info.forEach(function(item){
      item.flag=false
    })
    info1.forEach(function (item) {
      item.flag = false
    })
    info2.forEach(function (item) {
      item.flag = false
    })
     selectcondition = []
     selectcondition1 = []
     selectcondition2 = []
    conditioncount = ''
    this.setData({
      selectcondition: selectcondition,
      selectcondition1: selectcondition1,
      selectcondition2: selectcondition2,
      conditioncount: conditioncount,
      characteristicList: info ,
      avepricelist: info1,
      discountlist: info2,
    })
  },
  //点击人均价中的条件触发
  aveprice_select:function(e){
    var info = this.data.avepricelist
    var selectcondition = this.data.selectcondition1
    var name = e.currentTarget.dataset.addressname
    var index = e.currentTarget.dataset.aid
    var list = []
    //控制css
    info[index].flag = !info[index].flag
    info.forEach(function(item){
      if (item.avepricelist_num!=index){
        item.flag = false
      }
    })
    selectcondition = []
    info.forEach(function (item) {
      if(item.flag==true){
        selectcondition[0]=item
      }
    })
    this.setData({
      avepricelist:info,
      selectcondition1: selectcondition,
      conditioncount: Number(selectcondition.length) + Number(this.data.selectcondition.length) + Number(this.data.selectcondition2.length)
    })
  },
  //点击商家特色中的条件触发
  characteristic_select:function(e){
    var selectcondition = this.data.selectcondition2
    var index = e.currentTarget.dataset.cid
    var name = e.currentTarget.dataset.cname
    var info = this.data.characteristicList
    var list = []
    var value = {
      characteristicList_num: index,
      name: name,
      flag: true
    }
    //控制css
    info[index].flag=!info[index].flag
    if (selectcondition.length > 0) {
      selectcondition.forEach(function (item) {
        list.push(item.characteristicList_num)
      })
      if (list.indexOf(index) == -1) {
        selectcondition.push(value)
      }
      else {
        selectcondition.splice(list.indexOf(index), 1)
      }
    }
    else {
      selectcondition.push(value)
    }
    this.setData({
      characteristicList:info,
      selectcondition2: selectcondition,
      conditioncount: Number(selectcondition.length) + Number(this.data.selectcondition1.length) + Number(this.data.selectcondition.length)
     
    })
    },
  //点击优惠活动中的条件触发
  discount_select:function(e){
    var selectcondition = this.data.selectcondition
    var info = this.data.discountlist
    var index = e.currentTarget.dataset.did
    var name = e.currentTarget.dataset.dname
    var list=[]
    var value={
      discountnum: index,
      name:name,
      flag:true
    }
    //控制css
    info[index].flag = !info[index].flag
    if (selectcondition.length > 0){
      selectcondition.forEach(function(item){
        list.push(item.discountnum)
      })
      if (list.indexOf(index)==-1){
        selectcondition.push(value)
      }
      else{
        selectcondition.splice(list.indexOf(index), 1)
      }
    }
    else{
      selectcondition.push(value)
    }
    this.setData({
      discountlist: info,
      selectcondition: selectcondition,
      conditioncount: Number(selectcondition.length) + Number(this.data.selectcondition1.length) + Number(this.data.selectcondition2.length)
    })
  }
})
