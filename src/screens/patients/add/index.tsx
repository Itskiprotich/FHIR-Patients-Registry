import React from 'react';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Action, AnyAction, Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {submitPatient} from '../../../actions';
import {StackParamList} from '../../../constants/routes';
import {Patient} from '../../../interfaces/patient';
import AddPatientClass from './class';
import {StateInterface} from '../../../interfaces';

type HomeScreenNavigationProp = DrawerNavigationProp<StackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface ActionProps {
  submitPatient: (patient: Patient) => void;
}

export type PatientProps = ExternalProps & ActionProps;

const AddPatient = (props: PatientProps) => {
  return <AddPatientClass {...props} />;
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, Action>,
): ActionProps => {
  return {
    submitPatient: (patient: Patient) => dispatch(submitPatient(patient)),
  };
};

export default connect(null, mapDispatchToProps)(AddPatient);
