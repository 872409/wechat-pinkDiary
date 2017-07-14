//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    modalShowStyle:'',
    diaryCount: 0
  },
  onLoad:function(){
    // 小程序中 获取用户的身份
    app.getUserInfo((data)=>{
      this.setData({
        userInfo:data
      })
    })
  },
  onShow:function() {
    let that = this;
    console.log('aaa')
    var content = wx.getStorageSync('diaryContent')
    if(content) {
      that.setData({
        diaryCount:1
      })
    } else {
      that.setData({
        diaryCount:0
      })
    }
  },
  toDiary:function() {
    wx.navigateTo({
      url:'../diary/index'
    })
  },
  titleInput: function(e) {
    let that = this
    let title = e.detail.value

    that.setData({
      title: title
    })
    wx.setStorage({
      key:"title",
      data:title
    })
  },
  showModal: function(){
    console.log('aaa')
    this.setData({
      modalShowStyle:'opacity:1;pointer-events:auto;'
    })
  },
  touchAddNew: function() {
    if(this.data.title === ''){
      wx.showToast({
        title: '日记标题不能为空',
        icon: 'success',
        duration: 2000,
        success:function(){
        }
    })
  } else {
      this.setData({
        modalShowStyle:'',
        title:''
      })
      wx.navigateTo({
        url: '/pages/new/index'
      })
    }
  },
  touchCancel: function() {
    this.setData({
      modalShowStyle:''
    })
  },
  onReady:function(){
    // console.log('ready');
    wx.setNavigationBarTitle({
      title:'我的'
    })
  }
})
