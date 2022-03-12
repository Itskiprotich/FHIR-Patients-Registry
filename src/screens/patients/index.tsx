import React from 'react';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AnyAction, Dispatch} from 'redux';
import {StackParamList} from '../../constants/routes';
import {StateInterface} from '../../interfaces';
import HomeScreenClass from './class';
import {clearSession, sync} from '../../actions';
import {ThunkDispatch} from 'redux-thunk';
import {Patient} from '../../interfaces/patient';

type HomeScreenNavigationProp = DrawerNavigationProp<StackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface StateProps {
  loadingProfile?: boolean;
  patients: Patient[];
}

interface ActionProps {
  clearSession: () => void;
  sync: () => void;
}

export type HomeScreenProps = ExternalProps & ActionProps & StateProps;

const HomeScreen = (props: HomeScreenProps) => {
  return <HomeScreenClass {...props} />;
};

const mapStateToProps = (state: StateInterface): StateProps => {
  return {
    loadingProfile:
      state.loading.userInit && state.loading.userInit.loadingProfile,
    patients: state.patients,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, AnyAction>,
): ActionProps => {
  return {
    clearSession: () => {
      dispatch(clearSession());
    },
    sync: () => {
      dispatch(sync());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
