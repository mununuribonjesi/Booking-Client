import React, { Component } from 'react';

import {Keyboard,Button,Image, Text, View,StyleSheet, TextInput,TouchableHighlight,TouchableNativeFeedback, TouchableWithoutFeedback,TouchableOpacity, Alert, KeyboardAvoidingView,Dimensions} from 'react-native';
import { FontAwesome,FontAwesome5,MaterialIcons,Ionicons,AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      isService: true,
      notService:false
    };


  }
  
  onLogin()
  {

  }

  onnavigation(screen)
  {

    this.props.navigation.navigate(screen);
    console.log(screen)
  }

  render() {
    const navigate = this.props.navigation;

    const dimensions = Dimensions.get('screen');
  

    return (

      <View style={styles.container}>
        <View style={styles.wrappercontainer}>
              <Text style={styles.logoText}>Muni Book</Text>

        <View style={styles.wrapper}>
        <View style={styles.item} 
      
        >

        <TouchableOpacity 
            onPress={() =>
              this.props.navigation.navigate("BookScreen",{
                isGetByService:false
              })
            }
  style={styles.iconWrapper
  }


  >
    
  <FontAwesome name="calendar-plus-o" size={40} color="black" />
  <Text style={styles.itemtext}>Book Appt</Text>
  </TouchableOpacity>

  </View>
  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('ServicesScreen',{
    isGetByService:true
  })}
  >
  <FontAwesome5 name="hand-holding-heart" size={40} color="black" />
  <Text style={styles.itemtext}>Services</Text>
  </TouchableOpacity>
  </View>

  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('AppointmentScreen')}
  >
  <MaterialIcons name="schedule" size={40} color="black" />
  <Text style={styles.itemtext}>Appointments</Text>
  </TouchableOpacity>
  </View>
        </View>

        <View style={styles.wrapper}>
        <View style={styles.item}>
        <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('GalleryScreen')}
  >
        <FontAwesome name="picture-o" size={40} color="black" />
  <Text style={styles.itemtext}>Gallery</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('AboutUsScreen')}
  >
    
  <Octicons name="info" size={40} color="black" />
  <Text style={styles.itemtext}>About US</Text>
  </TouchableOpacity>
  </View>

  <View style={styles.item}>
  <TouchableOpacity 
  onPress={() => this.props.navigation.navigate('OurTeamScreen')}
  style={styles.iconWrapper
  }
  >
  <Ionicons name="ios-people" size={40} color="black" />
  <Text style={styles.itemtext}>Our Team</Text>
  </TouchableOpacity>
  </View>
        </View>



        </View>

</View>
    );
  }
}


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignSelf:'stretch',
    backgroundColor:'#fff44f'
  },

  imagewrapper:{
    alignSelf:'center'
  },

  wrappercontainer:{
    marginTop:30,

  },

  iconWrapper:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:10

  },

  wrapper:{
    marginTop:50,
    paddingLeft:10,
    width: '35%',
    flexDirection:'row'

  },
  item: {
    width: '100%', // is 50% of container width
    paddingLeft:10,  
  },

  itemwrapper:{

  },
  logoText: {
    fontSize: 100,
    fontWeight: "800",
    marginTop: 40,
    textAlign: 'center',
  },
  itemtext:{
    textAlign:'left',
    marginTop: 10

  }
})


