import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalNavs from '@/components/ApprovalNavs'
import ApprovalConditions from '@/components/ApprovalConditions'
import ApprovalList from '@/components/ApprovalList'
import NoData from '@/components/NoData'

class ApprovalMain extends Component {
  static propTypes = {
    active: PropTypes.number.isRequired,
    updateActive: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      expensesClaimsId: PropTypes.number.isRequired,
      createdAvatar: PropTypes.string.isRequired,
      sumMoney: PropTypes.number.isRequired,
      createdBy: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      statusName: PropTypes.string.isRequired,
      submitTime: PropTypes.string
    }).isRequired).isRequired,
    isBusy: PropTypes.bool.isRequired
  }
  componentDidMount () {
    this.props.updateActive(1)
  }

  render () {
    const { active, updateActive, list, isBusy } = this.props
    return (
      <div>
        <ApprovalNavs
          active={ active }
          updateActive={ updateActive }
        />
        <ApprovalConditions />
        { isBusy ?
          <NoData type='loading' /> :
            list.length ? <ApprovalList list={ list } active={ active } /> :
              <NoData type='nodata' />
        }
      </div>
    )
  }
}

export default ApprovalMain

