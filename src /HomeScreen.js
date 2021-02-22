import React, { Component } from 'react';

import {Keyboard,Button,Image, Text, View,StyleSheet, TextInput,TouchableHighlight,TouchableNativeFeedback, TouchableWithoutFeedback,TouchableOpacity, Alert, KeyboardAvoidingView,Dimensions} from 'react-native';
import { FontAwesome,FontAwesome5,MaterialIcons,Ionicons,AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons'; 
import Logo from '../assets/MuniBook.png';
import { RFValue } from "react-native-responsive-fontsize";


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
  

    return (

      <View style={styles.container}>
        <View style={styles.wrappercontainer}>
        <Image style={styles.Logo} source={Logo} />

        <View style={styles.wrapper}>
        <View style={styles.item} 
      
        >

        <TouchableOpacity 
            onPress={() =>
              this.props.navigation.navigate("LocationScreen",{
                isGetByService:false
              })
            }
  style={styles.iconWrapper
  }>
    
  <FontAwesome name="calendar-plus-o" size={RFValue(20)} color="black" />
  <Text style={styles.itemtext}>Book Appt</Text>
  </TouchableOpacity>
  </View>


  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('LocationScreen',{
    isGetByService:true
  })}
  >
  <FontAwesome5 name="hand-holding-heart" size={RFValue(25)} color="black" />
  <Text style={styles.itemtext}>Services</Text>
  </TouchableOpacity>
  </View>


  

  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('AppointmentScreen')}
  >
  <MaterialIcons name="schedule" size={RFValue(30)} color="black" />
  <Text style={styles.itemtext}>Bookings</Text>
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
        <FontAwesome name="picture-o" size={RFValue(30)} color="black" />
  <Text style={styles.itemtext}>Gallery</Text>
  </TouchableOpacity>
  </View>
  <View style={styles.item}>
  <TouchableOpacity 
  style={styles.iconWrapper
  }
  onPress={() => this.props.navigation.navigate('AboutUsScreen')}
  >
    
  <Octicons name="info" size={RFValue(30)} color="black" />
  <Text style={styles.itemtext}>About US</Text>
  </TouchableOpacity>
  </View>

  <View style={styles.item}>
  <TouchableOpacity 
  onPress={() => this.props.navigation.navigate('OurTeamScreen')}
  style={styles.iconWrapper
  }
  >
  <Ionicons name="ios-people" size={RFValue(30)} color="black" />
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
    flexDirection: 'row',
    backgroundColor:'#fff44f',
    width:'100%',
    height:'100%'
  },


  wrappercontainer:{
    marginTop:30,

  },
  Logo:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:'17%'

},

  iconWrapper:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:75,
    height:75,
    backgroundColor:'white',
    borderRadius:10

  },

  wrapper:{
    marginTop:50,
    width: '33%',
    flexDirection:'row'

  },
  item: {
    width: '100%', // is 50% of container width
    alignItems:'center'
    
  },

  itemwrapper:{

  },
  logoText: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 40,
    textAlign: 'center',
  },
  itemtext:{
    textAlign:'left',
    fontSize:RFValue(10),
    marginTop: 10

  },

  icon:{
    fontSize:RFValue(30),


  }
})


