import React from 'react';
import { FlatList, Text, View, TouchableOpacity,} from 'react-native';
import { ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {styles} from '../styles/BarberCstyles';

const BarberComponent = (props) => {

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
          onPress={() => { props.setBarber(item.Name), props.setBarberId(item._id), props.navigation.navigate('ServicesScreen',{isGetByService:false})}}
        >
          <ListItem
            style={styles.list} key={item._id} bottomDivider>
            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title>{item.Name}</ListItem.Title>
              </View>
            </ListItem.Content>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { props.setBarber(item.Name), props.setBarberId(item._id), props.navigation.navigate('ServicesScreen',{isGetByService:false})}}
            >
              <Text>Book Now</Text>
            </TouchableOpacity>
          </ListItem>
        </TouchableOpacity>
      )}
    />
  </View>
  );
};

export default BarberComponent

