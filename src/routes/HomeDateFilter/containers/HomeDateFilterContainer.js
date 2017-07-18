import { connect } from 'react-redux'
import { cleanFilter, selMonth, selYear, toggleYears, changeYears } from '../modules/HomeDateFilter'

import HomeDateFilter from '../components/HomeDateFilter'

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeDateFilter)

