import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {Alert, PermissionsAndroid, SafeAreaView, StatusBar} from 'react-native';

import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
  AlertInterface,
  LoadingInterface,
  NetworkStatus,
  StateInterface,
} from './src/interfaces';
import {AppStyles} from './src/constants/styles';
import AuthStack from './src/navigation/auth';
import {Colors} from './src/constants/colors';
import {setAlert, updateNetworkStatus} from './src/actions';
import LoadingComponent from './src/common/loading';

interface State {
  loading: LoadingInterface;
}

class App extends React.Component<AppProps, State> {
  private netWorkSubScription: NetInfoSubscription | null = null;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  public componentDidUpdate(prevProps: AppProps) {
    const {alert} = this.props;
    const prevAlert = prevProps.alert;
    if (alert.visible && prevAlert.visible !== alert.visible) {
      Alert.alert('info', alert.message, [
        {
          text: 'OK',
          onPress: () => this.props.setAlert({visible: false, message: ''}),
        },
      ]);
    }
  }

  private requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  public async componentDidMount() {
    await this.requestCameraPermission();
    this.netWorkSubScription = NetInfo.addEventListener(state => {
      this.props.updateNetworkStatus({
        connected: state.isConnected ? true : false,
        type: state.type,
      });
    });
  }

  public componentWillUnmount() {
    if (this.netWorkSubScription) {
      this.netWorkSubScription();
    }
  }
  public static getDerivedStateFromProps(props: AppProps, state: State) {
    if (props.loading != state.loading) {
      return {loading: props.loading};
    }
    return null;
  }

  public render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
        <SafeAreaView style={{...AppStyles.flex1, ...AppStyles.app}}>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
          <LoadingComponent loading={this.state.loading} />
        </SafeAreaView>
      </>
    );
  }
}

interface StateProps {
  alert: AlertInterface;
  loading: LoadingInterface;
}

interface ActionProps {
  setAlert: (alert: AlertInterface) => void;
  updateNetworkStatus: (status: NetworkStatus) => void;
}

type AppProps = StateProps & ActionProps;

const mapStateToProps = (state: StateInterface): StateProps => {
  const validToken = (date: string | undefined) => {
    if (date && date !== '') {
      if (new Date().getTime() > new Date(date).getTime()) {
        return false;
      }
    }
    return true;
  };
  return {
    alert: state.alert,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAlert: (alert: AlertInterface) => {
      dispatch(setAlert(alert));
    },
    updateNetworkStatus: (status: NetworkStatus) =>
      dispatch(updateNetworkStatus(status)),
    dispatch: dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
