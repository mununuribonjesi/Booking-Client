import {styles} from '../styles/ServicesCstyles';
import React from 'react';
import {FlatList, Text, View,TouchableOpacity} from 'react-native';
import {CheckBox, ListItem} from 'react-native-elements';


export const Services = (props) => {


    return (

      

<View styles={styles.container}>

<View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Choose Service
            </Text>
        </View>

        <View style={styles.Body}>
         
         
          <FlatList
            data={props.data}
            keyExtractor={(item,index)=> index.toString()}
            renderItem={({ item, index }) => (

              <ListItem
                onPress={() => props.isCheckBox(index)}
                style={styles.list} key={item.key}>

                <CheckBox 
                  checked={props.ischecked[index]}
                  onPress={() => props.isCheckBox(index)}
                  checkedColor='black'
                  size={40}
                  ListFooterComponent={() => this.ListHeader()}
                />
                <ListItem.Content>
                  <ListItem.Title><Text style={styles.logoText}>{item.Name}</Text></ListItem.Title>
                  <ListItem.Title
                  ><Text> {"£" + item.Price + '.00'}</Text></ListItem.Title>
                </ListItem.Content>
              </ListItem>

            )}
          />
          
          <Text style={styles.textStyle}>
            {"£" + (props.total) + ".00"}
          </Text>

        </View>
  
        <View style={styles.Footer}>
          {props.total > 0 &&
        
          <TouchableOpacity
          onPress={() =>{props.setTotal(props.total),props.setService(props.services), props.navigation.navigate('SlotScreen')}}
          >

          <Text style={styles.FooterText}>
            Continue
          </Text>
          </TouchableOpacity>
    }
        </View>
    
   </View>
    )

}

