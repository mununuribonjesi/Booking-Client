import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,AppRegistry,Animated,Modal} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { setAuthentication, setUpdate, setUser,setUserCache,setUserId} from './store/actions';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import {Divider,List,} from 'react-native-paper';
import { Feather,AntDesign,Entypo} from '@expo/vector-icons'; 
import {BallIndicator} from 'react-native-indicators';
import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import TermsAndConditions from './functionalComponents/TermsAndConditions';
import PrivacyPolicy from './functionalComponents/PrivacyPolicy';
import { Ionicons } from '@expo/vector-icons'; 
class ProfileScreen extends Component
{

    constructor(props) {
        super(props);

        this.state ={
            value:'',
            data:"",
            termsAndConditions:false,
            privacyPolicy:false,
            isSaving:false,
        }
        this.isTermsAndConditions = this.isTermsAndConditions.bind(this);
        this.isPrivacyPolicy = this.isPrivacyPolicy.bind(this);
    }


    isTermsAndConditions()
    {
  
      this.setState({termsAndConditions:!this.state.termsAndConditions})
  
    }
  
    isPrivacyPolicy()
    {
      this.setState({privacyPolicy:!this.state.privacyPolicy})
    }

    async componentDidMount()
    {

      var authenticatedUser = await AsyncStorage.getItem('user');
      var data = JSON.parse(authenticatedUser);

      this.setState({data:data});
      this.setState({value:data.radius});
    }

    async componentDidUpdate()
    {

      if(this.props.update)
      {
      var authenticatedUser = await AsyncStorage.getItem('user');
      var data = JSON.parse(authenticatedUser);
      this.setState({data:data});
      this.setState({value:data.radius});
      this.props.setUpdate(false);
      }

    }



    async updateChanges()
    {

      this.setState({isSaving:true})
      label = 'radius'
      text = this.state.value;
      
      const update = {[label]:text};
      const userId = {_id:this.props.order.userId};

      console.log(userId);


        await axios({
          method: 'POST',
          url: config.Authentication_URL+'/api/user',
          data: {

            update:update,
            userId:userId

          }
        }).then(response =>
          { 

            AsyncStorage.removeItem('user');
            AsyncStorage.setItem('user', JSON.stringify(response.data.update));
            this.props.setUpdate(true);
            this.setState({isSaving:false});
          }).catch (error =>{
            if(error.response)
            {
                this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
            }
        })

        this.setState({isSaving:false});
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


        <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>

        <Modal
        visible={this.state.termsAndConditions}
        >
            <View style={styles.modal}>
            <View style={styles.modalHeader}> 
            <View style={styles.modalClose}> 
            <TouchableOpacity onPress={() =>{this.isTermsAndConditions()} }> 
            <Text style={styles.modalButtonText}>           
              Close          
            </Text>
            </TouchableOpacity>
            </View>
            </View>
  
                <View style={styles.modalContainer}>
  
              
                <TermsAndConditions />
  
                </View>
            </View>
        </Modal>
  
  
        <Modal
        visible={this.state.privacyPolicy}
        >
            <View style={styles.modal}>
            <View style={styles.modalHeader}> 
            <View style={styles.modalClose}> 
            <TouchableOpacity onPress={() =>{this.isPrivacyPolicy()} }> 
            <Text style={styles.modalButtonText}>           
              Close          
            </Text>
            </TouchableOpacity>
            </View>
            </View>
  
                <View style={styles.modalContainer}>
  
              
                <PrivacyPolicy />
  
                </View>
            </View>
        </Modal>
  
    </View>
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

        <List.Accordion
        title="Location Settings"
        >

        <View style={styles.container}>
        <Slider
          value={this.state.value}
          useNativeDriver={true}
          onValueChange={value => this.setState({ value })}
          step={1}
          maximumValue={100}
          minimumValue={5}
        />
        <Text style={{marginTop:20}}>
          Radius: {this.state.value} miles
        </Text>
        <TouchableOpacity
      
        onPress= {
          () => {
            this.updateChanges()
          }
        }
        >
        <View style={styles.saveButton}> 

        {this.state.isSaving &&

          <View>
          <BallIndicator name="Saving" size={80} color="green" />
        </View> }

        {this.state.value!=this.state.data.radius && !this.state.isSaving &&    

        <View style={styles.saveBackgroundColor}>
       <Text style={styles.buttonText}>      
    
         <Text style={{paddingLeft:20,marginTop:50}}>Save</Text>          
       </Text>
       </View>
   
      }
  
      </View>

      </TouchableOpacity>
      </View>

        </List.Accordion>

        



  

   <Divider style={{color:'black'}}/>
   <List.Accordion
title="Terms & Policies"
>
<Divider style={{color:'black'}}/>

<TouchableOpacity 
onPress={() => this.isTermsAndConditions()}
>

<List.Item
title="Terms & Conditions"
left={props => <List.Icon {...props} icon="file" />}
/>
</TouchableOpacity>

<TouchableOpacity 
onPress={() => this.isPrivacyPolicy()}
>

<Divider style={{color:'black'}}/>
<List.Item 
title="Privacy Policy"
left={props => <List.Icon style={{fontSize:20}}{...props} icon="file" />}
/>
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


  saveBackgroundColor:{
    backgroundColor: 'green',
    height: 50,
    borderRadius: 5,
    textAlign:'center',
    justifyContent:'center',

  },


  saveButton: {

    height: 40,


    width:'20%',
    alignSelf:'center',
    marginBottom:20,
    marginTop:20
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

  modal:{
    backgroundColor:'#d3d3d3'

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


  TermsView: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'100%',
    alignSelf:'center',
    marginBottom:10,
    width:'20%',
    

  },

modalContainer : {
    backgroundColor : 'white',
    width : '100%',
    height : '90%',
},
ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
},

modalClose:
{


    backgroundColor: '#d3d3d3',
    height: 60,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'100%',
    alignSelf:'center',
    marginTop:'9%',
    paddingLeft:15



},
container: {
  flex: 1,
  marginLeft: 10,
  marginRight: 10,
  alignItems: "stretch",
  justifyContent: "center"
},
modalHeader:{
  height:'13%'

},



modalButtonText:{
  color:'black',
  fontSize:20,
  fontWeight:'600'
  
},


})

const mapStatetoProps = (state) => {

  return {
    user: state.userReducer,
    update: state.updateReducer.update,
    order: state.orderReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
        setAuthentication:(bool)=> dispatch(setAuthentication(bool)),
        setUser: (userId, firstname, lastname, email, dob, radius, isAuthenticated) => dispatch(setUser(userId, firstname, lastname, email, dob, radius, isAuthenticated)),
        setUpdate:(update)=> dispatch(setUpdate(update))
  }
}

AppRegistry.registerComponent("ProfileScreen",()=> ProfileScreen);

export default connect(mapStatetoProps,mapDispatchToProps)(ProfileScreen);
