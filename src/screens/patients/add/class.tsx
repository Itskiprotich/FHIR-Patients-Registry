import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {AppStyles} from '../../../constants/styles';
import {HomeStyles} from '../styles';
import {INITIAL_PATIENT, Patient} from '../../../interfaces/patient';
import Button from '../../../common/button';
import PhoneNumberInput from '../../../common/phone';
import RadioButton from '../../../common/radio';
import {validPhoneNumber} from '../../../constants/utils';
import {DateButton} from '../../../common/date';
import {PatientProps} from '.';

type patientsKeys =
  | 'resource.name[0].family'
  | 'resource.name[0].given[0]'
  | 'resource.telecom[0].value'
  | 'resource.birthDate'
  | 'resource.address[0].city'
  | 'resource.address[0].country';

type radioTypes = 'resource.gender' | 'resource.active ';

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const activeOptions = [
  {label: 'Active', value: 'true'},
  {label: 'Inactive', value: 'false'},
];

export default function AddPatientClass(props: PatientProps) {
  const {navigation, route} = props;
  const [patient, setPatient] = useState<Patient>({...INITIAL_PATIENT});
  const [validate, setValidate] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: undefined,
      headerRight: undefined,
    });
  }, [navigation]);

  const handleFieldChange = (name: patientsKeys, value: string) => {
    const dep = {...patient};
    dep.resource.resourceType = 'Patient';
    if (name === 'resource.name[0].family') {
      dep.resource.name[0].family = value;
    }
    if (name === 'resource.name[0].given[0]') {
      dep.resource.name[0].given[0] = value;
    }
    if (name === 'resource.telecom[0].value') {
      dep.resource.telecom[0].value = value;
    }
    if (name === 'resource.birthDate') {
      dep.resource.birthDate = value;
    }
    if (name === 'resource.address[0].city') {
      dep.resource.address[0].city = value;
    }
    if (name === 'resource.address[0].country') {
      dep.resource.address[0].country = value;
    }
    setPatient(dep);
  };

  const handleDateChange = (value: string | undefined) => {
    const dep = {...patient};
    if (value) {
      const date = new Date(value);
      const pad = (v: number) => (v < 10 ? `0${v}` : v);
      dep.resource.birthDate = `${date.getFullYear()}-${pad(
        date.getMonth() + 1,
      )}-${pad(date.getDate())}`;
    } else {
      dep.resource.birthDate = '';
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
      if (name === 'resource.gender') {
        dep.resource.gender = value;
      } else {
        dep.resource.active = value === 'true' ? true : false;
      }
    } else {
      if (name === 'resource.gender') {
        dep.resource.gender = value;
      } else {
        dep.resource.active = value === 'true' ? true : false;
      }
    }
    setPatient(dep);
  };
  const submitData = () => {
    if (
      patient.resource.name[0].family === '' ||
      patient.resource.name[0].given[0] === '' ||
      patient.resource.gender === '' ||
      patient.resource.address[0].city === '' ||
      patient.resource.address[0].country === '' ||
      patient.resource.birthDate === '' ||
      (patient.resource.telecom[0].value !== '' &&
        !validPhoneNumber(patient.resource.telecom[0].value))
    ) {
      setValidate(true);
      return false;
    }
    const dep = {...patient};
    dep.resource.resourceType = 'Patient';
    setPatient(dep);
    props.submitPatient({
      ...patient,
    });
    setPatient({...INITIAL_PATIENT});
    props.navigation.goBack();
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
              ...(patient.resource.name[0].family === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text =>
              handleFieldChange('resource.name[0].family', text)
            }
            value={patient.resource.name[0].family}
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
              ...(patient.resource.name[0].given[0] === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text =>
              handleFieldChange('resource.name[0].given[0]', text)
            }
            value={patient.resource.name[0].given[0]}
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
            onChangeText={text =>
              handleFieldChange('resource.telecom[0].value', text)
            }
            value={patient.resource.telecom[0].value}
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
            value={patient.resource.gender}
            onChange={(checked, value) =>
              handleRadioChange(checked, value, 'resource.gender')
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
            value={patient.resource.birthDate}
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
              ...(patient.resource.address[0].city === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text =>
              handleFieldChange('resource.address[0].city', text)
            }
            value={patient.resource.address[0].city}
          />

          <Text
            style={
              AppStyles.required
            }>{`For data sync please don't change the city name`}</Text>
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
              ...(patient.resource.address[0].country === '' && validate
                ? AppStyles.errorTextInput
                : {}),
            }}
            onChangeText={text =>
              handleFieldChange('resource.address[0].country', text)
            }
            value={patient.resource.address[0].country}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Text
            style={{
              ...AppStyles.textLabel,
              ...HomeStyles.textLabel,
            }}>
            Status
            <Text style={AppStyles.required}>{` *`}</Text>
          </Text>
          <RadioButton
            options={activeOptions}
            value={patient.resource.active ? 'true' : 'false'}
            onChange={(checked, value) =>
              handleRadioChange(checked, value, 'resource.active ')
            }
            validate={validate}
            wrapStyle={{...AppStyles.rowFlex, ...AppStyles.flex1}}
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
}
