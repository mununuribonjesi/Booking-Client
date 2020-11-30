import React, { Component } from 'react';
import {Keyboard,Image,FlatList, Text, View,StyleSheet, TextInput,TouchableHighlight, TouchableWithoutFeedback,TouchableOpacity, Alert, KeyboardAvoidingView,Dimensions} from 'react-native';
import { FontAwesome,FontAwesome5,MaterialIcons,Ionicons,AntDesign,Octicons } from '@expo/vector-icons';
import {ListItem,Avatar} from 'react-native-elements'
import {setBarber,setBarberId} from './store/actions'
import {connect} from  'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
class BookScreen extends Component
{
    constructor(props) {
        super(props);
        
        this.state = {
          stylists:[]
        };  
      }



      async componentDidMount()
      {

          const token = await AsyncStorage.getItem('token');

          const response = await axios({
            method: 'get',
            url: 'https://f62edfbf3607.ngrok.io/api/barbers',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          });
          
          try {

      
            if (response.status === 200) {
             
              const stylists = response.data.stylists;

              this.setState({stylists:stylists})
            
            }
      
          } catch (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          }
        }



      

       /*data = [
          { key:1,Name:"Captain",email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
          { key:2,Name:"J",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:3,Name:"fred",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:4,Name:"James",email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
          { key:5,Name:"carl",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:6,Name:"fred",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:7,Name:"James",email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
          { key:8,Name:"carl",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:9,Name:"fred",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:10,Name:"James",email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
          { key:11,Name:"carl",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:12,Name:"fred",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:13,Name:"James",email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
          { key:14,Name:"carl",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
          { key:15,Name:"fred",email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
      ]*/

       ListHeader = () => {
        //View to set in Header
        return (

          <View style={styles.headerFooterStyle}>
            <Text style={styles.textStyle}>
                Select Barber
            </Text>
          </View>

        );
      };
    


    render()
    {
    return (

   

<View styles={styles.list}> 
<View style={styles.headerFooterStyle}>
            <Text style={styles.textStyle}>
                Select Barber
            </Text>
          </View>
        <FlatList
          data={this.state.stylists}
          keyExtractor={(item,index)=> index.toString()}
          renderItem={({ item }) => (
<TouchableOpacity
  onPress={() =>{this.props.setBarber(item.Name),this.props.setBarberId(item._id),this.props.navigation.navigate('ServicesScreen')}}
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
         onPress={() => {this.props.setBarber(item.Name),this.props.setBarberId(item._id),this.props.navigation.navigate('ServicesScreen')}}
       >
         <Text>Book Now</Text>
 </TouchableOpacity>
          </ListItem>
          </TouchableOpacity>
          )}
        />
   </View>

    )
    }


    
}


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
    textStyle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 40,
        padding: 7
      },
      headerFooterStyle:{

        backgroundColor:'#fff44f'

      },
  
    wrappercontainer:{
      marginTop:30,
  
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#fff44f',
        padding: 10,
      },

    list:{
        fontSize:50,
        backgroundColor:'yellow'

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
      paddingLeft:20,
      width: '50%',
      flexDirection:'row'
  
    },
    item: {
      width: '100%', // is 50% of container width
      paddingLeft:10,
      height:'100%'
     
    },
  
    itemwrapper:{
  
    },
    logoText: {
      fontSize: 20,
      fontWeight: "800",
      marginTop: 20,
      textAlign: 'center',
    },
    itemtext:{
      textAlign:'left',
      marginTop: 10,
      fontSize:20
  
    }
  })


  const mapStatetoProps  = (state) =>
  {

    return {
      orders: state.orderReducer
    }
  }
 
  const mapDispatchToProps = (dispatch) =>
  { 

    return {
    setBarber: (data) => dispatch(setBarber(data)),
    setBarberId: (data) => dispatch(setBarberId(data))
    }

  }


export default connect(mapStatetoProps,mapDispatchToProps) (BookScreen);
