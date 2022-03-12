import React from 'react';
import {connect} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Dispatch} from 'redux';
import {StackParamList} from '../../constants/routes';
import {StateInterface} from '../../interfaces';
import HomeScreenClass from './class';
import {clearSession} from '../../actions';

type HomeScreenNavigationProp = DrawerNavigationProp<StackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'Home'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface StateProps {
  loadingProfile?: boolean;
}

interface ActionProps {
  clearSession: () => void;
}

export type HomeScreenProps = ExternalProps & ActionProps & StateProps;

const HomeScreen = (props: HomeScreenProps) => {
  return <HomeScreenClass {...props} />;
};

const mapStateToProps = (state: StateInterface): StateProps => {
  return {
    loadingProfile:
      state.loading.userInit && state.loading.userInit.loadingProfile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ActionProps => {
  return {
    clearSession: () => dispatch(clearSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
