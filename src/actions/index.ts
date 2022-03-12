import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateInterface, LoadingInterface, AlertInterface, NetworkStatus } from '../interfaces';
import { LOADING, NETWORK_ACTIONS, SET_ALERT, USER_ACTIONS } from './types';

export type ThunkDispatchAction = ThunkDispatch<StateInterface, any, Action>;

export const setLoading = (loading: LoadingInterface) => (
    { type: LOADING.SET_LOADING, loading }
);

export const setAlert = (alert: AlertInterface) => (
    { type: SET_ALERT, alert }
);

export const isOnline = (state: StateInterface) => {
    return state.network.connected === true;
};
export const updateNetworkStatus = (status: NetworkStatus) => ({
    type: NETWORK_ACTIONS.UPDATE, status
});

export const clearSession = () => (
    { type: USER_ACTIONS.CLEAR_SESSION }
);