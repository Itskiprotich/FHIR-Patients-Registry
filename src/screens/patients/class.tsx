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
  const calculateAge = (dob: string) => {
    const date = new Date(dob);
    if (!(date instanceof Date)) {
      return dob;
    }
    return `${Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365),
    )} Yrs old`;
  };
  const getAvatarInitials = (textString: string) => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
  };
  const renderItem = ({item}: JSONObjectInterface) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(`clicked`);
        }}>
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
                onPress={() => {
                  console.log('Menu Clicked');
                }}
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
    </SafeAreaView>
  );
}
