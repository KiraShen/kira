//index.js
import config from '../../config/config'
import utils from '../../utils/index'
const app = getApp()

Page({
  data: {
    imgLogo: config.ROUTE.IMG.LOGO,
    imgLogout: config.ROUTE.IMG.UNLOGIN,
    imgDot: config.ROUTE.IMG.DOT,
    imgDotActive: config.ROUTE.IMG.DOT_ACTIVE,
    pageCount: 3,
    pageIndex: 0,
    isLogin: false,
    isProfileComplete: false,
    userInfo: null,
    avatarUrl: '', 
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    contentList:[]
  },

  onLoad(options) {
    this.fetchContentList();
  },

  onShow() {
    this.initPage()
  },

  // 获取 文本列表 数据
  fetchContentList() {
    utils.getContentList(this, (res) => {
      console.log(res.data);
      this.setData({
        contentList: res.data.objects 
      })
    })
  },

  initPage() {
    /**
     * 由于 wx.BaaS.login 是异步接口，uid 需要通过在其成功的回调中的本地存储获取
     */
    const uid = wx.BaaS.storage.get('uid')

    if (!uid) {
      wx.BaaS.login()
        .then(res => {
          this.getUserInfo()
        })
        .catch(e => { })
    } else {
      this.getUserInfo()
    }
  },

  getUserInfo() {
    let _this = this
    utils.getUserProfile(this, res => {
      let userInfo = {}
      let _userInfo = res.data.objects[0]
      if (wx.BaaS.storage.get('is_logined_baas')) {
        userInfo.isLogin = true
      } else {
        userInfo.isLogin = false
      }
      userInfo = Object.assign(userInfo, _userInfo)
      this.setData({
        userInfo,
        avatarUrl: wx.BaaS.storage.get('userinfo').avatarUrl
      })
    })
  },

  buyAction(e) {
    wx.setStorageSync('id', e.currentTarget.id)
    wx.navigateTo({
      url: config.ROUTE.PAGE.MEAL
    })
  },

  goToProfile(e) {
    wx.navigateTo({
      url: config.ROUTE.PAGE.PROFILE
    })
  },

  swiper(e) {
    let activePageIndex = e.detail.current
    this.setData({
      pageIndex: activePageIndex
    })
  }
})