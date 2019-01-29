//导航的数据
  var navlistlist=[{
    text: '菜单'
  }, {
      text: '评价'
  }, {
      text: '商家'
  }
  ]
//菜单的左侧的数据
var  menulist= [
  {
    name:'热销',
    id:'1'
      },
  {
    name: '面食',
    id: '2'
      },
  {
    name: '饮料',
    id: '3'
      }, {
    name: '烤肉',
    id: '4'
  }, {
    name: '烤肉',
    id: '5'
  }, {
    name: '烤肉',
    id: '6'
  }, {
    name: '烤肉',
    id: '7'
  }, {
    name: '烤肉',
    id: '8'
  }
]
//商品list
var  foodlist= [
    {
      id: '1',
      food: [
        {
          id: '0011',
          img: '',
          name: '1',
          price:15.00,
        }, {
          id: '0012',
          img: '',
          name: '1',
          price:10.00
        }, {
          id: '0013',
          img: '',
          name: '1雪碧',
          price:12.00
        }, {
          id: '0014',
          img: '',
          name: '1雪碧',
          price:56.00
        }
      ]
    }, {
      id: '2',
      food: [
        {
          id: '0021',
          img: '',
          name: '2可乐',
          price:6.33
        }, {
          id: '0022',
          img: '',
          name: '2雪碧',
          price:8.22
        }
      ]
    }, {
      id: '3',
      food: [
        {
          id: '0031',
          img: '',
          name: '3可乐',
          price:4.22
        }, {
          id: '0032',
          img: '',
          name: '3雪碧',
          price:8.11
        }, {
          id: '0033',
          img: '',
          name: '3雪碧',
          price:11.11
        }, {
          id: '0034',
          img: '',
          name: '3雪碧',
          price:22.11
        }
      ]
    }, {
      id: '4',
      food: [
        {
          id: '0041',
          img: '',
          name: '4可乐',
          price:5.00
        }, {
          id: '0042',
          img: '',
          name: '4雪碧',
          price:5.00
        }, {
          id: '0043',
          img: '',
          name: '4雪碧',
          price:3.00
        },
        {
          id: '0045',
          img: '',
          name: '4雪碧',
          price:3.00
        }, {
          id: '0046',
          img: '',
          name: '4雪碧',
          price:55.00
        }
      ]
    },
  {
    id: '5',
    food: [
      {
        id: '0011',
        img: '',
        name: '1',
        price: 15.00,
      }, {
        id: '0012',
        img: '',
        name: '1',
        price: 10.00
      }, {
        id: '0013',
        img: '',
        name: '1雪碧',
        price: 12.00
      }, {
        id: '0014',
        img: '',
        name: '1雪碧',
        price: 56.00
      }
    ]
  },
  {
    id: '6',
    food: [
      {
        id: '0011',
        img: '',
        name: '1',
        price: 15.00,
      }, {
        id: '0012',
        img: '',
        name: '1',
        price: 10.00
      }, {
        id: '0013',
        img: '',
        name: '1雪碧',
        price: 12.00
      }, {
        id: '0014',
        img: '',
        name: '1雪碧',
        price: 56.00
      }
    ]
  },
  {
    id: '7',
    food: [
      {
        id: '0011',
        img: '',
        name: '1',
        price: 15.00,
      }, {
        id: '0012',
        img: '',
        name: '1',
        price: 10.00
      }, {
        id: '0013',
        img: '',
        name: '1雪碧',
        price: 12.00
      }, {
        id: '0014',
        img: '',
        name: '1雪碧',
        price: 56.00
      }
    ]
  },
  {
    id: '8',
    food: [
      {
        id: '0011',
        img: '',
        name: '1',
        price: 15.00,
      }, {
        id: '0012',
        img: '',
        name: '1',
        price: 10.00
      }, {
        id: '0013',
        img: '',
        name: '1雪碧',
        price: 12.00
      }, {
        id: '0014',
        img: '',
        name: '1雪碧',
        price: 56.00
      }
    ]
  }
  ]
module.exports = {
  setnavlist: navlistlist,
  setmenulist: menulist,
  setfoodlist:foodlist
}