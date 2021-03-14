import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,Animated} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { setAuthentication, setUpdate, setUser,setUserCache,setUserId} from './store/actions';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import {Divider,List,} from 'react-native-paper';
import { Feather,AntDesign,Entypo} from '@expo/vector-icons'; 
import { Slider } from 'react-native-elements';
import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

class ProfileScreen extends Component
{

    constructor(props) {
        super(props);

        this.state ={
            value:20,
            data:""
        }
    }

    async componentDidMount()
    {

      var authenticatedUser = await AsyncStorage.getItem('user');
      var data = JSON.parse(authenticatedUser);
      console.log(data);
      this.setState({data:data})

      console.log(this.state.data);

    }

    async componentDidUpdate()
    {

      if(this.props.update)
      {
      var authenticatedUser = await AsyncStorage.getItem('user');
      var data = JSON.parse(authenticatedUser);
      this.setState({data:data});
      console.log(this.state.data);
      this.props.setUpdate(false);
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

      var user = this.state.data;
      var dob = moment(user.dob).format("DD-MM-YYYY")
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
          description={user.firstname}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:user.firstname,label:"Firstname",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          

          <Divider style={{color:'black'}}/>


          <List.Item title={"Lastname\n"}
          description={user.lastname}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:user.lastname,label:"Lastname",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />

          <Divider style={{color:'black'}}/>


          <List.Item title={"Email\n"}
          description={user.email}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:user.email,label:"Email",password:false,delete:false
              })
            }
            
            
            ><Feather name="edit" style={{marginTop:35,paddingRight:20}} size={24} color="black" /></TouchableOpacity>}
          
          />
          <Divider style={{color:'black'}}/>

          
          
          <List.Item title={"D.O.B\n"}
          description={dob}
          right={props => <TouchableOpacity 

            onPress={() =>
              this.props.navigation.navigate("UpdateScreen",{
                text:dob,label:"Dob",password:false,delete:false
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
          value={Number(user.radius).toFixed(0)}
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
              text:this.state.password,label:"password",password:true,delete:false
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
    update: state.updateReducer.update
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
        setAuthentication:(bool)=> dispatch(setAuthentication(bool)),
        setUser: (userId, firstname, lastname, email, dob, radius, isAuthenticated) => dispatch(setUser(userId, firstname, lastname, email, dob, radius, isAuthenticated)),
        setUpdate:(update)=> dispatch(setUpdate(update))
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileScreen);
