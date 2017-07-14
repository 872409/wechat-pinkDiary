// let util=require('../../utils/util.js');
let util=require('../../utils/util.js');
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var demo=new QQMapWX({
  key:'UNKBZ-6PORG-L4VQ3-I4OPG-IXLXO-Q4BVD'
})

let currentdate=util.getNowFormatDate();

var app=getApp()
Page({
  data:{
    isShow:false,
    isLoad:true,
    photoShow:false,
    fontShow:false,
    recordShow:false,
    sizes:[
      {
        index:0,
        size:"12px",
        selected:false
      },
      {
        index:1,
        size:"14px",
        selected:false
      },
      {
        index:2,
        size:"16px",
        selected:false
      },
      {
        index:3,
        size:"18px",
        selected:false
      },
      {
        index:4,
        size:"20px",
        selected:false
      },
      {
        index:5,
        size:"22px",
        selected:false
      }
    ],
    color:[
      {
        index:0,
        color:"#000",
        selected:false
      },
      {
        index:1,
        color:"#fff",
        selected:false
      },
      {
        index:2,
        color:"#f00",
        selected:false
      },
      {
        index:3,
        color:"#00ac00",
        selected:false
      },
      {
        index:4,
        color:"#ffa0c1",
        selected:false
      },
      {
        index:5,
        color:"#00f",
        selected:false
      },
      {
        index:6,
        color:"#ff0",
        selected:false
      },
      {
        index:7,
        color:"#f0f",
        selected:false
      },
      {
        index:8,
        color:"#E77817",
        selected:false
      },
    {
      index:9,
      color:'#C79EFE',
      selected:false
    },
    {
      index:10,
      color:'#36f0c1',
      selected:false
    }
    ],
    picker1Value:0,
    dateValue:currentdate,
    audioPath: '',
    location:"点击添加位置",
    locationStyle:'',
    fontSize:'',
    content:'',
    photos:[],
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
    emojis: [] //qq、微信原始表情
  },
  onLoad:function(query) {
    let that = this ;
    wx.setNavigationBarTitle({
      title:'编辑日记'
    })
    console.log(query)
    that.setData({
      content:query.content
    })
    var em = {}, emChar = that.data.emojiChar.split("-");
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
  bindclick: function() {
    this.setData({
      isShow:false,
      photoShow:false,
      fontShow:false,
      recordShow:false
    })
  },
  emojiShowHide: function () {
    let that = this
    that.setData({
      isShow: !this.data.isShow,
      isLoad:false,
      photoShow: false,
      fontShow:false,
      recordShow:false
    })
  },
  emojiChoose: function(e) {
    console.log(e.currentTarget.dataset.emoji)
    this.setData({
        content: this.data.content + e.currentTarget.dataset.emoji
      })
  },
  photoShowHide: function() {
    let that = this
    that.setData({
      isShow: false,
      fontShow:false,
      recordShow:false,
      photoShow: !this.data.photoShow

    })
  },
  fontShowHide:function() {
    let that = this
    that.setData({
      isShow: false,
      photoShow:false,
      recordShow:false,
      fontShow:!this.data.fontShow
    })
  },
  showRecord:function() {
    let that = this
    that.setData({
      recordShow:!this.data.recordShow,
      fontShow:false,
      isShow: false,
      photoShow:false,
    })
  },
  addPhoto:function() {
    let that = this
    wx.chooseImage({
      count: 9, // 可根据情况自由设置，默认9
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
  });
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
  datePickerBindchange: function(event){
    wx.setStorage({
      key:"date",
      data:event.detail.value
    })
    this.setData({
      dateValue:event.detail.value
    })
  },
  getLocation: function() {
    let that=this;
    wx.getLocation({
      type: 'wgs84',
      success:(res)=> {
        var latitude = res.latitude
        var longitude = res.longitude
        demo.reverseGeocoder({
          location:{
            latitude,
            longitude
          },
          success: function(res) {
            console.log(res.result)
              var location=res.result.address_component.province+res.result.address_component.city
              that.setData({
                location,
                locationStyle:'background-image:url(./../../images/blue.png);color:#1296db;'
              });
              wx.setStorage({
                key:"location",
                data:location
              })

          },
          fail: function(res) {
              console.log(res);
          },
          complete: function(res) {
              console.log(res);
          }
        });
      }
    })
  },
  changeFont: function(event) {
    console.log(event.currentTarget);
    for(var i = 0; i < this.data.sizes.length;i++){
        if(event.currentTarget.id == i){
              this.data.sizes[i].selected = true
           }
           else
          {
             this.data.sizes[i].selected= false
          }
      }
      this.setData(this.data);
      this.setData({
        fontSize: event.target.dataset.fontsize
      })
    console.log(this.data);
  },
  changeColor: function(event) {
    for(var i = 0; i < this.data.color.length;i++){
        if(event.currentTarget.id == i){
              this.data.color[i].selected = true
           }
           else
          {
             this.data.color[i].selected= false
          }
      }
      this.setData(this.data);
      this.setData({
        fontColor: event.target.dataset.color
      })
  },
  input:function(e){
    let that = this
    console.log(e.detail.value)
    let content = e.detail.value
    that.setData({
      content:e.detail.value
    })
  },
  save: function(event){
    let that = this;
    console.log(event.detail.value);
    var content = event.detail.value;
    console.log(content)
    if(content!== '') {
      wx.setStorage({
        key:"diaryContent",
        data:that.data.content
      });
    }
    wx.setStorage({
      key:'images',
      data:that.data.photos
    })
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
      success:function(){

      }
    });
    setTimeout(function(){
      wx.hideLoading();
      wx.navigateBack();
    },2000)
  },
  touchdown:function() {
    console.log('录音开始')
    let that = this
    wx.startRecord({
      success:function(res){
         var tempFilePath = res.tempFilePath;
         that .setData({
           audioPath: tempFilePath
         })
         console.log(that.data.audioPath)
      },
      fail:function(res){
         //录音失败
      }
    });
  },
  touchup:function() {
    console.log('录音结束')
    wx.stopRecord();
  }
})
