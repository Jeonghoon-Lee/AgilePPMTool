import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

// import * as actions from './actions'

// const authInterceptor = ({ dispatch }) => (next) => (action) => {
//   if (action.status === 401) {
//     console.log('error.. logout')
//     dispatch(actions.logout());
//   } else {
//     next(action);
//   }
// };

const middleware = [thunk]
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)))

// let store
// if (window.navigator.userAgent.includes('Chrome')) {
//   store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
// } else {
//   store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))
// }

export default store