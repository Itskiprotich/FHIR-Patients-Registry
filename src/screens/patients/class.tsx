import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Platform,
  Alert,
  ScrollView,
  ImageComponent,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Colors} from '../../constants/colors';
import {AppStyles} from '../../constants/styles';
import {HomeScreenProps} from '.';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {JSONObjectInterface} from '../../interfaces/json';
import {HomeStyles} from './styles';
import {Patient} from '../../interfaces/patient';
import {calculateAge, getAvatarInitials} from '../../constants/utils';

export default function HomeScreenClass(props: HomeScreenProps) {
  const {navigation, loadingProfile} = props;
  const [patients, setPatients] = useState(props.patients || []);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setPatients(props.patients);
  }, [props.patients]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={AppStyles.rowFlexMargin}>
            <Icon
              name="menu"
              color={Colors.white}
              size={30}
              onPress={() => {
                console.log('Menu Clicked');
              }}
            />
          </View>
        );
      },
      headerRight: () => (
        <View style={AppStyles.headerButton}>
          <Icon
            onPress={() => {
              console.log('syncing patients now....');
              props.sync();
            }}
            name="sync"
            color={Colors.white}
            size={35}
          />
        </View>
      ),
    });
  }, [navigation]);

  const renderSeparator = () => {
    return <View style={{...AppStyles.separator}} />;
  };

  const showDetails = (patient: Patient) => {
    props.navigation.navigate('PatientDetails', {patient});
  };
  const addPatient = () => {
    props.navigation.navigate('AddPatient');
  };

  const renderItem = ({item}: JSONObjectInterface) => {
    return (
      <TouchableOpacity onPress={() => showDetails(item)}>
        <View style={HomeStyles.itemContainer}>
          <View style={HomeStyles.leftElementContainer}>
            <View style={HomeStyles.placeholderContainer}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                minimumFontScale={0.01}
                style={[
                  {fontSize: Math.round(50) / 2},
                  HomeStyles.placeholderText,
                ]}>
                {`${getAvatarInitials(
                  item.resource.name[0].family,
                )}${getAvatarInitials(item.resource.name[0].given[0])}`}
              </Text>
            </View>
          </View>

          <View style={HomeStyles.rightSectionContainer}>
            <View style={HomeStyles.mainTitleContainer}>
              <Text style={HomeStyles.titleStyle}>
                {`${item.resource.name[0].family} ${item.resource.name[0].given[0]}`}
              </Text>

              <Text style={HomeStyles.descriptionStyle}>
                {`${item.resource.telecom[0].value}`}
              </Text>
            </View>
            <View style={HomeStyles.rightTextContainer}>
              <Text style={HomeStyles.textStyle}>
                {`${calculateAge(item.resource.birthDate)}`}
              </Text>
            </View>

            <View style={HomeStyles.rightElementContainer}>
              <Icon
                name="share"
                color={Colors.primary}
                size={30}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (searchText === '') {
      setPatients(props.patients || []);
    } else {
      const deps = patients.filter(d => {
        return (
          d.resource.name[0].family
            .toLowerCase()
            .search(searchText.toLowerCase()) !== -1 ||
          d.resource.name[0].given[0]
            .toLowerCase()
            .search(searchText.toLowerCase()) !== -1 ||
          `${d.resource.name[0].family} ${d.resource.name[0].given[0]}`
            .toLowerCase()
            .search(searchText.toLowerCase()) !== -1
        );
      });
      setPatients(deps);
    }
  }, [searchText]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          Total Patients {patients.length}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.sync();
          }}></TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={{
            ...AppStyles.textInput,
          }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder={'Search'}
        />
      </View>
      {patients.length > 0 ? (
        <FlatList
          style={HomeStyles.flatList}
          data={patients}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) =>
            `patients-${index}-${item.resource.name[0].family}-${item.resource.name[0].given[0]}`
          }
          extraData={patients}
        />
      ) : (
        <View style={AppStyles.alignCenter}>
          <Text>
            {searchText === ''
              ? `No patients yet, you can add one.`
              : `No results found`}
          </Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          console.log('opening...');
        }}
        style={HomeStyles.touchableOpacityStyle}>
        <Icon
          name="plus-circle"
          color={Colors.white}
          size={35}
          onPress={() => {
            addPatient();
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
