import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'

class ExpenseAttachment extends Component {
  static propTypes = {
    attachmentList: PropTypes.array,
    addAttachment: PropTypes.func,
    removeAttachment: PropTypes.func,
    showImg: PropTypes.func,
    restAttachments: PropTypes.array
  }
  constructor () {
    super(...arguments)
  }

  render () {
    const { attachmentList = [], addAttachment, removeAttachment,
      showImg, restAttachments = [] } = this.props

    // build img list
    let imgs = []
    const rest = restAttachments.map((v, i) => {
      imgs.push({
        url: v.url,
        onClick: () => removeAttachment(i, 'restAttachments')
      })
      return <div className='img' key={`${i}-${v.url}`}>
        {
          // <i
          //   className='fa fa-times'
          //   onClick={() => removeAttachment(i, 'restAttachments')}
          // />
        }
        <img src={v.url} onClick={() => showImg(i)} />
      </div>
    })
    const add = attachmentList.map((v, i) => {
      imgs.push({
        url: v,
        onClick: () => removeAttachment(i, 'attachmentList')
      })
      return <div className='img' key={`${i + restAttachments.length}-${v}`}>
        {
          // <i
          //   className='fa fa-times'
          //   onClick={() => removeAttachment(i, 'attachmentList')}
          // />
        }
        <img src={v} onClick={() => showImg(restAttachments.length + i)} />
      </div>
    })

    return (
      <div className='wm-expense-attachment'>
        <p>添加图片</p>
        <div className='list'>
          { rest.length > 0 && rest }
          { add.length >0 && add }
          { attachmentList.length + restAttachments.length < 9 &&
            <button className='img' type='button' onClick={() => addAttachment()}>
              <img className='add-img' src='imgs/icon_add_button.png' />
            </button>
          }
        </div>
      </div>
    )
  }
}

export default ExpenseAttachment
