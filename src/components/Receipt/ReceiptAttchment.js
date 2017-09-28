import React from 'react'
import PropTypes from 'prop-types'
import { dingPreviewImage } from '@/lib/base'

export const ReceiptAttchment = ({ attachmentList }) => {
  let attachmentUrls = []
  let attchmentContent = []
  attachmentList.map((v, i) => {
    attachmentUrls.push(v.url)
    if (i % 4 === 0) {
      attchmentContent.push([])
    }
    attchmentContent[attchmentContent.length - 1].push(v)
  })
  console.log(attchmentContent)
  return (
    <div className='wm-receipt-attchment'>
        <span className='attachment-title'>附件</span>
        <div className='attachment-box'>
          {
            attchmentContent.map((v, i) => (
              <div key={i} className='attachment-row'>
                {
                  v.map((v) => (
                    <img
                      key={v.id}
                      className='attImg'
                      src={v.url}
                      onClick={() => {
                        dingPreviewImage(attachmentUrls, v.url)
                      }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
    </div>
  )
}

ReceiptAttchment.propTypes = {
  attachmentList: PropTypes.array
}

export default ReceiptAttchment
