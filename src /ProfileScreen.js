import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {ListItem } from 'react-native-elements';
import { setOrganisationId, setService, setTotal } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesome5 } from '@expo/vector-icons';
import {Divider, DataTable,Drawer,List,TextInput } from 'react-native-paper';
import { Feather,AntDesign,Entypo,SimpleLineIcons } from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';
import config from '../config';
import { relative } from 'path';
import { ScrollView } from 'react-native-gesture-handler';

class ProfileScreen extends Component
{

    constructor(props) {
        super(props);

        this.state ={
            value:20
        }
    }

    data = [
        {firstName:"Mununuri",
        lastName:"Bonjesi",
        changePassword:"Change Password",
        email:"Mununuri.Bonjesi@gmail.com",
        dob:"12-05-1993",
        password:""
    }
    ]

    setValue(value)
    {

        this.setState({value:value})
    }


    render()
    {
    return (

        <ScrollView> 
        <View style={styles.containerView}> 
        <View style={styles.profile}> 
        <List.Section title={<AntDesign name="profile" size={24} color="black"><Text style={{right:15}}> Profile</Text></AntDesign>}>
        <List.Accordion
          title="Personal Information"
          >
          <Divider style={{color:'black'}}/>

          <List.Item title={"Forename\n"}
          description={this.data[0].firstName}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.data[0].firstName,label:"Forename",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          

          <Divider style={{color:'black'}}/>


          <List.Item title={"Surname\n"}
          description={this.data[0].lastName}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.data[0].lastName,label:"Surname",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />

          <Divider style={{color:'black'}}/>


          <List.Item title={"Email\n"}
          description={this.data[0].email}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.data[0].email,label:"Email",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          <Divider style={{color:'black'}}/>

          
          
          <List.Item title={"D.O.B\n"}
          description={this.data[0].dob}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.data[0].dob,label:"DOB",password:false,delete:false
              })
            }>
            <Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          />
          <Divider style={{color:'black'}}/>

        </List.Accordion>

        <Divider style={{color:'black'}}/>

        <List.Accordion
        title="Location Settings"
        >
        <Divider style={{color:'black'}}/>
        <View style={{ flex: 1, alignItems: 'stretch', marginTop:20,justifyContent: 'center' }}>
        <Slider
          value={this.state.value.toFixed(0)}
          onValueChange={(value) => this.setState({ value })}
          maximumValue={100}
          minimumValue={10}
          step={1}
          trackStyle={{ height: 10, color: 'blue' }}
        />
        <Text style={{marginTop:20,marginBottom:20}}>Radius: {this.state.value} miles</Text>
      </View>
      <Divider style={{color:'black'}}/>
      </List.Accordion>
   
      <Divider style={{color:'black'}}/>

        <Divider style={{color:'black'}}/>
             <List.Accordion
          title="Account Settings"
          >
          <Divider style={{color:'black'}}/>
          <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("UpdateScreen",{
              text:this.state.password,label:"",password:true,delete:false
            })
          }
          
          > 
          <List.Item title={<Text  style={{color:'green'}} >Change Password</Text>}/>
          </TouchableOpacity>
          <Divider style={{color:'black'}}/>
          <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("UpdateScreen",{
              text:this.state.password,label:"confirm password",password:false,delete:true
            })
          }
          
          > 
          <List.Item  title={<Text style={{color:'red'}}>Delete Account</Text>}/>
          </TouchableOpacity>
          <Divider style={{color:'black'}}/>
        </List.Accordion>


        <Divider style={{color:'black'}}/>



  

   <Divider style={{color:'black'}}/>
   <List.Accordion
title="Terms & Conditions"
>
<Divider style={{color:'black'}}/>
<TouchableOpacity> 
<List.Item title={<Text  style={{color:'black'}} ></Text>}/>
</TouchableOpacity>
</List.Accordion>


<Divider style={{color:'black'}}/>


 

        </List.Section>
        </View>

  
      </View>
      <View style='footer'> 
      <TouchableOpacity
      >
      <View style={styles.loginButton}> 
 

     <Text style={styles.buttonText}>      
     <Entypo name="log-out" size={24} color="white" />     
       <Text style={{paddingLeft:20}}>Sign Out   </Text>          
     </Text>


    </View>
    </TouchableOpacity>
    </View>
        </ScrollView>

        

        



    )
    }



}

export const styles = StyleSheet.create({

    containerView:{
        justifyContent: 'center',
        height: '100%',
        flex: 1,
        flexDirection:'row'
    },

    table: {
    fontSize: RFValue(1),
  },
  loginButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 60,
    textAlign:'center',
    justifyContent:'center',
    width:'90%',
    alignSelf:'center',



  },

  footer:{
    height:'15%'

  },

  profile:{
      flex:1,
    height:'85%'
  },
  buttonText:{
    color:'white',
    fontSize:RFValue(20),
    textAlign:'center',
    fontWeight:'600',
 

  },

})
export default ProfileScreen
