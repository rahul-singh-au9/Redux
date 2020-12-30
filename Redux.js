// console.log("from index.js")

// IMPORTING REDUX
const redux = require('redux')

// CREATING STORE
const createStore = redux.createStore

// ACTION
const BUY_CAKE = "BUY_CAKE"
function buyCake(){
  return{
  type: BUY_CAKE,
  info: "first redux action"
  };
}

// STATE
const initialState = {
  numofCakes: 10
}

// REDUCER
const reducer = (state = initialState, action) =>{
  switch (action.type){
    case BUY_CAKE: return {
      ...state,
      numofCakes: state.numofCakes-1
    }
    default: return state
  }
}

// IT HOLDS THE INITIAL STATE AND HELP IN STATE TRANSITION BASED ON THE ACTIONS IT RECEIVES
// CREATING REDUX STORE
const store  = createStore(reducer)

// getState() => ACCESS TO STATE
console.log("Intial state", store.getState())

// LISTENER TO THE STORE
// ANYTIME THE STORE UPDATES WE LOG THE STATE
const unsubscribe = store.subscribe(()=>console.log("updated state",store.getState()))


// DISPATCHING THE ACTION
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

// UNSUBSCRIBING FROM STORE
unsubscribe()