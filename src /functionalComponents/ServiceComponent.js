import React, { useState } from 'react';
import {FlatList, Text, View,TouchableOpacity} from 'react-native';
import {CheckBox, ListItem} from 'react-native-elements';
import {styles} from '../styles/checkOutCstyles';
import {UIActivityIndicator} from 'react-native-indicators';


export const ServiceComponent = (props) => {

  const[checkBoxes,setCheckboxes] = useState(props.isChecked);
  const[total,setTotal]=useState(props.total);
  const[services,setServices]=useState(props.services);

  ListHeader = () => {
    return (

      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
          Select Barber
            </Text>
      </View>

    );
  };


  const isCheckBox = (index) => {

    let checkList = [...checkBoxes];

    for (var i = 0; i < checkList.length; i++) {

      checkList[i] = false;

    }

    checkList[index] = !checkList[index];

    if (checkList[index] === true) {

      var selected = [];
      selected.push({ Name: props.data[index].name, Price: props.data[index].price, Duration: props.data[index].duration, skillId:props.data[index]._id });
      setServices(selected);
      setTotal(props.data[index].price);

    }

    setCheckboxes(checkList);

  }

  return(

    (props.isLoading == true ?
      <View style={styles.loading}>
      <UIActivityIndicator size={80} color="black" />
    </View>
:[

    <View styles={styles.container}>
      <View style={styles.subHeader}>
        <Text style={styles.textStyle}>
          Choose Service
          </Text>
      </View>
      <View style={styles.Body}>
        <FlatList
          data={props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ListItem
              onPress={() => isCheckBox(index)}
              style={styles.list} key={item.key}>
              <CheckBox
                checked={checkBoxes[index]}
                onPress={() => isCheckBox(index)}
                checkedColor='black'
                size={40}
                ListFooterComponent={() => ListHeader()}
                disabled={!checkBoxes[index]}
              />
              <ListItem.Content>
                <ListItem.Title><Text style={styles.logoText}>{item.name}</Text></ListItem.Title>
                <ListItem.Title
                ><Text> {"£" + item.price + '.00'}</Text></ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <Text style={styles.textStyle}>
          {"£" + (total) + ".00"}
        </Text>
      </View>
      <View style={styles.Footer}>
        {(total > 0 && !props.isGetByService) &&
          <TouchableOpacity
            onPress={() => {props.setTotal(total), props.setService(services),props.navigation.navigate('SlotScreen') }}
          >
            <Text style={styles.FooterText}>
              Continue
        </Text>
          </TouchableOpacity>
        }
        {(total > 0 && props.isGetByService) &&
          <TouchableOpacity
            onPress={() => {
              props.setTotal(total), props.setService(services), props.navigation.navigate('BookScreen', {
                isGetByService: props.isGetByService
              })
            }}
          >
            <Text style={styles.FooterText}>
              Continue
      </Text>
          </TouchableOpacity>
        }
      </View>
    </View>
      ])
  )
}

