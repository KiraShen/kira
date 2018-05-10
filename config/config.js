module.exports = {
  BAAS_CLIENT_ID: 'bbc5579a30dcf285fdcc', // 从 BaaS 后台获取 ClientID 

  TABLE_ID:{
    BOOKSHELF: 33921, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
    PROFILE: 35573,
    PERSON: 35240
  },

  CONTENT_ID:{
    MEALS: 1525680613648542,
  },

  
  ROUTE: {

    IMG: {
      LOGO: '/resource/image/logo.png',
      UNLOGIN: '/resource/image/defaultavatar.png',
      ORDER_CHECKED: '/resource/image/checkbox_active.png',
      ORDER_UNCHECKED: '/resource/image/checkbox.png',
      DOT: '/resource/image/pager.png',
      DOT_ACTIVE: '/resource/image/pager-active.png',
    },

    PAGE: {
      INDEX: '/pages/index/index',
      ORDER: '/pages/order/order',
      PROFILE: '/pages/profile/profile',
      MEAL:'/pages/index/meals/meal',
      LOGIN:'/pages/mine/login/login',
      MINE:'/pages/mine/mine',
      PERSON:'/pages/mine/person/person'
    }
  }
}