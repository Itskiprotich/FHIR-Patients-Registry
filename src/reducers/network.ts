import { AnyAction } from 'redux';
import { NETWORK_ACTIONS } from '../actions/types';
import { NetworkStatus } from '../interfaces';

const INITIAL_STATE: NetworkStatus = { connected: true, type: '' };

const network = (state: NetworkStatus = INITIAL_STATE, action: AnyAction): NetworkStatus => {
    switch (action.type) {
        case NETWORK_ACTIONS.UPDATE:
            if (action.status) {
                return action.status;
            }
            return state;
        default:
            return state;
    }
};

export default network;
