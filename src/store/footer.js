const initialState = {
  footerBtns: [
    {
      homePage: true,
      iconClass: 'fa-home',
      title: '主页',
      linkUrl: '/'
    }, {
      homePage: false,
      iconClass: 'fa-coffee',
      title: '审批',
      linkUrl: '/approval'
    }, {
      homePage: false,
      iconClass: 'fa-plus-circle',
      linkUrl: '/new',
      btnType: 'imgOnly'
    }, {
      homePage: false,
      iconClass: 'fa-bar-chart',
      title: '统计',
      linkUrl: '/count'
    }, {
      homePage: false,
      iconClass: 'fa-cog',
      title: '我的',
      linkUrl: '/settings'
    }
  ]
}

export default function footerReducer (state = initialState, action) {
  return state
}
