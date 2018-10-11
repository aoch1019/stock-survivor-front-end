const defaultState = {
  stocks: [],
  currUser: null,
  currPoolId: 1,
  currPick: null,
  currEntry: null
}

function reducer(state = defaultState, action){
  switch(action.type){
    case "GET_STOCKS":
      return {...state, stocks: action.payload}
    case "CHANGE_USER":
      return {...state, currUser: action.payload}
    case "MAKE_STOCK_PICK":
      return {...state, currPick: action.payload}
    default:
      return state
  }
}

export default reducer
