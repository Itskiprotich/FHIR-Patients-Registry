import React, {useLayoutEffect, useState} from 'react';
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

export default function HomeScreenClass(props: HomeScreenProps) {
  const {navigation, loadingProfile} = props;
  const [patients, setPatients] = useState(props.patients || []);
  const [searchText, setSearchText] = useState('');
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
  const renderItem = ({item}: JSONObjectInterface) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(`clicked`);
        }}>
        <View>
          <Text style={{...AppStyles.textLabel}}>
            {`${item.fullUrl} ${item.fullUrl}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          Total Patients {patients.length}
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.sync();
          }}>
          <Text style={{color: '#0aada8'}}>View all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={{
            ...AppStyles.textInput,
          }}
          onChangeText={text => {
            console.log(`${text}`);
          }}
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
            `dependent-${index}-${item.fullUrl}-${item.fullUrl}`
          }
          extraData={patients}
        />
      ) : (
        <View style={AppStyles.alignCenter}>
          <Text>
            {searchText === ''
              ? `No dependents yet, you can add one.`
              : `No results found`}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
