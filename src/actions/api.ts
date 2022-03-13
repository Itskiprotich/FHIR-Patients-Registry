import { Patient } from "../interfaces/patient";
import { CONSTANTS } from "../constants/constants";
import { getRequestConfig } from "./api_header";

export const loadPatients = () => {
    const headers = getRequestConfig();
    return fetch(
        `${CONSTANTS.APP_URL}${CONSTANTS.PATIENTS_URL}`,
        Object.assign({}, headers, {
            method: 'GET',
        }),
    );
};

export const addPatient = (patient: Patient) => {
    const headers = getRequestConfig();
    return fetch(
        `${CONSTANTS.APP_URL}${CONSTANTS.ADD_PATIENT}`,
        Object.assign({}, headers, {
            method: 'POST',
            body: JSON.stringify(patient.resource),
        }),
    );
};