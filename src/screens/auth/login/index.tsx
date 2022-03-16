import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import {ThunkDispatch} from 'redux-thunk';
import {StateInterface} from '../../../interfaces';
import {StackParamList} from '../../../constants/routes';
import {Action} from 'redux';
import React from 'react';
import AddPatientClass from '../../patients';
import {connect} from 'react-redux';
import {User} from '../../../interfaces/user';
import {signIn} from '../../../actions';

type HomeScreenNavigationProp = DrawerNavigationProp<StackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface ActionProps {
  signIn: (patient: User) => void;
}

export type PatientProps = ExternalProps & ActionProps;

const Signin = (props: PatientProps) => {
  return <AddPatientClass {...props} />;
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, Action>,
): ActionProps => {
  return {
    signIn: (user: User) => dispatch(signIn(user)),
  };
};

export default connect(null, mapDispatchToProps)(Signin);
