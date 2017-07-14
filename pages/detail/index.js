//index.js
//获取应用实例
let util=require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    isShow:false,
    photoShow:false,
    isLoad: true,
    // bottom: true,
    topicInfo:[],
    comment:'',
    username:'',
    avatar:'',
    // 下拉刷新的次数
    refreshTime:0,
    commentList:[],
    nodata:false,
    photos:[],
    scrollTop:0,
    scrollHeight:0,
    emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
  },
  onLoad: function (query) {
    // console.log(query.id)
    var id = query.id
    var that = this
    app.getUserInfo((data)=>{
      console.log(data)
      that.setData({
        username:data.nickName,
        avatar:data.avatarUrl
      })
    });
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        })
      }
    });
    wx.setNavigationBarTitle({
      title:'话题详情'
    });
    // console.log('onLoad')
    wx.request({
      url:'http://www.easy-mock.com/mock/596487a2b6cab76bb738bcc6/topicDetail/'+ id,
      header:{
        "Content-Type":"application/json"
      },
      success: function(res) {
         var data = res.data.topicInfo;
        //  console.log(data.type)
         that.setData({
           topicInfo: data
    })
    // console.log(that.topicInfo)
  }
})
var em = {}, that = this, emChar = that.data.emojiChar.split("-");
    var emojis = []
    that.data.emoji.forEach(function (v, i) {
      em = {
        char: emChar[i],
        emoji: "0x1f" + v
      };
      emojis.push(em)
    });
       that.setData({
        emojis: emojis
      })
},
commentInput: function(e) {
  this.setData({
    comment:e.detail.value
  })
},
submitComment: function() {
  var that = this, conArr = [];
   //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
   setTimeout(function () {
     if (that.data.comment.trim().length > 0) {
       conArr.push({
         avatar:that.data.avatar,
         username:that.data.username,
         time:util.formatTime(new Date()),
         content:that.data.comment,
         images:that.data.photos
       })
       that.setData({
         commentList: that.data.commentList.concat(conArr),
         comment: "",//清空文本域值
         photos:[],
         isShow: false,
         photoShow:false,
         bottom: true
       })
     } else {
       that.setData({
         comment: "",//清空文本域值
         photos:[],
       })
     }
   }, 100)
},
bindClick: function() {
  this.setData({
    isShow:false,
    photoShow:false,
  })
},
emojiShowHide: function () {
  console.log('hi')
  this.setData({
    isShow: !this.data.isShow,
    isLoad: false,
    photoShow: false
  })
},
photoShoWHide: function() {
  this.setData({
    photoShow: !this.data.photoShow,
    isShow: false,
  })
},
emojiChoose: function(e) {
  console.log(e.currentTarget.dataset.emoji)
  this.setData({
      comment: this.data.comment + e.currentTarget.dataset.emoji
    })
},
addPhoto:function() {
  let that = this
  wx.chooseImage({
    count: 9, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          photos:tempFilePaths
        })
    }
})
},
deletePhoto: function(e){
  let that = this
  console.log(e.currentTarget.id)
  let id = e.currentTarget.id
  that.data.photos.splice(id,1)
  that.setData({
      photos:that.data.photos
  })

},
scroll: function (event) {
  this.setData({
    scrollTop: event.detail.scrollTop
      });
    },
refresh:function(){
  console.log('bottom')
  let that = this,conArr = []
  if (that.data.refreshTime < 3) {
    for(let i=0;i<3;i++){
      conArr.push({
        'avatar':'../../images/avatar.jpg',
        'username':'西瓜君',
        'content':'简直66666',
        'time':util.formatTime(new Date()),
      })
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 3000
    })
    setTimeout(function () {
          that.setData({
            commentList: that.data.commentList.concat(conArr)
          })
        },3000)
  } else {
    that.setData({
      nodata:true
    })
  }
  ++that.data.refreshTime;
}
})
