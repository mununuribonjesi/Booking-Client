import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {ListItem } from 'react-native-elements';
import { setAuthentication, setOrganisationId, setService, setTotal } from './store/actions'
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


 
    async updateChanges()
    {
      label = 'radius'
      text = this.state.value;
      
      const update = {[label]:text};
      const userId = {_id:this.props.user.userId};

        await axios({
          method: 'POST',
          url: config.Authentication_URL+'/api/user',
          data: {

            update:update,
            userId:userId

          }
        }).then(response =>
          { 
            this.props.navigation.navigate("ProfileScreen");
          }).catch (error =>{
            if(error.response)
            {
                this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
            }
        })
    }

    setValue(value)
    {

        this.setState({value:value})
    }

    async logout()
    { 
         this.props.setAuthentication(false);
         await AsyncStorage.removeItem('token')
         await AsyncStorage.getItem('token');
         this.props.navigation.navigate("LoginScreen");
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

          <List.Item title={"Firstname\n"}
          description={this.props.user.firstname}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.props.user.firstname,label:"Firstname",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          

          <Divider style={{color:'black'}}/>


          <List.Item title={"Lastname\n"}
          description={this.props.user.lastname}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.props.user.lastname,label:"Lastname",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />

          <Divider style={{color:'black'}}/>


          <List.Item title={"Email\n"}
          description={this.props.user.email}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.props.user.email,label:"Email",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          <Divider style={{color:'black'}}/>

          
          
          <List.Item title={"D.O.B\n"}
          description={this.props.user.dob}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:this.props.user.dob,label:"Dob",password:false,delete:false
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

        <View style={{ flex: 1,top:10, alignItems: 'stretch',justifyContent: 'center' }}>
        <Slider
          value={Number(this.props.user.radius).toFixed(0)}
          onValueChange={(value) => this.setValue( value )}
          maximumValue={100}
          step={1}
          trackStyle={{ height: 10, color: 'blue' }}
        />
        <Text style={{marginTop:20,marginBottom:20}}>Radius: {this.state.value} miles</Text>
      </View>

      <TouchableOpacity
      
      onPress= {
        () => {
          this.updateChanges()
        }
      }
      >
      <View style={styles.saveButton}> 
 

     <Text style={styles.buttonText}>      
  
       <Text style={{paddingLeft:20,marginTop:50}}>Save</Text>          
     </Text>


    </View>
    </TouchableOpacity>

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
      onPress={() =>
        this.logout()
      }
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


  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    height: 40,
    textAlign:'center',
    justifyContent:'center',
    width:'20%',
    alignSelf:'center',
    marginBottom:20
  },

  buttonText:{
    color:'white',
    fontSize:RFValue(20),
    textAlign:'center',
    fontWeight:'600',
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

const mapStatetoProps = (state) => {

  return {
    user: state.userReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    setAuthentication:(isAuthenticated) => dispatch(setAuthentication(isAuthenticated))
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileScreen);
