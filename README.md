# wechat-pinkDiary
微信小程序-以粉粉日记APP为参考做的一个专属日记本。

首先，微信小程序是什么？ <br>
官方解释，微信小程序，简称小程序，是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。简而言之，就是用户需要的时候打开，用完即走的一种应用。如果小程序能够兴起，我想到时候我们的手机将会变得很简单干净，因为你无需下载安装各种App！
开发微信小程序你需要准备好这些工具：
下载微信开发者工具，附上地址：https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html 下载好后就可以进行开发了，不过呢，如果要发布你的小程序呢，你要去申请AppId走各种流程，不过平时练练手可以选择无Appid进行开发，不过会有一些局限。具体开发详情你可以去https://mp.weixin.qq.com 这里了解。
在创建了一个微信小程序后，会自动生成一些基本文件： <br>

  *  page文件夹 页面文件夹 包含你所有的页面文件,至少包含.js .wxml .wxs后缀文件，.json可选
  *  utlis文件夹 一般放置一些全局需要使用的js文件
  *  app.js 控制全局的逻辑结构
  *  app.json 配置一些全局数据，所有页面都要在此处注册
  *  app.wxml 内容显示
  *  app.wxss 全局样式
  下面切入我们的正题： <br>
  
  
**效果预览** <br>
  嘻嘻，先来一波gif图^_^  <br>
  
  ![整体预览](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/yl.gif) <br>
  
  ![写日记](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/wd.gif) <br>
  
  ![话题详情](https://github.com/zsqio/wechat-pinkDiary/blob/master/images/pl.gif)<br>
  
**功能实现** <br>
  * 轮播图
  * 写日记
  * 话题评论
  * 带emoji的输入
  * 上传图片
  * 字体大小，颜色改变 
  * 地理定位
  * 下拉刷新
  * 页面跳转
  * tabbar切换良好交互
  * 获取用户信息
  * 动态选择日记日期
  
**具体实现** <br>

首先,在社区这一块，我用到大量数据都是用mock来模拟数据，详情可见[Easy Mock](http://www.easy-mock.com) Easy Mock是一个可视化工具，能快速生成模拟数据的服务，它能为我们提供一个数据接口url，然后使用wx.request({ url: url, .....})来发送数据请求，不得不说mock是前端人员的有力工具。<br>
> 轮播图  <br>
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
  > tabbar切换良好交互 <br>
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
   > 写日记 <br>
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
    < 话题评论  <br>
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
< 地理定位 <br>

   
