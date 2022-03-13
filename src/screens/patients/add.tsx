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
import {clearSession, newPatient} from '../../actions';
import {INITIAL_PATIENT, NewPatient, Patient} from '../../interfaces/patient';
import Button from '../../common/button';
import PhoneNumberInput from '../../common/phone';
import RadioButton from '../../common/radio';
import {validPhoneNumber} from '../../constants/utils';
import {DateButton} from '../../common/date';

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
  newPatient: (pa: Patient) => void;
}
interface State {
  pd: Patient;
}
type PatientProps = ExternalProps & ActionProps & State;

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

  const handleDateChange = (value: string | undefined) => {
    const dep = {...patient};
    if (value) {
      const date = new Date(value);
      const pad = (v: number) => (v < 10 ? `0${v}` : v);
      dep.birthday = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate(),
      )}`;
    } else {
      dep.birthday = '';
    }
    setPatient(dep);
  };
  const handleRadioChange = (
    checked: boolean,
    value: string,
    name: radioTypes,
  ) => {
    const dep = {...patient};
    if (checked) {
      dep[name] = value;
    } else {
      dep[name] = value;
    }
    setPatient(dep);
  };
  const submitData = () => {
    if (
      patient.family === '' ||
      patient.given === '' ||
      patient.gender === '' ||
      patient.city === '' ||
      patient.country === '' ||
      (patient.phone !== '' && !validPhoneNumber(patient.phone))
    ) {
      setValidate(true);
      return false;
    }
    // map data to fhir
    props.pd.resource.name[0].family = patient.family;
    props.pd.resource.name[0].given[0] = patient.given;
    props.pd.resource.gender = patient.gender;
    props.pd.resource.address[0].city = patient.city;
    props.pd.resource.address[0].country = patient.country;
    props.pd.resource.telecom[0].value = patient.phone;
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
            Phone number
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <PhoneNumberInput
            placeholder="Phone number (+254 xxxxxxxxx)"
            onChangeText={text => handleFieldChange('phone', text)}
            value={patient.phone}
            validate={validate}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            Gender
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <RadioButton
            options={genderOptions}
            value={patient.gender}
            onChange={(checked, value) =>
              handleRadioChange(checked, value, 'gender')
            }
            validate={validate}
            wrapStyle={{...AppStyles.rowFlex, ...AppStyles.flex1}}
          />
        </View>

        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...AppStyles.formLabel,
            }}>
            Date of birth <Text style={AppStyles.required}>*</Text>
          </Text>
          <DateButton
            value={patient.birthday}
            mode="date"
            max={new Date()}
            onChange={handleDateChange}
            validate={validate}
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
        <View
          style={{
            ...AppStyles.rowFlex,
            ...AppStyles.innerContainer,
            ...HomeStyles.subContainer,
          }}>
          <Button
            label={'Submit'}
            onPress={submitData}
            style={{...AppStyles.submitButton, ...{flex: 1}}}
            textSyle={AppStyles.whiteColor}
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
    newPatient: (pa: Patient) => dispatch(newPatient(pa)),
  };
};

export default connect(null, mapDispatchToProps)(AddPatient);
