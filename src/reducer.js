const defaultState = {
  stocks: [],
  currUser: null,
  currPoolId: 55,
  currPick: null,
  currEntry: null,
  currDay: 1,
  currPickedStock: null,
  currPoolEntries: null,
  poolInProgress: false,
  stockToView: null,
  aliveEntries: null,
  currProfile: null
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
    case "CHANGE_DAY":
      return {...state, currDay: action.payload}
    case "CHANGE_STOCK_TO_VIEW":
      return {...state, stockToView: action.payload}
    case "UPDATE_ALIVE_ENTRIES":
      return {...state, aliveEntries: action.payload}
    case "CHANGE_PROFILE":
      return {...state, currProfile: action.payload}
    default:
      return state
  }
}

export default reducer
