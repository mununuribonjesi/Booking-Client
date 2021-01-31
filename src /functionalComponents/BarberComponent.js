import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity,} from 'react-native';
import { CheckBox,ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {styles} from '../styles/BarberCstyles';
import UserAvatar from 'react-native-user-avatar';

const BarberComponent = (props) => {


  const[checkBoxes,setCheboxes] = useState(props.isChecked)
  const[isContinue,setisContinue] = useState()


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



  const isCheckBox = (index) => {

    console.log(index);
    let checkList = [...checkBoxes];

    for (var i = 0; i < checkList.length; i++) {
      checkList[i] = false;
    }

    checkList[index] = !checkList[index];

    if(checkList[index]===true)
    {

      props.setBarber(props.stylists[index].name);
      props.setBarberId(props.stylists[index]._id);
      setisContinue(true);

    }

    setCheboxes(checkList);
  }


  return (
    <View styles={styles.container}>
    <View style={styles.subHeader}>
      <Text style={styles.textStyle}>
        Select Barber
        </Text>
    </View>
    <View style={styles.Body}>

    <FlatList
      data={props.stylists}
      keyExtractor={(x,i) => i.toString()}
      renderItem={({ item,index }) => (
    
          <ListItem
          onPress={() => isCheckBox(index)}
          
            style={styles.list} key={item._id} bottomDivider>
         

            <UserAvatar size={100} name={item.name} src={item.uri} />

            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title>{item.name}</ListItem.Title>
              </View>
            </ListItem.Content>

            <CheckBox
            checked={checkBoxes[index]}
            onPress={() => isCheckBox(index)}
            checkedColor='black'
            size={40}
            />
  
          </ListItem>)}
    />

    </View>
    <View style={styles.Footer}> 
    {isContinue &&
    <TouchableOpacity
    onPress={() => {props.navigation.navigate(navigationString(),{isGetByService:props.isGetByService})}}
            >
              <Text style={styles.FooterText}>
                Continue
        </Text>
            </TouchableOpacity>
    }
            </View>
  </View>
  );
};

export default BarberComponent

