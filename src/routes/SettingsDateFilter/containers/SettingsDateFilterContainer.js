import { connect } from 'react-redux'
import { cleanFilter, selMonth, selYear, toggleYears, changeYears } from '../modules/SettingsDateFilter'

import SettingsDateFilter from '../components/SettingsDateFilter'

const mapStateToProps = (state) =>{
  console.log(state)
  return{
    filter : state.home.filter,
    monthFilter: state.home.monthFilter
  }
}

const mapDispatchToProps = {
  cleanFilter,
  selMonth,
  selYear,
  toggleYears,
  changeYears
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDateFilter)

