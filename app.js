//app.js
import config from './config/config.js'

App({
  onLaunch:function(){
    let that = this
    //引入BaaS SDK
    require('./utils/sdk-v1.3.0.js')

    //let clientId = this.globalData.clientId
    
    //初始化SDK 调用 SDK 时需验证 ClientID
    wx.BaaS.init(config.BAAS_CLIENT_ID)

    //用户授权登录
    const userId = this.getUserId()
    if (!userId) {
      wx.BaaS.login()
        .then(res => {        
          console.log('BaaS is logined...')
        }).catch(err => {
          console.log(err)
        })
    }

  },

  getUserId() {
    if (this.userId) {
      return this.userId
    }

    const userId = wx.BaaS.storage.get('uid')
    this.userId = userId

    return userId
  },

  //跳转到home
  navToHome() {

  }

})