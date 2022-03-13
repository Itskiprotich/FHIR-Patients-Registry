import { AnyAction } from 'redux';
import { USER_ACTIONS } from '../actions/types';
import { Patient } from '../interfaces/patient';

const INITIAL_STATE: Patient[] = [];

const patients = (state: Patient[] = INITIAL_STATE, action: AnyAction,): Patient[] => {
    switch (action.type) {
        case USER_ACTIONS.LOADED_PATIENTS:
            return [...action.patients];
        // case USER_ACTIONS.PATIENTS_ADDED:
        //     return state.concat(action.patients);
        default:
            return state;
    }
};

export default patients;
