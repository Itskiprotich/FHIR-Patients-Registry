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
import {Colors} from '../../constants/colors';
import {calculateAge} from '../../constants/utils';

type HomeScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'PatientDetails'
>;

type HomeScreenRouteProp = RouteProp<StackParamList, 'PatientDetails'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface ActionProps {
  clearSession: () => void;
}

type PatientProps = ExternalProps & ActionProps;

export const PatientDetails = (props: PatientProps) => {
  const {patient} = props.route.params;
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: undefined,
      headerRight: () => {
        return (
          <>
            <View style={[AppStyles.rowFlex, AppStyles.headerRight]}>
              <Icon
                name="circle-edit-outline"
                size={24}
                color={Colors.white}
                onPress={() => {
                  console.log('click');
                  if (patient) {
                    console.log('Handle Edit');
                  }
                }}
              />
            </View>
          </>
        );
      },
    });
  }, [navigation]);

  const getView = (label: string, value: string) => {
    return (
      <View style={HomeStyles.container}>
        <Text style={{...HomeStyles.label, ...AppStyles.textLabel}}>
          {label}
        </Text>
        <Text style={{...HomeStyles.value}}>{value}</Text>
      </View>
    );
  };

  return patient ? (
    <KeyboardAwareScrollView>
      <View style={{...HomeStyles.body}}>
        {getView('First name', patient.resource.name[0].family)}
        {getView('Last name', patient.resource.name[0].given[0])}
        {getView('Phone Number', patient.resource.telecom[0].value)}
        {getView('ID Number', patient.resource.id)}
        {getView('Gender', patient.resource.gender)}
        {getView('Age', calculateAge(patient.resource.birthDate))}
        {getView('City', patient.resource.address[0].city)}
        {getView('Country', patient.resource.address[0].country)}
        {getView('Status', patient.resource.active ? 'Active' : 'Inactive')}
      </View>
    </KeyboardAwareScrollView>
  ) : null;
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

export default connect(null, mapDispatchToProps)(PatientDetails);
