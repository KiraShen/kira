import config from '../../../config/config'
import utils from '../../../utils/index'

const app = getApp()
Page({
  data: {
    phone: '',
    password:'',
    id_token:'',//方便存在本地的locakStorage  
    response: '', //存取返回数据  
    result:-1 //返回结果，-1:用户名错误 0:密码错误 1:正确
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '登录'
    })
  },
  input_phone(e) {
    let that = this
    that.setData({
      phone: e.detail.value
    })
  },

  input_pswd(e) {
    let that = this
    that.setData({
      password: e.detail.value
    })
  },

  submit(e) {
    //wx.showNavigationBarLoading()
    this.getPersonPswd()
  },

  getPersonPswd(){
    let that = this
    utils.getPerson(that, (res) => {
      let obj = res.data.objects[0]
      console.log(res.data.objects[0])
      if (obj==null){
        that.setData({
          result: -1
        })
        
        wx.showToast({
          title: '账户错误',
          icon: 'none',
          duration: 2000,
          success: console.log("账户错误")
        })  

      }else{
        if(obj.password==this.data.password){
          that.setData({
            result: 1
          })
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000,
            success: console.log("登录成功")
          })  
          wx.setStorageSync('login_status', 1)
          this.goToMine()
        }else{
          that.setData({
            result: 0
          })
          
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 2000,
            success: console.log("密码错误")
          })  
        }
      }
    })
  },

  goToMine:function() {
    console.log('goto mine.'),
      wx.navigateBack({
      //url: config.ROUTE.PAGE.MINE,
    })
  },
  //   if (name && phone && company) {

  //     if (isFirstCommit) {
  //       let data = {
  //         name,
  //         phone,
  //         company,
  //         avatar_url: wx.BaaS.storage.get('userinfo').avatarUrl,
  //         is_member: false,
  //         isProfileComplete: true,
  //         isFirstCommit: false,
  //       }

  //       utils.addUser(data, this)
  //         .then(res => {
  //           wx.hideNavigationBarLoading()
  //           wx.navigateTo({
  //             url: config.ROUTE.PAGE.INDEX
  //           })
  //         })
  //         .catch(err => {
  //           wx.hideNavigationBarLoading()
  //           wx.showModal({
  //             title: "啊咧！资料保存出错了。",
  //             content: "大概是网络不太顺畅，可以稍后再尝试一下。",
  //             showCancel: false,
  //             confirmText: '好',
  //             confirmColor: '#FD544A'
  //           })
  //         })

  //     } else {
  //       let data = {
  //         name,
  //         phone,
  //         company,
  //         recordId: recordID,
  //       }

  //       utils.updateUser(data, this)
  //         .then(res => {
  //           wx.hideNavigationBarLoading()
  //           wx.navigateTo({
  //             url: config.ROUTE.PAGE.INDEX
  //           })
  //         })
  //         .catch(err => {
  //           wx.showModal({
  //             title: "啊咧！资料保存出错了。",
  //             content: "大概是网络不太顺畅，可以稍后再尝试一下。",
  //             showCancel: false,
  //             confirmText: '好',
  //             confirmColor: '#FD544A'
  //           })
  //         })
  //     }
  //   } else {
  //     wx.hideNavigationBarLoading()
  //     wx.showModal({
  //       title: '资料木有齐全',
  //       content: '请确保信息完整',
  //       showCancel: false,
  //       confirmText: '好的',
  //       confirmColor: '#FD544A'
  //     })
  //   }
  

})
