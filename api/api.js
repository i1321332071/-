var WxApi ='https://www.easy-mock.com/mock/5c35a399ce7b4303bd93fbf4/meituan'

module.exports={
  //进入店铺获取店铺数据
  getstore: WxApi + '/getstore', //根据id获取店铺信息，以及商品信息

  //个人tabber的相关请求
  posttlogin: WxApi + '/postlogin', //登录，根据code获取key
  getaddress: WxApi + '/getaddress', //根据用户的id获取我的地址
  getdeletelocation: WxApi + '/getdeletelocation', //根据addressid获取地址

  //首页的请求
  getrestaurant: WxApi + '/getrestaurant',   //获取首页的店铺list
  getcondition: WxApi +'/getcondition',// 根据筛选条件获取排序

  //订单相关请求
  getallorderlist: WxApi +'/getallorderlist',// 查询所有订单
  getorderbyevaluate: WxApi +'/getorderbyevaluate',//查询待评价订单
  getorderbyrefund: WxApi +'/getorderbyrefund',//查询退款相关订单
  getorderdetail: WxApi + '/getorderdetail',//查询订单详情
  getevaluated: WxApi + '/getevaluated',//根据订单号进入评价页面
  postevaluated: WxApi + '/postevaluated',//将评价传给后台

} 