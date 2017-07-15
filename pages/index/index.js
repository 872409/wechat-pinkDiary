//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    topicList:[],
    images:[
      "../../images/swiper1.jpg",
      "../../images/swiper2.jpg",
      "../../images/swiper3.jpg",
      "../../images/swiper4.jpg"
    ],
    topTopic:[],
    hotInfo:[],
    indicatorDots:true,
    vertical:false,
    autoplay:true,
    interval:3000,
    duration:1200,
    indicatorcolor:"#fff",
    indicatoractivecolor:"pink",
    scrollX:true,
    scrollLeft:0
  },

  onLoad: function () {
    let that = this
    wx.request({
      url:'http://www.easy-mock.com/mock/59642c25b6cab76bb7382dc1/index/hot',
      header:{
        "Content-Type":"application/json"
      },
      success: function(res) {
         var data = res.data.hotInfo;
        //  console.log(data)
         that.setData({
           hotInfo: data
    })
    }
  });
    wx.request({
      url:'http://www.easy-mock.com/mock/59642c25b6cab76bb7382dc1/index/topTopic',
      header:{
        "Content-Type":"application/json"
      },
      success: function(res) {
         var data = res.data.topTopic;
        //  console.log(data)
         that.setData({
           topTopic: data
    })
  }
});
    wx.request({
      url:'http://www.easy-mock.com/mock/59642c25b6cab76bb7382dc1/index/index/topicList',
      header:{
        "Content-Type":"application/json"
      },
      success: function(res) {
         var data = res.data.topicList;
        //  console.log(data)
         that.setData({
           topicList: data
    })
  }
});
},
toDetail: function(e) {
  var id = e.currentTarget.id
  wx.navigateTo({
    url: '../detail/index?id='+id
  })
},
toDetail: function(e) {
  var id = e.currentTarget.id
  wx.navigateTo({
    url: '../detail/index?id='+id
  })
},
towriteDiary:function(){
  wx.navigateTo({
    url:'../diary/index'
  })
}
})
