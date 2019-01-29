function requestpost(url,data={},methods="post"){
  return new Promise(function(resolve,reject){
  wx.request({
    url: url, 
    header: {
      'content-type': 'application/json' // 默认值
    },
    method:methods,
    data:data,
    success(res) {
      if (res.statusCode == 200){
        resolve(res.data);
      }
      else{
        reject(res.errMsg);
      }
    },
    fail:function(err){
      reject(err)
    }
  })
  })
}
function requestget(url,methods="get"){
return new Promise(function(resolve,reject){
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: methods,
    success(res) {
      wx.hideNavigationBarLoading()     
    //  console.log(res.data.data)
      if (res.statusCode == 200) {
        resolve(res.data.data);
      }
      else {
        reject(res.errMsg);
      }
    },
    fail: function (err) {
      console.log(err)
      reject(err)
    }
  })
})
}
module.exports ={
  requestpost,
  requestget,
}