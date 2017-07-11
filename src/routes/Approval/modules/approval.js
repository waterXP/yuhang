import { approvalFilterHandlers } from '../../ApprovalFilter'

export const UPDATE_ACTIVE = 'UPDATE_ACTIVE'

export function updateActive (payload = 'wait') {
  return {
    type: UPDATE_ACTIVE,
    payload
  }
}

export const actions = {
  updateActive
}

const ACTION_HANDLERS = Object.assign({
  [UPDATE_ACTIVE]: (state, action) =>
    Object.assign({}, state, action.payload)
}, approvalFilterHandlers)

const initialState = {
  active: 1,
  list: [{
    id: 1,
    avatar: 'test',
    bill: 355000,
    name: '熊猫',
    type: 1,
    status: 1,
    time: '2017.04.01'
  }, {
    id: 2,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 3,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 2,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 4,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 5,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 4,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 6,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 4,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 7,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 8,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 9,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 10,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 11,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }, {
    id: 12,
    avatar: 'test',
    bill: 35000,
    name: '熊猫2',
    type: 1,
    status: 2,
    time: '2017.04.01'
  }],
  filter: [{
    id: 1,
    text: '已拒绝'
  }, {
    id: 2,
    text: '审批通过'
  }, {
    id: 3,
    text: '待发放'
  }, {
    id: 4,
    text: '已发放'
  }, {
    id: 5,
    text: '票审搁置'
  }, {
    id: 6,
    text: '发放搁置'
  }, {
    id: 7,
    text: '草稿'
  }, {
    id: 8,
    text: '审批中'
  }, {
    id: 9,
    text: '已撤消'
  }, {
    id: 10,
    text: '作废'
  }],
  billRange: [{
    value: '',
    holder: '最小值'
  }, {
    value: '',
    holder: '最大值'
  }]
}

export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

