import { hashHistory } from 'react-router'
import config, { dd ,isDev} from '@/config'

export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_FIN = 'FETCH_FIN'

export const history = hashHistory

export const getUrlParams = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return r[2]; return ''
}

export const get = (url, params = {}) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  })
  let queryUrl = url
  if (queryUrl.indexOf('?') < 0) {
    queryUrl += '?'
  }
  for (let str in params) {
    queryUrl += `${str}=${params[str]}&`
  }
  return fetch(queryUrl, {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  })
}

export const post = (url, params = {}) => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  let query = ''
  for (let str in params) {
    query += `${str}=${params[str]}&`
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: headers,
    body: query
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    } else {
      return response
    }
  })
}

export const asyncFetch = (action, params = {}, cb) => {
  if (!cb) {
    cb = (datam, dispatch, getState) => {
      let msg = data.msg || '操作成功'
      return dispatch({
        type: FETCH_FIN,
        msg
      })
    }
  }
  return (dispatch, getState) => {
    fetchData(action, params)
    .then((data) => {
      if (!data.result) {
        return cb(data, dispatch, getState)
      } else {
        toast(data.msg)
        return dispatch({
          type: FETCH_FAIL,
          err: data.msg || '系统忙，请稍后再试'
        })
      }
    })
    .catch((e) => {
      return dispatch({
        type: FETCH_FAIL,
        err: e
      })
    })
  }
}

export const fetchData = (action, params = {}) => {
  let [method, url] = action.split(' ')
  if (url.indexOf('/') === 0) {
    url = url.substr(1)
  }

  if (config.useLocaldata) {
    url = '/localdata/' + url
  } else {
    url = (process.env.NODE_ENV === 'development' ?
      config.devApi : config.prodApi) + url
  }

  for (let v in params) {
    if (params[v] === null) {
      delete params[v]
    }
  }
  if (method.toLowerCase() === 'get') {
    return get(url, params)
  } else {
    return post(url, params)
  }
}

export const getTestAccount = () => {
  const headers = new Headers({
    // 'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
  return fetch('/api/setUser.jsp', {
    method: 'GET',
    credentials: 'same-origin',
    headers: headers
  })
}

export const fetchFail = (state, action) => {
  return state
}

export const fetchFin = (state, action) => {
  return state
}

//dinge66a5fd3ad45cc2a35c2f4657eb6378f

const corpid = getUrlParams('corpid') || 'dinge66a5fd3ad45cc2a35c2f4657eb6378f'
Object.assign(config, {
  host: `http://120.77.209.222/mobiletest/?corpid=${corpid}`,
  corpid
})

export const goLocation = (location={ pathname: '/' }) =>
  hashHistory.push(location)

export const getDate = (nDate=(new Date()), fmt='yyyy-MM-dd hh:mm:ss') => {
  const sDate = new Date(nDate)
  const dateObj = {
    'M+': sDate.getMonth() + 1,
    'd+': sDate.getDate(),
    'h+': sDate.getHours(),
    'm+': sDate.getMinutes(),
    's+': sDate.getSeconds(),
    'q+': ~~((sDate.getMonth() + 3) / 3),
    'S': sDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (sDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const s in dateObj) {
    if (new RegExp('(' + s + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ?
        (dateObj[s]) :
        (('00' + dateObj[s]).substr(('' + dateObj[s]).length)))
    }
  }
  return fmt
}

export const getCash = (cash=0, symbol='') => {
  if (isNaN(cash)) {
    return '--'
  }
  cash = ~~(cash * 100) / 100
  let result = '' + cash
  let dot = result.indexOf('.')
  if (dot < 0) {
    dot = result.length
    result += '.'
  }
  while (result.length <= dot + 2) {
    result += '0'
  }
  return symbol + result
}

// 将时间的年份去掉
export const removeYear=(time)=>{
  time=time.split('-')
  time.shift()
  time=time.join('-')
  return time
}
export const alert = (message='', title='', buttonName='确定') => {
  // if (config.inDev) {
  //   window.alert(message)
  // } else {
  //   dd.device.notification.alert({
  //     message,
  //     title,
  //     buttonName
  //   })
  // }
  dd.device.notification.alert({
    message,
    title,
    buttonName
  })
}

export const toast = (text='', icon='') => {
  if (config.inDev) {
    window.alert(text)
  } else {
    dd.device.notification.toast({
      icon,
      text
    })
  }
}

export const confirm=(message='你爱我吗',title='',callback,buttonLabels=['确定','取消'])=>{
  if(isDev){

  }else{
    dd.device.notification.confirm({
      message: message,
      title: title,
      buttonLabels: buttonLabels,
      onSuccess : function(result) {
          //onSuccess将在点击button之后回调
          /*
          {
              buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始
          }
          */
          if(result.buttonIndex===0){
            callback && callback();
          }
      },
      onFail : function(err) {}
    })
  }
}

export const dingSend=(users=[])=>{
  dd.biz.ding.post({
    users : users,//用户列表，工号
    corpId: '', //企业id
    type: 1, //附件类型 1：image  2：link
    alertType: 2,
    alertDate: {"format":"yyyy-MM-dd HH:mm","value":"2017-07-09 08:00"},
    attachment: {
        images: [''],
    }, //附件信息
    text: '', //消息
    onSuccess : function() {
    //onSuccess将在点击发送之后调用
    },
    onFail : function() {}
  })
}
export const dingApproveDetail=(url)=>{
  dd.biz.util.openLink({
    url: url,//要打开链接的地址
    onSuccess : function(result) {
        /**/
    },
    onFail : function(err) {}
  })
}
//console.log(config.dd)
export const dingShowPreLoad=()=>{
  if(isDev){

  }else{
    dd.device.notification.showPreloader({
      text: "使劲加载中..", //loading显示的字符，空表示不显示文字
      showIcon: true, //是否显示icon，默认true
      onSuccess : function(result) {
          /*{}*/
      },
      onFail : function(err) {}
    })
  }
}
export const dingHidePreLoad=()=>{
  if (isDev) {

  }else{
    dd.device.notification.hidePreloader({
      onSuccess : function(result) {
          /*{}*/
      },
      onFail : function(err) {}
    })
  }
}

export const getArray = (obj) => {
  let result = []
  for (const i in obj) {
    result[i] = obj[i]
  }
  return result
}

export const getObjArray = (obj, idLabel = 'id', valueLabel = 'value') => {
  let result = []
  for (const i in obj) {
    let temp = {}
    temp[idLabel] = i
    temp[valueLabel] = obj[i]
    result.push(temp)
  }
  return result
}

export const doFetch = (action, params = {}) => {
  return fetchData(action, params)
    .then((data) => {
      if (data.result) {
        toast(data.msg)
        toast(data.msg || '系统忙，请稍后再试')
      }
      return data
    })
    .catch((e) => {
      toast(e)
      toast('请求失败，请检查网络并稍后再试')
    })
}

export default {
  getUrlParams,
  fetchData,
  fetchFail,
  fetchFin,
  FETCH_FAIL,
  FETCH_FIN,
  goLocation,
  getDate,
  getCash,
  alert,
  toast,
  confirm,
  dingSend,
  dingApproveDetail,
  doFetch
}










