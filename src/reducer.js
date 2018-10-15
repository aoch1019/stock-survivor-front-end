const defaultState = {
  stocks: [],
  currUser:   {
    "id": 1,
    "name": "Andrew",
    "created_at": "2018-10-10T16:29:02.482Z",
    "updated_at": "2018-10-10T16:29:02.482Z"
  },
  currPoolId: 1,
  currPick: null,
  currEntry: null,
  currDay: 2,
  currPickedStock: null,
  currPoolEntries: null
}

function reducer(state = defaultState, action){
  switch(action.type){
    case "GET_STOCKS":
      return {...state, stocks: action.payload}
    case "CHANGE_USER":
      return {...state, currUser: action.payload}
    case "MAKE_STOCK_PICK":
      return {...state, currPick: action.payload}
    case "CHANGE_ENTRY":
      return {...state, currEntry: action.payload}
    case "CHANGE_STOCK":
      return {...state, currPickedStock: action.payload}
    case "CHANGE_POOL_ENTRIES":
      return {...state, currPoolEntries: action.payload}
    default:
      return state
  }
}

export default reducer
