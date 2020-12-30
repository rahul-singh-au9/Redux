// IMPORTING REDUX
const redux  = require("redux")

// IMPORTING REDUX LOGGER APPLY_MIDDLEWARE
const reduxLogger = require("redux-logger")

// CREATING THE STORE
const createStore = redux.createStore

// IMPORTING APPLY_MIDDLEWARE FROM REDUX
const applyMiddleware = redux.applyMiddleware

// CREATING LOGGER
const logger = reduxLogger.createLogger()

// COMBINE REDUCER METHOD
const combineReducers = redux.combineReducers

// -------------------------------------------
// ACTION
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM"

function buyCake(){
  return {
    type: BUY_CAKE,
    info: "First redux aciton"
  }
}

function buyIcecream(){
  return {
    type: BUY_ICECREAM
  }
}
// ------------------------------------------

// STATE

const initialCakeState = {
  numofCakes: 10
}

const initialIceCreamState = {
  numofIceCreams: 20
}

// -----------------------------------------

// REDUCER

const iceCreamReducer = (state = initialIceCreamState, action) =>{
  switch(action.type){
    case BUY_ICECREAM: return {
      ...state,
      numofIceCreams: state.numofIceCreams-1
    }
    default: return state
  }
}

const cakeReducer = (state = initialCakeState, action) =>{
  switch(action.type){
    case BUY_CAKE: return {
      ...state,
      numofCakes: state.numofCakes-1
    }
    default: return state
  }
}

// -----------------------------------------

// COMBINING THE REDUCERS
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// -----------------------------------------
// CREATING THE STORE
const store  = createStore(rootReducer, applyMiddleware(logger))

// ACCESSING INTIAL STATE
console.log("Initial state", store.getState())

// LISTENER FOR UPDATES
// WITHOUT MIDDLEWARE
// const unsubscribe = store.subscribe(()=>console.log("Updated state", store.getState()))

// WITH MIDDLEWARE
const unsubscribe = store.subscribe(()=>{})

// --------------------------------
// DISPATCHING THE ACITONS
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

// UNSUBSCRIBING FROM THE STORE
unsubscribe()