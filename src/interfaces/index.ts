import { Patient } from './patient';

export interface NetworkStatus {
    connected: boolean;
    type: string;
}
export interface AlertInterface {
    message: string,
    visible: boolean;
}

export interface LoadingInterface {
    loading: boolean;
    message: string;
    userInit?: UserInitLoadingInterface;
}

export interface UserInitLoadingInterface {
    loadingProfile: boolean;
}

export interface StateInterface {
    alert: AlertInterface;
    loading: LoadingInterface;
    network: NetworkStatus;
    patients: Patient[];
}
export interface Option {
    label: string;
    value: string;
}