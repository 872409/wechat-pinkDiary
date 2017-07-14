var app=getApp()
Page({
  data:{
    isShow:true,
    title:'',
    diaryTitle:'',
    time:'',
    content:'',
    images:[],
    location:'',
    diaryCount: 0
  },
  onLoad:function() {
    wx.setNavigationBarTitle({
      title:'日记列表'
    })
  },
  onShow:function() {
    // console.log('bbb')
    let that = this;
    let images = wx.getStorageSync("images")
    let content = wx.getStorageSync("diaryContent")
    let diaryTitle = wx.getStorageSync("title")
    let time = wx.getStorageSync("date")
    let location = wx.getStorageSync("location")
    // console.log(that.data)
    that.setData({
      images:images
    })
    that.setData({
      content:content
    })
    that.setData({
      diaryTitle:diaryTitle
    })
    that.setData({
      time:time
    })
    that.setData({
      location:location
    })
    if(content){
      that.setData({
        diaryCount:1
      })
    }
  },
  modify: function(){
    console.log('aaa')
    wx.navigateTo({
      url:"/pages/new/index?content="+this.data.content
    })
  },
  deleteDiary:function() {
    let that = this;
    wx.showModal({
      content:'确定要删除吗？',
      success: function(res) {
    if (res.confirm) {
      wx.clearStorage();
      that.setData({
        diaryCount:0,
        isShow:false
      })
      setTimeout(function(){
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      },1000)
    } else if (res.cancel) {

    }
  }
    })
  }
})
