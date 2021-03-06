
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;

Page({
  onLoad: function () {
    var that = this
  },
  onShow: function () {
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸结束事件
  touchEnd: function (e) {
    var touchMoveX = e.changedTouches[0].pageX;
    var touchMoveY = e.changedTouches[0].pageY;
    // 向左滑动   
    if (touchMoveX - touchDot <= -40 && time < 50 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向右滑动");
      wx.navigateTo({
        url: './test/right'
      })
    }
    // 向右滑动   
    if (touchMoveX - touchDot >= 40 && time < 50 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向左滑动");
      wx.navigateTo({
        url: './test/left'
      })
    }

    // 向上滑动   
    if (touchMoveY - touchDot <= -40 && time < 50 && flag_hd == true) {
      flag_hd = false;
      //执行切换页面的方法
      console.log("向上滑动");
      wx.navigateTo({
        url: './test/right'
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  }
})