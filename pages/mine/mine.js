//index.js
//获取应用实例
import utils from '../../utils/index.js'
import config from '../../config/config.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // title: 'my shelf',
    // tableId:config.TABLE_ID.BOOKSHELF,
    // bookList:[],
    // creatingBookName:'',
    // editingBookName:'',
    // buf_val:'请输入书名'
    isLogin:0, //是否登录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取登录的信息
    this.setData({
      profile: wx.BaaS.storage.get('userinfo')
    })
    console.log(wx.BaaS.storage.get('userinfo'))
    
    //console.log(app.globalData.clientId)
    
    // wx.BaaS.login().then(res => {
    //   console.log('登录成功')
    //   this.setData({
    //     profile: wx.BaaS.storage.get('userinfo')
    //   })},err => {
    //     if (err.code === 600) {
    //       console.log('网络已断开')
    //     } if (err.code === 601) {
    //       console.log('请求超时')
    //     } if (err.code === 602) {
    //       console.log('未调用进行初始化')
    //     }
    //   }
    
    //this.fetchBookList()
    // )
  },

  goToLogin:function() {
    wx.navigateTo({
      url: config.ROUTE.PAGE.LOGIN
    })
  },

  goToPerson:function(){
    wx.navigateTo({
      url: config.ROUTE.PAGE.PERSON
    })
  },

  // 获取 数据表bookshelf 数据
  fetchBookList() {
    utils.getBooks(this, (res) => {
      this.setData({
        bookList: res.data.objects // bookList array, mock data in mock/mock.js
      })
    })
  },

  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateBookNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingBookName: value
    })

  },

  // 绑定添加书目的提交按钮点击事件，向服务器发送数据
  createBook(e) {
    utils.addBook(this, (res) => {
      this.setData({
        createBookValue: '',
      })
      this.fetchBookList()
    })
  },
 
  // 绑定每一行书目的“编辑”按钮点击事件，控制输入框和文本显示
  editBookButtonClicked(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index
    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
        elem.isEditing = true
      } else {
        elem.isEditing = false
      }
    })

    that.setData({
      bookList
    })
  },

  // 绑定修改书目的提交按钮点击事件，向服务器发送数据
  updateBook(e) {

    this.setData({
      curRecordId: e.target.dataset.bookId,
    })

    utils.updateBook(this, (res) => {
      this.fetchBookList()
      this.setData({ curRecordId: '' })
    })
  },

  // 绑定每一行书目的输入框事件，设定当前正在编辑的书名
  bindEditBookNameInput(e) {
    let bookName = e.detail.value
    this.setData({
      editingBookName: bookName,
    })
  },

  // 删除当前行的书目
  deleteBook(e) {
    this.setData({
      curRecordId: e.target.dataset.bookId,
    })
    utils.deleteBook(this, (res) => {
      this.fetchBookList()
      this.setData({ curRecordId: '' })
    })
  },

  jumpToMyPage: function () {
    wx.navigateTo({
      url: '../mine/mine'
    })
  },
  jumpToTest: function () {
    wx.navigateTo({
      url: './test'
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('mine:onShow.')
    var loginbuf = wx.getStorageSync('login_status');
    this.setData({
      isLogin:loginbuf
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})