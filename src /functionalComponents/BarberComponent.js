import React from 'react';
import { FlatList, Text, View, TouchableOpacity,} from 'react-native';
import { ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {styles} from '../styles/BarberCstyles';
import UserAvatar from 'react-native-user-avatar';

const BarberComponent = (props) => {

  const navigationString = () =>
  {

    var screen = ''

    if(props.isGetByService)
    {
      screen = 'SlotScreen'
    }

    else
    {
      screen= 'ServicesScreen'
    }

    return screen

  }

  return (
    <View styles={styles.list}>
    <View style={styles.headerFooterStyle}>
      <Text style={styles.textStyle}>
        Select Barber
        </Text>
    </View>
    <FlatList
      data={props.stylists}
      keyExtractor={(x,i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => { props.setBarber(item.name), props.setBarberId(item._id), props.navigation.navigate(navigationString(),{isGetByService:props.isGetByService})}}
        >
       
          <ListItem
            style={styles.list} key={item._id} bottomDivider>
            <UserAvatar size={100} name={item.name} src={item.uri} />
            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title>{item.name}</ListItem.Title>
              </View>
            </ListItem.Content>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { props.setBarber(item.name), props.setBarberId(item._id), props.navigation.navigate(navigationString(),{isGetByService:props.isGetByService})}}
            >
              <Text style={styles.bookText}>Book Now</Text>
            </TouchableOpacity>
          </ListItem>
        </TouchableOpacity>
      )}
    />
  </View>
  );
};

export default BarberComponent

