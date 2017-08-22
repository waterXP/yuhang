const initialState = {
  footerBtns: [
    {
      homePage: true,
      iconClass: 'fa-home',
      name: 'home',
      title: '主页',
      linkUrl: '/home'
    }, {
      homePage: false,
      iconClass: 'fa-coffee',
      name: 'approval',
      title: '审批',
      linkUrl: '/approval'
    }, {
      homePage: false,
      iconClass: 'fa-plus-circle foot-fav-color',
      title: '报销',
      name: 'new',
      linkUrl: '/new',
      btnType: 'big'
    }, {
      homePage: false,
      iconClass: 'fa-bar-chart',
      name: 'count',
      title: '统计',
      linkUrl: '/count'
    }, {
      homePage: false,
      iconClass: 'fa-cog',
      title: '我的',
      name: 'settings',
      linkUrl: '/settings'
    }
  ]
}

export default function footerReducer (state = initialState, action) {
  return state
}
