import React, {useLayoutEffect} from 'react';
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
import {HomeScreenProps} from '.';

export default function HomeScreenClass(props: HomeScreenProps) {
  const {navigation, loadingProfile} = props;

  useLayoutEffect(() => {});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* <Ionicons name="menu" size={30} /> */}
          </TouchableOpacity>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>Hello</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderColor: '#C6C6C6',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 5,
            paddingVertical: 5,
            alignContent: 'center',
          }}>
          {/* <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          /> */}
          <TextInput placeholder="Search" />
        </View>

        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Health Centers
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: '#0aada8'}}>View all</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
