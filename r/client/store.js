import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import Thunk from 'redux-thunk'
import { createActions, handleActions, combineActions } from 'redux-actions'

import { Api } from './api'


export const LOADING = {
  failed: -1,
  initial: 0,
  loading: 1,
  ready: 2,
}

const initialState = {
  state: LOADING.initial,
  error: null,
  users: [],
}

const Actions = createActions({
  users: {
    loadingStart: () => ({ state: LOADING.loading }),
    loadingFailed: (error) => ({ error, state: LOADING.failed }),
    loadingFinish: (users) => ({ users: users.data, state: LOADING.ready }),
  },
}).users

export const loadUsers = () => (
  async (dispatch, getState, { api }) => {
    dispatch(Actions.loadingStart())

    try {
      const users = await api.get('/users')

      dispatch(Actions.loadingFinish(users))
    }
    catch (error) {
      dispatch(Actions.loadingFailed(error.message))
    }
  }
)

/**
 * Update state by fn
 * @param {(payload: any, meta: any) => Object} fn
 * @return {any}
 */
const update = (fn) => (prevState, action) => ({ ...prevState, ...fn(action.payload, action.meta) })

const usersReducer = handleActions({
  [combineActions(Actions.loadingStart, Actions.loadingFinish, Actions.loadingStart)]:
    update(({ state }) => ({ state })),

  [Actions.loadingFailed]: update(({ error }) => ({ error })),

  [Actions.loadingFinish]: update(({ users }) => ({ users })),
}, initialState)

const reducer = combineReducers({
  users: usersReducer,
})

export function configureStore(rootInitialState = {}) {
  const api = new Api('https://reqres.in/api/')

  const middlewares = [
    createLogger({ collapsed: true }),
    Thunk.withExtraArgument({ api }),
  ]

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    reducer,
    rootInitialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )
}

