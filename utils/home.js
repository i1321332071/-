var characteristicList= [
  {
    name: '美团专送',
    characteristicList_num:'0',
    flag:false
  }, {
    name: '到店自取',
    characteristicList_num: '1',
    flag: false
  }, {
    name: '点评高分',
    characteristicList_num: '2',
    flag: false
  }, {
    name: '品牌商家',
    characteristicList_num: '3',
    flag: false
  }, {
    name: '免费配送',
    characteristicList_num: '4',
    flag: false
  }, {
    name: '新商家',
    characteristicList_num: '5',
    flag: false
  }, {
    name: '0元起送',
    characteristicList_num: '6',
    flag: false
  }, {
    name: '跨天预定',
    characteristicList_num: '7',
    flag: false
  }
]
var avepricelist= [
  {
    name: '20元以下',
    avepricelist_num: 0,
    flag: false
  }, {
    name: '20-40元',
    avepricelist_num: 1,
    flag: false
  }, {
    name: '40元以上',
    avepricelist_num: 2,
    flag: false
  }
]
 var discountlist= [
    {
      name: '满减优惠',
     discountnum:'0',
     flag:false
    }, {
     name: '进店领券',
     discountnum: '1',
     flag: false
    }, {
     name: '折扣商品',
     discountnum: '2',
     flag: false
    }, {
     name: '门店新客立减',
     discountnum: '3',
     flag: false
    }, {
     name: '首单立减',
     discountnum: '4',
     flag: false
    }, {
     name: '满赠活动',
     discountnum: '5',
     flag: false
    }, {
     name: '满返代金券',
     discountnum: '6',
     flag: false
    }, {
     name: '减配送费',
     discountnum: '7',
     flag: false
    }, {
     name: '买赠活动',
     discountnum: '8',
     flag: false
    }, {
     name: '提前下单优惠',
     discountnum: '9',
     flag: false
    },
  ]
var maskList1= [{
  sort: "综合排序",
}, {
  sort: "距离最近",
}, {
  sort: "评分最高",
}, {
  sort: "起送价最低",
}, {
  sort: "配送费最低",
}, {
  sort: "人均高到低",
}, {
  sort: "人均低到高",
}]
  // 轮播数
 var swiperList= {
  pageone: [{
    name: "美食",
    src: "../../images/1.png"
  }, {
    name: "甜点饮品",
    src: "../../images/2.png"
  }, {
    name: "美团超市",
    src: "../../images/3.png"
  }, {
    name: "正餐精选",
    src: "../../images/4.png"
  }, {
    name: "生鲜果蔬",
    src: "../../images/5.png"
  }, {
    name: "全部商家",
    src: "../../images/6.png"
  }, {
    name: "免配送费",
    src: "../../images/7.png"
  }, {
    name: "新商家",
    src: "../../images/8.png"
  }, {
    name: "美团超市",
    src: "../../images/3.png"
  }, {
    name: "正餐精选",
    src: "../../images/4.png"
  }],
    pagetwo: [{
      name: "美食",
      src: "../../images/1.png"
    }, {
      name: "甜点饮品",
      src: "../../images/2.png"
    }, {
      name: "美团超市",
      src: "../../images/3.png"
    }, {
      name: "正餐精选",
      src: "../../images/4.png"
    }, {
      name: "生鲜果蔬",
      src: "../../images/5.png"
    }, {
      name: "全部商家",
      src: "../../images/6.png"
    }, {
      name: "免配送费",
      src: "../../images/7.png"
    }, {
      name: "新商家",
      src: "../../images/8.png"
    }, {
      name: "美团超市",
      src: "../../images/3.png"
    }, {
      name: "正餐精选",
      src: "../../images/4.png"
    }]
 }
var restaurant=[
  {
    name: "炸鸡啤酒屋",
    src: "../../images/店铺.jpg",
    storeid: 1
  }, {
    name: "炸鸡啤酒屋",
    src: "../../images/店铺.jpg",
    storeid: 1
  }, {
    name: "炸鸡啤酒屋",
    src: "../../images/店铺.jpg",
    storeid: 1
  }, {
    name: "炸鸡啤酒屋",
    src: "../../images/店铺.jpg",
    storeid: 1
  }, {
    name: "炸鸡啤酒屋",
    src: "../../images/店铺.jpg",
    storeid: 1
  }
]
module.exports = {
  characteristicList: characteristicList,
  avepricelist: avepricelist,
  discountlist: discountlist,
  maskList1: maskList1,
  swiperList: swiperList,
  restaurant: restaurant
}