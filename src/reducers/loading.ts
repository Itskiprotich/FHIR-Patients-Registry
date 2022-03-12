import { AnyAction } from "redux";
import { LOADING } from "../actions/types";
import { LoadingInterface, UserInitLoadingInterface } from "../interfaces";


const INITIAL_STATE: LoadingInterface = {
    loading: false,
    message: '',
    userInit: {
        loadingProfile: false,
    }
};

type userInitValues = 'loadingProfile';
export const getLoading = (name: userInitValues, state: UserInitLoadingInterface) => {
    let loading = false;
    const keys: userInitValues[] = ['loadingProfile'];
    const index = keys.indexOf(name);
    keys.forEach((key: userInitValues) => {
        if (key !== name) {
            if (state[key]) {
                loading = true;
            }
        }
    });
    return loading;
};

const loading = (state = INITIAL_STATE, action: AnyAction) => {
    const { userInit } = state;
    switch (action.type) {
        case LOADING.SET_LOADING:
            if (action.loading) {
                const newState = { ...state };
                if (action.loading.message) {
                    newState.message = action.loading.message
                }
                if (action.loading.loading != null) {
                    newState.loading = action.loading.loading
                }
                return newState;
            }
            return action.loading;
        case LOADING.LOADING_PROFILE:
            return { ...state, userInit: { ...state.userInit, loadingProfile: true } };
        case LOADING.LOADED_PROFILE:
            if (userInit) {
                return { ...state, userInit: { ...state.userInit, loadingProfile: false } };
            }
            return state;
        default:
            return state // The main page is the default page.

    }
}

export default loading
