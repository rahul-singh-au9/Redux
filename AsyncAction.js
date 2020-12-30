// IMPORTING REDUX
const redux = require("redux")

// IMPORTING REDUX-THUNK
const thunkMiddleware = require("redux-thunk").default

// IMPORTING AXIOS
const axios = require("axios")

// IMPORTING CREATESTORE FROM REDUX
const createStore = redux.createStore

// IMPORTING APPLYMIDDLEWARE FROM REDUX
const applyMiddleware = redux.applyMiddleware

// INITIAL STATE OF STORE
const initialState = {
  loading: false,
  users: [],
  error: ""
}

// SETTING THE ACTION TYPE CONSTANT
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

// DEFINING ACTION-CREATORS
const fetchUsersRequest = () =>{
  return {
    type: FETCH_USERS_REQUEST
  }
}
const fetchUsersSuccess = (users) =>{
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
const fetchUsersFailure = (error) =>{
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

const fetchUsers = () =>{
  return function(dispatch){
    dispatch(fetchUsersRequest())
    axios.get("https://jsonplaceholder.typicode.com/users")
    .then(response =>{
      // response.data is the array of users
      const users = response.data.map(user=>user.id)
      dispatch(fetchUsersSuccess(users))
    })
    .catch(error => {
      // error message is the error discription
      dispatch(fetchUsersFailure(error.message))
    })
  }
}


// DEFINING REDUCER
const reducer = (state = initialState, action) =>{
  switch(action.type){
    case FETCH_USERS_REQUEST: return {
      ...state,
      loading: true
    }
    case FETCH_USERS_SUCCESS: return {
      ...state,
      loading: false,
      users: action.payload,
      error: ""
    }
    case FETCH_USERS_FAILURE: return {
      ...state,
      users: [],
      error: action.payload
    }
  }
}


// CREATING THE STORE
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// LISTENER
store.subscribe(()=> {console.log(store.getState())})

// DISPATCHING THE ACTION
store.dispatch(fetchUsers())