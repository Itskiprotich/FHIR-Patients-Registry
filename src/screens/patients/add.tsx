import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../constants/routes';
import {AppStyles} from '../../constants/styles';
import {HomeStyles} from './styles';
import {StateInterface} from '../../interfaces';
import {clearSession} from '../../actions';
import {INITIAL_PATIENT, NewPatient} from '../../interfaces/patient';

type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'AddPatient'
>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'AddPatient'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface ActionProps {
  clearSession: () => void;
}

type PatientProps = ExternalProps & ActionProps;

type patientsKeys =
  | 'family'
  | 'given'
  | 'phone'
  | 'birthday'
  | 'city'
  | 'country';

type radioTypes = 'gender';

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

export const AddPatient = (props: PatientProps) => {
  const {navigation} = props;
  const [patient, setPatient] = useState<NewPatient>({...INITIAL_PATIENT});
  const [validate, setValidate] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: undefined,
      headerRight: undefined,
    });
  }, [navigation]);

  const handleFieldChange = (name: patientsKeys, value: string) => {
    const dep = {...patient};
    dep[name] = value;
    setPatient(dep);
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{...HomeStyles.body}}>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            Family Name
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <TextInput
            placeholder="e.g John"
            style={{
              ...AppStyles.textInput,
              ...(patient.family === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text => handleFieldChange('family', text)}
            value={patient.family}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            Given name
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <TextInput
            placeholder="e.g Doe"
            style={{
              ...AppStyles.textInput,
              ...(patient.given === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text => handleFieldChange('given', text)}
            value={patient.given}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            City
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <TextInput
            placeholder="e.g Nairobi"
            style={{
              ...AppStyles.textInput,
              ...(patient.city === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text => handleFieldChange('city', text)}
            value={patient.city}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            Country
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <TextInput
            placeholder="e.g Kenya"
            style={{
              ...AppStyles.textInput,
              ...(patient.country === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text => handleFieldChange('country', text)}
            value={patient.country}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, Action>,
): ActionProps => {
  return {
    clearSession: () => {
      dispatch(clearSession());
    },
  };
};

export default connect(null, mapDispatchToProps)(AddPatient);
