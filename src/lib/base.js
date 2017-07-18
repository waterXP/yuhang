import { hashHistory } from 'react-router'
import config, { dd, isDev} from '@/config'
import React from 'react'

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
    if (params[str] instanceof Array) {
      params[str].forEach((v, i) => {
        if (typeof v === 'number' ||
          typeof v === 'boolean' ||
          typeof v === 'string') {
          query += `${str}[${i}]=${v}&`
        } else {
          for (let child in v) {
            query += `${str}[${i}].${child}=${v[child]}&`
          }
        }
      })
    } else {
      query += `${str}=${params[str]}&`
    }
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

export const getNumber = (number = 0, dot = 2) => {
  if (isNaN(number) || isNaN(dot)) {
    return ''
  }
  dot = ~~dot
  const str = '' + number
  let [integer, decimal] = str.split('.')
  decimal = decimal ? decimal.substr(0, dot) : ''
  while (decimal.length < dot) {
    decimal += '0'
  }
  return `${integer}.${decimal}`
}

// 将时间的年份去掉
export const removeYear=(time)=>{
  time=time.split('-')
  time.shift()
  time=time.join('-')
  return time
}
export const pageSize = 20

export const highLightDate=(str)=>{
  let strReg=/^[a-zA-Z]{2}[0-9]{8}/,
    dateReg=/[0-9]{8}$/,
    fStr=strReg.exec(str)[0]
  let dateStr=dateReg.exec(fStr)[0],
    dateArr=str.split(dateStr)

    //str=str.replace(strReg,fStr)
  return (
    <span>{dateArr[0]}{<span className='wm-color-important'>{dateStr}</span>}{dateArr[1]}</span>
  )
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

export const openDatePicker = (defaultValue = +new Date(), callback) => {
  if (isDev) {
    return +new Date()
  }
  dd.biz.util.datepicker({
    format: 'yyyy-MM-dd',
    value: getDate(defaultValue, 'yyyy-MM-dd'),
    onSuccess: function(result) {
      callback && callback(result.value)
    },
    onFail: function (err) {
      // when click cancel, the errorCode is 3
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const getChosenSource = (list = [], keyLabel = 'name') => {
  let source = []
  list.forEach((v, i) => {
    source.push({
      key: v[keyLabel],
      value: i
    })
  })
  return source
}

export const openChosen = (source, selectedKey = 0, callback) => {
  if (isDev) {
    return
  }
  dd.biz.util.chosen({
    source,
    selectedKey,    
    onSuccess : function (result) {
      callback && callback(result)
    },
    onFail : function (err) {
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const uploadImage = (callback) => {
  if (isDev) {
    return
  }
  dd.biz.util.uploadImage({
    multiple: false, //是否多选，默认false
    max: 1, //最多可选个数
    onSuccess : function (result) {
      callback(result)
    },
    onFail : function (err) {
      if (err.errorCode !== -1) {
        toast(err)
      }
    }
  })
}

export const previewImage = (img) => {
  if (isDev) {
    return
  }
  dd.biz.util.previewImage({
    urls: [img],
    current: img,
    onFail : function(err) {
      toast(err)
    }
  })
}

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
export const dingPreviewImage=(urls,current)=>{
  dd.biz.util.previewImage({
    urls: urls,//图片地址列表
    current: current,//当前显示的图片链接
    onSuccess : function(result) {
        /**/
    },
    onFail : function(err) {}
  })
}
export const dingSetNavRight=(text='筛选',fun,show=false,control=true)=>{
  if(!isDev){
    dd.biz.navigation.setRight({
      show: show,//控制按钮显示， true 显示， false 隐藏， 默认true
      control: control,//是否控制点击事件，true 控制，false 不控制， 默认false
      text: text,//控制显示文本，空字符串表示显示默认文本
      onSuccess : function(result) {
          //如果control为true，则onSuccess将在发生按钮点击事件被回调
          /*
          {}
          */
          fun && fun()
      },
      onFail : function(err) {}
    })
  }
}
export const dingSetNavLeft=(text='',control=false,fun,show=true,showIcon=false)=>{
  if(!isDev){
    dd.biz.navigation.setLeft({
        show: show,//控制按钮显示， true 显示， false 隐藏， 默认true
        control: control,//是否控制点击事件，true 控制，false 不控制， 默认false
        showIcon: showIcon,//是否显示icon，true 显示， false 不显示，默认true； 注：具体UI以客户端为准
        text: text,//控制显示文本，空字符串表示显示默认文本
        onSuccess : function(result) {
            /*
            {}
            */
            //如果control为true，则onSuccess将在发生按钮点击事件被回调

            fun && fun()
        },
        onFail : function(err) {}
    })
  }
}
export const dingSetNavLeftAndroid=(fun)=>{
  console.log(33333333)
  document.addEventListener('backbutton', function(e) {
    console.log(11199373737443673862782)
    fun && fun()
    // 在这里处理你的业务逻辑
    e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
  });
}

export const dingSetTitle=(title='')=>{
  if(!isDev){
    dd.biz.navigation.setTitle({
      title : title,//控制标题文本，空字符串表示显示默认文本
      onSuccess : function(result) {
          /*结构
          {
          }*/
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
