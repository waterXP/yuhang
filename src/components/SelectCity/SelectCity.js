import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SelectCity.scss'
import { fetchData } from '@/lib/base'
import ModalSelect from '../ModalSelect'
import { toast, openChosen, getChosenSource } from '@/lib/ddApi'
import { isDev } from '@/config'

class SelectCity extends Component {
  static propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    province: PropTypes.string,
    city: PropTypes.string,
    setProvince: PropTypes.func,
    setCity: PropTypes.func,
    inputProvince: PropTypes.func,
    inputCity: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.state = {
      options: [],
      district: [],
      active: 0,
      selectTarget: '',
      openModal: false
    }
    this.selectProvince = this::this.selectProvince
    this.selectCity = this::this.selectCity
    this.modalConfirm = this::this.modalConfirm
    this.modalClose = this::this.modalClose
    this.setValue = this::this.setValue
  }
  componentWillMount () {
    fetchData('get /district/getDistrict.json')
    .then(({ data }) => {
      this.setState({ district: data })
    })
  }

  selectProvince () {
    const { province } = this.props
    const { district = [] } = this.state
    if (isDev) {
      const options = [
        '选择省份',
        ...district.map(v => v.province)
      ]
      const active = options.findIndex(v => v === province)
      this.setState({
        openModal: true,
        selectTarget: 'province',
        options,
        active: active > -1 ? active : 0
      })
    } else {
      const options = [
        { key: '选择省份', value: -1 },
        ...district.map((v, i) => ({ key: v.province, value: i }))
      ]
      this.setState({
        selectTarget: 'province'
      }, () => {
        openChosen(options, province || '选择省份', (v) => this.setValue(v.key))
      })
    }
  }
  selectCity () {
    const { province, city } = this.props
    const { district = [] } = this.state
    const targetProvince = district.find(v => v.province === province)
    if (province) {
      if (isDev) {
        const options = [
          '选择城市',
          ...targetProvince ? targetProvince.cities : []
        ]
        const active = options.findIndex(v => v === city)
        this.setState({
          openModal: true,
          selectTarget: 'city',
          options,
          active: active > -1 ? active : 0
        })
      } else {
        const options = [
          { key: '选择城市', value: -1 },
          ...targetProvince
            ? targetProvince.cities.map((v, i) => ({ key: v, value: i }))
            : []
        ]
        this.setState({
          selectTarget: 'city'
        }, () => {
          openChosen(options, city || '选择城市', (v) => this.setValue(v.key))
        })
      }
    } else {
      toast('请先发选择省份')
    }
  }
  setValue (id) {
    const { setProvince, setCity } = this.props
    const { selectTarget } = this.state
    switch (selectTarget) {
      case 'province':
        setProvince(id)
        break
      case 'city':
        setCity(id)
    }
  }
  modalConfirm (value, label, id) {
    this.setValue(id)
    // const { setProvince, setCity } = this.props
    // const { selectTarget } = this.state
    // switch (selectTarget) {
    //   case 'province':
    //     setProvince(id)
    //     break
    //   case 'city':
    //     setCity(id)
    // }
    this.modalClose()
  }
  modalClose () {
    this.setState({
      openModal: false
    })
  }

  render () {
    const { label, required, province, city, setProvince,
      setCity, inputProvince, inputCity } = this.props
    const { openModal, district, options, active } = this.state

    return (
      <div className='wm-select-city'>
        { label && <label className='form-label'>地区</label> }
        { required && <span className='required'>*</span> }
        <div>
          <button
            className='select-button'
            type='button'
            onClick={this.selectProvince}
            ref={(e) => inputProvince && inputProvince(e)}
          >
            { province || '选择省份' }
            <img className="img-right" src="imgs/icon_arrow.png" />
          </button>
          <button
            className='select-button'
            type='button'
            onClick={this.selectCity}
            ref={(e) => inputCity && inputCity(e)}
          >
            { city || '选择城市' }
            <img className="img-right" src="imgs/icon_arrow.png" />
          </button>
        </div>
        { openModal &&
          <ModalSelect
            options={options}
            active={active}
            select={this.modalConfirm}
            close={this.modalClose}
            scope={'province'}
          />
        }
      </div>
    )
  }
}

export default SelectCity
