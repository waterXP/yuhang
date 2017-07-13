import { connect } from 'react-redux'
import {getNotPaid,initialNotPaid,getSumMoney} from '../modules/HomeNotPaid'

import HomeNotPaid from '../components/HomeNotPaid'

const mapStateToProps = (state) =>{
  //console.log('state',state)
   return {
    notPaid:{
      data:state.home.notPaid,
      sumMoney:state.home.notPaidSumMoney
    }
  }
}
const mapDispatchToProps = {
  getNotPaid,
  initialNotPaid,
  getSumMoney
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeNotPaid)