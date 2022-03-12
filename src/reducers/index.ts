import { combineReducers } from 'redux';
import { Action } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { StateInterface } from '../interfaces';
import loading from './loading';
import alert from './alert';
import network from './network';
import patients from './patients';

const reducers = combineReducers<StateInterface, Action>({
    alert,
    loading,
    network,
    patients,
});

const rootPersistConfig = {
    key: 'patients-data',
    storage: AsyncStorage,
    blacklist: ['alert', 'loading']
};

export default persistReducer(rootPersistConfig, reducers);
