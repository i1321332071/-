var store = require("../../utils/store.js");
var api = require("../../api/api.js");
var request = require("../../utils/request.js");
// pages/store/store.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //全局数据
    restaurant: '', //店铺信息
    storeid: '',
    offline: '',
    shopcar_height: '', //购物车的高度
    widthcoefficient: '', //rpx px转换系数
    listheight: 200, // 动态赋值店铺首页高度s
    winheight: '', //根据机型获取高度
    activeIndex: 0, // 下划线
    sliderOffset: 0,

    //左侧栏的数据
    navlist: '', //菜单 评价 商家
    swiperid: '', //菜单评价商家 的id
    curId: '1', //选项的flag 代表点击之后的选项
    menulist: '', //左侧list的数据结构

    //右侧的数据
    toView: '', //滚动的flag 控制滚动
    menu_name: '热销', //右侧的title
    foodlist: '', //右侧商品的lsit

    //购物车相关的数据
    goods: [], //点击购买的产品列表
    shopcar: '', //备用，向后台发送的购物车数据
    shopcar_switch: true, //开关控制购物车
    //foot相关数据
    baseprice: 20, //起送价格
    totalprice: 0, // 总价格
    totalcount: 0, //总数量
    disparity: '', //差价
    //物品详情数据
    detail_switch: false, //详情页面的开关
    operation_count: '', //被点击物品的数量
    operation: { //被点击物品
      id: '', //独有的id
      count: '', //数量
      price: '', //单价
      img: '', //图片
      name: '', //名字
      // yueshou:'',
      // zan:'',
      // zhekou:'',
      // xiangou:'',
      // jieshao:'',
    },
    /**
     * swiper-item2的数据
     */
    starIndex: 3.4,
    item2_height: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    var title = '';
    var menulist;
    var foodlist = [];
    var that = this;
    // 把从其他页面，传的店铺id赋值
    if (options.name) {
      title = options.name;
    }
    if (options.id) {
      //storeid = options.id;
      that.setData({
        storeid: options.id
      })
    }
    // 请求分类，商品信息，根据店铺id
    request.requestget(api.getstore + '?storeid=' + that.data.storeid).then(function(res) {
      wx.hideNavigationBarLoading()
      menulist = res.menulist
      menulist.forEach(function(item) {
        var value = {
          food: item.food,
          id: item.id
        }
        foodlist[foodlist.length] = value
      })
      //对foodlist添加flag，count赋值
      foodlist.forEach(function(item, i) {
        item.food.forEach(function(one, t) {
          one.flag = true,
            one.count = 0
        })
      })
      that.setData({
        menulist: menulist,
        foodlist: foodlist,
        offline: false,
      })
    }).catch(() => {
      wx.hideNavigationBarLoading()
      console.log(1)
      that.setData({
        offline: true
      })
    })
    // 请求店铺信息根据店铺id
    request.requestget(api.getrestaurant + '?storeid=' + that.data.storeid).then(function(res) {
      console.log("123：", res.restaurant_)
      that.setData({
        offline: false,
        restaurant: res.restaurant_
      })
    }).catch(() => {
      this.setData({
        offline: true
      })
    })

    that.setData({
      navlist: store.setnavlist, //踩点，评价，商家 （页面静态数据）
      title: title
    })
    // console.log(this.data.foodlist)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderOffset: res.windowWidth * 0.8 / that.data.navlist.length * that.data.activeIndex,
          winheight: res.windowHeight,
          widthcoefficient: 750 / res.windowWidth,
          shopcar_height: res.windowHeight * 0.39 - 80 / (750 / res.windowWidth),
          item2_height: res.windowHeight - 150 / (750 / res.windowWidth)
          //0.39 为shopcar的总高度，88为title的rpx
        });

      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: `${that.data.title}`,
      success: function(res) {

      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // wx.hideNavigationBarLoading()     
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
  onShareAppMessage: function() {},
  //控制 菜单 评价 商家 的切换
  tabclick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      swiperid: e.currentTarget.id,
    });
  },
  swiperchose: function(e) {
    this.setData({
      swiperid: e.detail.current
    })

  },
  /**
   *点击左侧，控制右侧滑动
   */
  clickMenu: function(e) {
    var id = e.currentTarget.dataset.id;
    var name = e._relatedInfo.anchorTargetText;
    this.setData({
      curId: id,
      toView: id,
      menu_name: name,
    })
  },

  /**
   * 滑动右侧，控制左侧的选择
   */
  scroll: function(e) {
    // console.log(e.detail.scrollTop, this.data.widthcoefficient)
    var scrolltop = e.detail.scrollTop
    var h = 0
    var selectedid;
    var curId = this.data.curId
    var coefficient = this.data.widthcoefficient
    this.data.foodlist.forEach(function(item, i) {
      var list_height = (item.food.length * 208) / coefficient
      // console.log('移动了'+scrolltop)
      // console.log('高度h为' + h)

      if (scrolltop >= h) {
        selectedid = item.id
      }
      h += list_height - 5;
    });
    if (selectedid != curId) {
      this.setData({
        curId: selectedid
      })
    }


  },
  /**
   * 购物车相关方法,点击+号
   */
  join: function(e) {

    var price = e.target.dataset.price
    var foodlist = this.data.foodlist
    var info = this.data.goods
    var id = e.target.dataset.goodsid
    var list = []
    var totalprice = this.data.totalprice
    var disparity = this.data.disparity
    var baseprice = this.data.baseprice
    var count = 0
    var value = {
      id: id,
      name: e.target.dataset.goodsname,
      count: 1,
      price: (e.target.dataset.price).toFixed(2)
    }
    //控制总价格
    totalprice = (price * 10000 + totalprice * 10000) / 10000
    //控制显示,wxml,数量
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        if (id == one.id) {
          one.flag = false
          one.count++;
        }
      })
    })
    // 控制购物车数量方法
    if (info.length >= 1) {

      info.forEach(function(item, i) {
        list.push(item.id)
      })
      if (list.indexOf(id) == -1) {
        info.push(
          value
        )
      } else {
        info[list.indexOf(id)].count++
      }
    } else {
      info.push(
        value
      )
    }
    disparity = (baseprice - totalprice).toFixed(2)
    this.setData({
      goods: info,
      foodlist: foodlist,
      totalprice: totalprice.toFixed(2),
      disparity: disparity
    })

  },
  /**
   * 控制购物车相关方法，减号操作
   */
  delete: function(e) {
    var price = e.target.dataset.price
    var totalprice = this.data.totalprice
    var foodlist = this.data.foodlist
    var info = this.data.goods
    var id = e.target.dataset.goodsid
    var name = e.target.dataset.goodsname
    var list = []
    var disparity = this.data.disparity
    var baseprice = this.data.baseprice
    //控制总价格
    totalprice = totalprice - price
    //控制wxml的 属于该id的count
    foodlist.forEach(function(item, i) {
        item.food.forEach(function(one, t) {
          if (id == one.id) {
            if (one.count > 1) {
              one.count--;
            } else if (one.count = 1) {
              one.count--;
              one.flag = true
            }
          }
        })
      }),
      // 改变购物车数据
      info.forEach(function(item, i) {
        if (item.id == id) {
          info.forEach(function(item, i) {
            list.push(item.id)
          })
          // 判断是否还有数量 ，若为0  则从购物车删除
          if (item.count > 1) {
            item.count--;
          } else if (item.count = 1) {
            item.count--;
            info.splice(list.indexOf(id), 1)
          }
        }
      })
    disparity = (baseprice - totalprice).toFixed(2)
    //提交数据
    this.setData({
      foodlist: foodlist,
      goods: info,
      totalprice: totalprice.toFixed(2),
      disparity: disparity

    })
  },
  /**
   * 控制遮幕层展示,功能：控制开关，设置shopcar中展示单个商品的总价
   * */
  switch_shop: function() {
    var info = this.data.goods
    info.forEach(function(item, i) {
      item.unitprice = (item.count * item.price).toFixed(2)
    })
    this.setData({
      shopcar_switch: false,
      goods: info
    })
  },
  close_mask: function() {
    var info = this.data.goods
    info.forEach(function(item, i) {
      item.unitprice = (item.price / item.count).toFixed(2)
    })
    this.setData({
      shopcar_switch: true,
      goods: info
    })
  },
  /**
   *清空购物车
   */
  clear_shopcar: function() {
    var foodlist = this.data.foodlist
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        one.flag = true,
          one.count = 0
      })
    })
    this.setData({
      goods: [], //清空购物车数据
      foodlist: foodlist, //清空页面数据
      totalcount: 0, //清0 总数
      totalprice: 0 //清0 总价
    })
  },
  /**
   * 购物车栏的+— 方法
   */
  join_shopcar: function(e) {
    var id = e.target.dataset.goodsid
    var info = this.data.goods
    var totalprice = this.data.totalprice
    var foodlist = this.data.foodlist
    var price = e.target.dataset.goodsprice
    var disparity = this.data.disparity
    //控制goods
    info.forEach(function(item) {
        if (item.id == id) {
          item.count++
            item.unitprice = (item.count * item.price).toFixed(2)
        }
      }),
      //控制总价格
      totalprice = Number(totalprice) + Number(price)
    //控制wxml的 属于该id的count
    foodlist.forEach(function(item, i) {
        item.food.forEach(function(one, t) {
          if (id == one.id) {
            if (one.count > 1) {
              one.count++;
            } else if (one.count = 1) {
              one.count++;
              one.flag = true
            }
          }
        })
      }),
      disparity = (this.data.baseprice - totalprice).toFixed(2)
    // console.log(e.target.dataset.goodsprice)
    this.setData({
      goods: info,
      foodlist: foodlist,
      totalprice: totalprice.toFixed(2),
      disparity: disparity

    })

  },
  /**
   * 控制购物车栏的-方法
   *
   */
  delete_shopcar: function(e) {
    var id = e.target.dataset.goodsid
    var info = this.data.goods
    var totalprice = this.data.totalprice
    var foodlist = this.data.foodlist
    var price = e.target.dataset.goodsprice
    var disparity = this.data.disparity

    var list = []
    //控制goods
    info.forEach(function(item, i) {
        if (item.id == id) {
          info.forEach(function(item, i) {
            list.push(item.id)
          })
          // 判断是否还有数量 ，若为0  则从购物车删除
          if (item.count > 1) {
            item.count--;
            item.unitprice = (Number(item.unitprice) - Number(price)).toFixed(2)
          } else if (item.count = 1) {
            item.count--;
            item.unitprice = (Number(item.unitprice) - Number(price)).toFixed(2)
            info.splice(list.indexOf(id), 1)
          }
        }
      }),
      //控制总价格
      totalprice = Number(totalprice) - Number(price)
    disparity = (this.data.baseprice - totalprice).toFixed(2)
    //控制wxml的 属于该id的count
    foodlist.forEach(function(item, i) {
        item.food.forEach(function(one, t) {
          if (id == one.id) {
            if (one.count > 1) {
              one.count--;
            } else if (one.count = 1) {
              one.count--;
              one.flag = true
            }
          }
        })
      }),
      // console.log(e.target.dataset.goodsprice)
      this.setData({
        goods: info,
        foodlist: foodlist,
        totalprice: totalprice.toFixed(2),
        disparity: disparity

      })
  },
  /**
   * 结账
   */
  settlement: function() {
    var totalprice = this.data.totalprice
    var goods = JSON.stringify(this.data.goods)

    if (totalprice >= 20) {
      wx.navigateTo({
        url: "/pages/settlement/settlement?goods=" + goods + '&totalprice=' + totalprice
      });
    }
  },
  /**
   * 物品详情
   */
  detailswitch: function(e) {

    var operation = this.data.operation
    var foodlist = this.data.foodlist
    operation.id = e.currentTarget.dataset.goodsid
    //获取物品详情
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        if (operation.id == one.id) {
          operation.name = one.name;
          operation.img = one.img;
          operation.price = one.price;
          operation.count = one.count
        }

      })
    })
    this.setData({
      detail_switch: true,
      operation: operation
    })
  },
  close_detail: function(e) {
    this.setData({
      detail_switch: false
    })
  },
  /**
   * 物品详情中的增加数量
   */
  detail_push: function(e) {
    var totalprice = this.data.totalprice
    var disparity = this.data.disparity
    var baseprice = this.data.baseprice
    var operation = this.data.operation
    var foodlist = this.data.foodlist
    var info = this.data.goods
    var value = {
      id: operation.id,
      name: operation.name,
      count: operation.count + 1,
      price: (operation.price).toFixed(2)
    }
    //控制总价格
    totalprice = Number(totalprice) + Number(operation.price)
    disparity = (this.data.baseprice - totalprice).toFixed(2)
    //改变foodlist中的数据
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        if (operation.id == one.id) {
          one.count++;
          operation.count = one.count;
          one.flag = false
        }
      })
    })
    // 控制购物车数量方法
    info.push(
      value
    )
    this.setData({
      foodlist: foodlist,
      operation: operation,
      goods: info,
      totalprice: totalprice.toFixed(2),
      disparity: disparity
    })
  },
  detail_join: function(e) {
    var totalprice = this.data.totalprice
    var disparity = this.data.disparity
    var baseprice = this.data.baseprice
    var operation = this.data.operation
    var foodlist = this.data.foodlist
    var info = this.data.goods
    var value = {
      id: operation.id,
      name: operation.name,
      count: operation.count + 1,
      price: operation.price
    }
    //控制总价格
    totalprice = Number(totalprice) + Number(operation.price)
    disparity = (this.data.baseprice - totalprice).toFixed(2)
    //改变foodlist中的数据
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        if (operation.id == one.id) {
          one.count++;
          operation.count = one.count;
        }
      })
    })
    // 控制购物车数量方法
    info.forEach(function(item, i) {
      if (item.id == operation.id) {
        item.count++;
      }
    })
    this.setData({
      foodlist: foodlist,
      operation: operation,
      goods: info,
      totalprice: totalprice.toFixed(2),
      disparity: disparity
    })
  },
  detail_delete: function(e) {
    var totalprice = this.data.totalprice
    var disparity = this.data.disparity
    var baseprice = this.data.baseprice
    var operation = this.data.operation
    var foodlist = this.data.foodlist
    var info = this.data.goods
    var list = []
    //控制总价格
    totalprice = Number(totalprice) - Number(operation.price)
    disparity = (this.data.baseprice - totalprice).toFixed(2)
    //改变foodlist中的数据
    foodlist.forEach(function(item, i) {
      item.food.forEach(function(one, t) {
        if (operation.id == one.id) {
          if (one.count > 1) {
            one.count--;
            operation.count = one.count;
          } else {
            one.count--;
            operation.count = one.count;
            one.flag = true;
          }

        }
      })
    })
    //改变goods的数据
    info.forEach(function(item, i) {
      if (item.id == operation.id) {
        info.forEach(function(item, i) {
          list.push(item.id)
        })
        // 判断是否还有数量 ，若为0  则从购物车删除
        if (item.count > 1) {
          item.count--;
          item.unitprice = Number(item.unitprice) - Number(operation.price)
        } else if (item.count = 1) {
          item.count--;
          item.unitprice = Number(item.unitprice) - Number(operation.price)
          info.splice(list.indexOf(operation.id), 1)
        }
      }
    })
    this.setData({
      foodlist: foodlist,
      operation: operation,
      goods: info,
      totalprice: totalprice.toFixed(2),
      disparity: disparity
    })
  },
  /**
   * item3_actionsheet,item3的方法
   */
  item3_actionsheet: function(e) {
    wx.showActionSheet({
      itemList: ['商家电话:18511633601'],
      success(res) {
        wx.makePhoneCall({
          phoneNumber: '18511633601' // 仅为示例，并非真实的电话号码
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  goarchives: function(e) {
    wx: wx.navigateTo({
      url: '/pages/archives/archives',
    })
  }
})