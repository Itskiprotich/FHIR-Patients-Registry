import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { storeMiddleWare } from '../middleware';
import rootReducers from '../reducers';
import { StateInterface } from '../interfaces';


const middlewares = [
    thunk as ThunkMiddleware<StateInterface, any>,
    storeMiddleWare,
];

export const configureStore = () => {
    const store = createStore(rootReducers, {}, applyMiddleware(...middlewares));
    return { store, persistedStore: persistStore(store) };
};
