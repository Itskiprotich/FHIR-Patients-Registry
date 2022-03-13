import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateInterface, LoadingInterface, AlertInterface, NetworkStatus } from '../interfaces';
import { LOADING, NETWORK_ACTIONS, SET_ALERT, USER_ACTIONS } from './types';
import * as API from './api';
import { Patient } from '../interfaces/patient';

const offLineMsg = 'You are offline, an active internet connection is required';
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
export const setPatients = (patients: Patient[]) => (
    { type: USER_ACTIONS.LOADED_PATIENTS, patients }
);

export const setLoadingPatients = () => (
    { type: LOADING.LOADING_PATIENTS }
);

export const setLoadedPatients = () => (
    { type: LOADING.LOADED_PATIENT }
);


export const sync = () => {
    return (dispatch: ThunkDispatchAction, getState: () => StateInterface) => {
        dispatch(loadPatients());
    }
};

export const loadPatients = () => {
    return (dispatch: ThunkDispatchAction, getState: () => StateInterface) => {
        dispatch(setLoadingPatients());
        const loadPromise = API.loadPatients();
        loadPromise.then(response => response.json()).then(json => {
            dispatch(setLoadedPatients());
            console.log(`Success::::`);
            console.log(json.entry);
            dispatch(setPatients(json.entry));
        }).catch(err => {
            dispatch(setLoadedPatients());
            console.log(`Error Encountered:::: ${err}`);
        });

    }
};
export const newPatient = (pa: Patient) => {
    return (dispatch: ThunkDispatchAction, getState: () => StateInterface) => {
        if (!isOnline(getState())) {
            dispatch(setAlert({
                visible: true,
                message: offLineMsg
            }));
            return;
        }
        dispatch(setLoading({ loading: true, message: 'adding Patient...' }));

        // const addDependentPromise = UserAPI.addDependent(dependent, user.token);
        // addDependentPromise.then(response => response.json()).then(json => {
        //     dispatch(setLoading({ loading: false, message: '' }));
        //     dispatch(setAlert({ visible: true, message: json.message }));
        //     if (json.status !== 'Failure') {
        //         dispatch(dependentAdded(dependent));
        //     }
        // })

    }
}