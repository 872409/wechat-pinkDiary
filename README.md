# wechat-pinkDiary
微信小程序-以粉粉日记APP为参考做的一个日记本。

首先开发微信小程序你需要准备好这些工具：
下载微信开发者工具，附上地址：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html 下载好后就可以进行开发了，不过呢，如果要发布你的小程序呢，你要去申请AppId走各种流程，不过平时练练手可以选择无Appid进行开发，不过会有一些局限。具体开发详情你可以去https://mp.weixin.qq.com 这里了解。
在创建了一个微信小程序后，会自动生成一些基本文件： <br>

  *  page文件夹 页面文件夹 包含你所有的页面文件,至少包含.js .wxml .wxs后缀文件，.json可选
  *  utlis文件夹 一般放置一些全局需要使用的js文件
  *  app.js 控制全局的逻辑结构
  *  app.json 配置一些全局数据，所有页面都要在此处注册
  *  app.wxml 内容显示
  *  app.wxss 全局样式
  
其次,需要说明一下，我用到大量数据都是用mock来模拟数据，详情可见[Easy Mock](http://www.easy-mock.com) Easy Mock是一个可视化工具，能快速生成模拟数据的服务，它能为我们提供一个数据接口url，然后使用wx.request({ url: url, .....})来发送数据请求，不得不说mock是前端人员的有力工具。<br>下面切入我们的正题： <br>
  
  
**效果预览** <br>
  嘻嘻，先来一波gif图😜😜😜😜😜😜  <br>
  
  ![整体预览](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/yl.gif) <br>
  
  ![写日记](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/wd.gif) <br>
  
  ![话题详情](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/pl.gif)<br>

**页面注册**
```
 "pages":[
    "pages/index/index",    //首页，也就是tabBar里“社区“对应的页面
    "pages/my/index",       // tabBar“我的”页面
    "pages/detail/index",    //首页推荐内容的详情页 
    "pages/new/index",        // 编辑日记页面
    "pages/diary/index",      //日记列表页面
    "pages/logs/logs"
  ]
```
  
**功能实现** <br>
  * 轮播图
  * 写日记
  * 话题评论
  * 带emoji的输入
  * 上传图片
  * 字体大小，颜色改变 
  * 地理定位
  * 下拉刷新
  * tabbar切换良好交互
  * 获取用户信息
  * 动态选择日记日期
  
**具体实现** <br>
* 轮播图  <br>
轮播图是微信小程序自带的轮播图(swiper)组件 <br>
HTML结构
```
 <swiper class="swiper_box"
  indicator-color="{{indicatorcolor}}" 
  indicator-active-color="{{indicatoractivecolor}}" 
  vertical="{{vertical}}" 
  autoplay="{{autoplay}}" 
  interval="{{interval}}" 
  duration="{{duration}}" 
  indicator-dots="indicatorDots">
      <block wx:for="{{images}}" wx:key="item">
        <swiper-item>
          <image src="{{item}}" class="slide-image"></image>
        </swiper-item>
      </block>
    </swiper>
 ```
 js配置 
 ```
  Page({
  data: {
    indicatorDots:true,
    vertical:false,
    autoplay:true,     //自动轮播
    interval:3000,     //轮播时间差为3000ms
    duration:1200,
    indicatorcolor:"#fff",     //设置底部小圆点为白色
    indicatoractivecolor:"pink",   //当圆点状态为active是，呈现粉色
    ......
    }
  })
  ```
* tabbar切换良好交互 <br>
这个功能实现起来比较简单，主要是将app.json文件中的tabBar里设置样式、页面路径、图片路径，用列表list来渲染,详细请参考以下代码
  ```
     "tabBar": {
      "color":"#999",
      "selectedColor":"#ff71a8",
      "borderStyle":"white",
      "list": [{
        "pagePath": "pages/index/index",
        "text": "社区",
        "iconPath": "images/lifeNormal.png",
        "selectedIconPath": "images/lifeSelected.png"
      },
      {
        "pagePath": "pages/my/index",
        "text": "我的",
        "iconPath": "images/myNormal.png",
        "selectedIconPath": "images/mySelected.png"
      }]
   }
   ```
* 写日记 <br>
因为编辑日记和展示日记在两个不同的页面，所以两个页面之间需要传递日记的内容，这里我主要是借助wx.setLocalStorage(key:key,value:value)将需要传递的数据存放到本地缓存中，虽然我们不建议将关键信息全部存在localStorage，以防用户换设备的情况。 但是在我们没有更好的数据共享的方式前可以一试。最后我们在日记列表页面通过wx.getStorage(key)得到我们之前存储的东西，然后再页面上显示出来。在日记列表页面可以对你的日记进行删除和修改操作，删除就很简单了，直接利用wx.clearStorage()将你存储在localSroage里的数据全部清空就可以了。这里可以借助setTimeout来实现一个假的效果，修改的话，就是通过wx.navigateTo()里的url将日记的text作为参数传递给编辑页面，详情见代码：<br>
  日记列表页面代码： <br> 
   ```
    //modify就是点击修改按钮触发的事件
    modify: function(){
    console.log('aaa')
    wx.navigateTo({
      url:"/pages/new/index?content="+this.data.content
    })
  }
  ```
  修改页面，在onLoad()获取参数：<br>
  ```
  `onLoad:function(query) {
    that.setData({
      content:query.content
    })
    .....
    ```
* 话题评论  <br>
页面展示的话题详情和已经展示的评论是从mock里获取的数据，评论功能的实现主要是借助数组的concat()方法，将你添加的评论和原有的评论连接起来，
首先在data里面我们有个空的commentList来存放新发布的评论，获取评论内容等在这就不细讲，重点看一下发布评论的代码：<br>
```
submitComment: function() {
       var that = this, conArr = [];
        //此处延迟的原因是 在点发送时 先执行失去文本焦点 再执行的send 事件 此时获取数据不正确 故手动延迟100毫秒
        setTimeout(function () {
          if (that.data.comment.trim().length > 0) {
            conArr.push({
              avatar:that.data.avatar,     //在onLoad(）里通过wx.getUserInfo()获取了用户信息
              username:that.data.username,
              time:util.formatTime(new Date()),
              content:that.data.comment,    //评论的text包括表情
              images:that.data.photos      //评论所带图片地址
            })
            that.setData({
              commentList: that.data.commentList.concat(conArr),
              comment: "",//清空文本域值
              photos:[],
              isShow: false,    
              photoShow:false,
            })
          } else {
            that.setData({
              comment: "",//清空文本域值
              photos:[],
            })
          }
        }, 100)
     }
```

* 地理定位 <br>
 我在定位功能的实现中使用了腾讯地图的定位API,具体使用可参考网址详细解析http://lbs.qq.com/qqmap_wx_jssdk/index.html <br/>
 但是有3步是必不可少的：
 1 申请开发者密钥（key）：[申请密钥] http://lbs.qq.com/key.html
 2 下载微信小程序JavaScriptSDK，微信小程序JavaScriptSDK v1.0
 3 安全域名设置，需要在微信公众平台添加域名地址https://apis.map.qq.com <br/>
 完成以上3步，你就可以友好地使用Api了，首先使用wx.getLocation()获取当前用户位置的经纬度，然后通过逆地址解析获取当前的具体位置，这里就是使用腾讯位置服务平台提供的reverseGeocoder接口，在逆地址解析结果中获取省份和城市信息。参考代码：
 ```
  getLocation: function() {
    let that=this;
    wx.getLocation({      //首先获得经纬度
      type: 'wgs84',
      success:(res)=> {
        var latitude = res.latitude
        var longitude = res.longitude
        demo.reverseGeocoder({      //然后借助腾讯位置服务提供个逆地址解析api将经纬度转换成具体的地址
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
  }
  ```
* 下拉刷新评论 <br>
这里主要是借助了微信小程序的视图容器scroll-view，可滚动区域，设置属性scroll-y="true",表示可沿着y轴滚动，需要注意使用竖向滚动时，需要给<scroll-view/>一个固定高度，我这里是通过wx.getSystemInfo()得到windowHeight,然后将固定高度设置为和windowHeight一样。当滚动到评论底部时，会触发会触发 scrolltolower 事件，在事件对应的处理方法里我们将预先设置好的评论信息加载到页面上。这样就形成一个下拉加载的效果。参考代码:<br>
  ```
  //哈哈，方法命名有点粗糙~
  refresh:function(){
    console.log('bottom')
    let that = this,conArr = []
    if (that.data.refreshTime < 3) {     //refreshTime是在data里定义的一个常量，用来控制加载次数，这里最多3次
      for(let i=0;i<3;i++){
        conArr.push({
          'avatar':'../../images/avatar.jpg',
          'username':'西瓜君',
          'content':'简直66666',
          'time':util.formatTime(new Date())   //获取当前时间，utils文件夹下的util.js里定义了formateTime()方法，详情见源码~
        })
      }
      wx.showToast({               //显示加载提示框
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
  ```
* 上传图片 <br>
通过wx.chooseImage(OBJECT)来从本地相册选择图片或使用相机拍照，具体参数如图：<br>
![](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/param.PNG) <br>
主要代码：
  ```
  wx.chooseImage({
    count: 1, // 默认9  表示可选择图片的数量
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths; 
        this.setData({
        photos: tempFilePaths
        })
     }
   })
  ```

* 带emoji输入框 <br>
![emoji](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/emojiShow.gif) <br>
这里首先我们需要在data里定义一个emojiChar，注意这个emojiChar是有一大串可爱表情连起来的字符串，具体可以看下面的js代码，首先我们通过split()将字符串emojiChar切割成一个表情数组emChar[],但是这些表情不是显示在表情框中的表情形式，我们需要将他们转化成上图所示的qq和微信的原始表情展示。每一个表情都有相应的字符编码，但是其实我们这里并不是使用正则来转换成实体字符，这里我们是通过image将所有的表情以图片的形式显示出来，这里的图片访问地址从别人的项目里借鉴过来的，具体见代码。完成了emoji显示，接下来的就是实现当点击emoji时，将它显示到input文本域中。但是其实这里呈现出来的是我们之前在emojiChar里定义的表情样式，通过dataSet传递所选中的表情，详情见js代码的emojichoose()方法。完成以上这些，一个可爱的小型emoji输入框就是实现啦~ <br>
HTML结构：<br>
```
<!-- emoji表情盒子 -->
  <view class="emoji-box {{isShow ? 'emoji-move-in' : 'emoji-move-out'}} {{isLoad ? 'no-emoji-move' : ''}}" >
    <scroll-view scroll-y="true" bindscroll="emojiScroll" style="height:200px">
      <block wx:for="{{emojis}}" wx:for-item="e" wx:key="">
        <view class="emoji-cell">
          <image class="touch-active" bindtap="emojiChoose" 
          src="http://soupu.oss-cn-shanghai.aliyuncs.com/emoji/{{e.emoji}}.png" 
          data-emoji="{{e.char}}"
          data-oxf="{{e.emoji}}">
          </image>
        </view>
      </block>
    </scroll-view>
  </view>
```
js控制 
```
  Page({
  data: {
   .......
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
    emojis: []    //通过qq、微信原始表情
  },
  onLoad: function () {
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
    }，
    emojiChoose: function(e) {
  // console.log(e.currentTarget.dataset.emoji)
  this.setData({
      comment: this.data.comment + e.currentTarget.dataset.emoji
    })
   }
  })
```
其他实现功能在这里就不细讲，想了解，可自行参考[源码😜](https://github.com/zsqio/wechat-pinkDiary) <br>

## 小结 <br>

* 界面交互，区分wx.navigateTo和wx.switchTab，前者是保留当前页面，跳转到应用内的某个页面（不在tabbar），后者是跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。当我们要从不在tabbar里的页面中跳转到tabbar页面时，除了选择左上角的返回键后，应该选择wx.switchTab,而不是wx.navigateTo <br>
* 每个页面都必须先注册，不然页面跳转是会出错，我们应该养成良好的习惯，先规划好需要的页面，然后再去一个个实现。 <br>
* 如果需要用到本地缓存localStorage里的数据，并且及时响应变化，此时，最好使用wx.StorageSync()来获取。wx.getStorage()和wx.getStorageSync()的区别就在于，前者是异步执行，后者是同步执行。


   
