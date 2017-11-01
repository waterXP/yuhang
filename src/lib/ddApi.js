import { dd, isDev } from '@/config'
import { getDate } from './base'

// 弹窗 dd.notification
export const alert = (message = '', title = '', buttonName = '确定') => {
  dd.device.notification.alert({
    message,
    title,
    buttonName
  })
}

export const toast = (text = '', icon = '', duration = 1) => {
  if (isDev) {
    window.alert(text)
  } else {
    dd.device.notification.toast({
      icon,
      text,
      duration
    })
  }
}

export const confirm =
(message = '', title = '', callback, buttonLabels = ['确定', '取消']) => {
  if (!isDev) {
    dd.device.notification.confirm({
      message: message,
      title: title,
      buttonLabels: buttonLabels,
      onSuccess: function (result) {
        if (result.buttonIndex === 0) {
          callback && callback()
        }
      },
      onFail: function (err) { toast(err) }
    })
  } else {
    const r = window.confirm('确认删除？')
    if (r) {
      callback && callback()
    }
  }
}

// 业务 dd.biz
export const dingSend = (users = [], corpId = '', text = '', cb1, cb2) => {
  dd.biz.ding.post
  ? dd.biz.ding.post({
    users : users,
    corpId: corpId,
    type: 1,
    alertType: 2,
    text: text,
    onSuccess: () => {
      cb1 && cb1()
    },
    onFail: () => {
      cb2 && cb2()
    }
  })
  : dd.biz.ding.create({
    users: users,
    corpId: corpId,
    type: 1,
    alertType: 2,
    text: text,
    bizType: 0,
    onSuccess: () => {
      cb1 && cb1()
    },
    onFail: () => {
      cb2 && cb2()
    }
  })
}

export const dingApproveDetail = (url, cb) => {
  dd.biz.util.openLink({
    url: url,
    onSuccess : function (result) {
      cb && cb()
    },
    onFail : function (err) { toast(err) }
  })
}

export const openDatePicker = (defaultValue = +new Date(), callback) => {
  if (isDev) {
    return +new Date()
  }
  dd.biz.util.datepicker({
    format: 'yyyy-MM-dd',
    value: getDate(defaultValue, 'yyyy-MM-dd'),
    onSuccess: function (result) {
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

export const datePicker = (defaultValue = +new Date(), cb) => {
  if (isDev) {
    return +new Date()
  }
  dd.biz.util.datepicker({
    format: 'yyyy-MM',
    value: getDate(defaultValue, 'yyyy-MM'),
    onSuccess: function (d) {
      cb && cb(d.value)
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
    onSuccess: function (result) {
      callback && callback(result)
    },
    onFail: function (err) {
      if (err.errorCode !== 3) {
        toast(err)
      }
    }
  })
}

export const uploadImage = (max, callback) => {
  if (isDev) {
    return
  }
  dd.biz.util.uploadImage({
    multiple: true,
    max: max,
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
    onFail: function (err) { toast(err) }
  })
}

export const dingPreviewImage = (urls, current) => {
  dd.biz.util.previewImage({
    urls: urls,
    current: current,
    onSuccess: function (result) {},
    onFail: function (err) { toast(err) }
  })
}

export const dingSetNavRight = (text = '筛选', cb, show = false, control = true) => {
  if (!isDev) {
    dd.biz.navigation.setRight({
      show: show,
      control: control,
      text: text,
      onSuccess: function (result) { cb && cb() },
      onFail: function (err) { toast(err) }
    })
  }
}

export const dingSetNavLeft =
(text = '', control = false, fun, show = true, showIcon = false) => {
  if (!isDev) {
    dd.biz.navigation.setLeft({
      show: show,
      control: control,
      showIcon: showIcon,
      text: text,
      onSuccess: function (result) { fun && fun() },
      onFail: function (err) { toast(err) }
    })
  }
}

export const dingSetNavLeftAndroid = (fun) => {
  document.addEventListener('backbutton', function (e) {
    fun && fun()
    e.preventDefault()
  })
}

export const dingSetTitle = (title = '') => {
  if (!isDev) {
    dd.biz.navigation.setTitle({
      title: title,
      onSuccess: function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}

export const dingSetMenu = (items, cb) => {
  if (!isDev) {
    if (items) {
      dd.biz.navigation.setMenu({
        items,
        onSuccess: function (d) { cb && cb(d) },
        onFail: function (e) { toast(e) }
      })
    } else {
      dd.biz.navigation.setMenu({
        items: [],
        onSuccess: function (d) { cb && cb() },
        onFail: function (e) { toast(e) }
      })
    }
  }
}

// 设备 dd.device
export const dingShowPreLoad = () => {
  if (!isDev) {
    dd.device.notification.showPreloader({
      text: '使劲加载中..',
      showIcon: true,
      onSuccess : function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}

export const dingHidePreLoad = () => {
  if (!isDev) {
    dd.device.notification.hidePreloader({
      onSuccess: function (result) {},
      onFail: function (err) { toast(err) }
    })
  }
}

