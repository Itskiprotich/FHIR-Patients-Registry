import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import {StackParamList} from '../constants/routes';
import {Colors} from '../constants/colors';
import HomeScreen from '../screens/patients';
import PatientDetails from '../screens/patients/details';
import AddPatient from '../screens/patients/add';

const Stack = createNativeStackNavigator<StackParamList>();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      console.log(`value== ${value}`);
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
      initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        options={{
          title: 'Registered Patients',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="PatientDetails"
        options={{
          title: 'Patient Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
        component={PatientDetails}
      />
      <Stack.Screen
        name="AddPatient"
        options={{
          title: 'New Patient',
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
        component={AddPatient}
      />
    </Stack.Navigator>

    //
  );
};

export default AuthStack;
