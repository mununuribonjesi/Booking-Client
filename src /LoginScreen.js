import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserId} from './store/actions';
import { connect } from 'react-redux';
import {FontAwesome5 } from '@expo/vector-icons';
import config from '../config';
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
      isFailed: false,
      isError:false,
      errorMessage:''
    };
  }


  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }




isError = () =>
{
  this.setState({isError:!this.state.isError});
}







  async onLogin() {

    var response;
    try { 

     response = await axios({
      method: 'post',
      url: config.Authentication_URL+'/api/login',
      data: {
        'email': this.state.username,
        'password': this.state.password
      }
    });

    } catch (error) {      
      this.setState({errorMessage:JSON.stringify(error.response.data.message),isError:true});
      throw error;
    }



    const token = response.data.token;

    if (response.status === 200 && token) {
      this.setState({ isAuthenticated: true });
      this.setToken(token);
      var user = response.data.user;
      var userId = user._id;
      this.props.setUserId(userId);
      this.props.navigation.navigate('HomeScreen');
      //const value = await AsyncStorage.getItem('token')
    }
    
  }


  render() {

    return (
      <KeyboardAvoidingView
      style={styles.containerView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.containerView}> 
        <View style={styles.logoView}> 
        <Text style={styles.logoText}>Muni Book</Text>         
        </View>

          <View style={styles.loginFormView}>
           
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                placeholderTextColor='black'
                style={styles.loginFormTextInput}
                placeholderColor="#3897f1"
              />
              <TextInput
                value={this.state.password}
                placeholderTextColor='black'
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TouchableOpacity
                onPress={this.onLogin.bind(this)}
              >

                <View style={styles.loginButton}> 
               <Text style={styles.buttonText}>           
                 Login            
               </Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={() => { this.props.navigation.navigate('createAccountScreen')}}
              >
              <View style={styles.createButton}> 
              <Text style={styles.signUpButtonText}>           
                Dont have an account? 
                {" "}
                <Text style={styles.signUpText}> 
                  Sign up    
                </Text>
              </Text>
              </View>
              </TouchableOpacity>
          </View>


      <SCLAlert
      show={this.state.isError}
      onRequestClose={this,this.isError}
      theme="danger"
      title="Attempt failed"
      subtitle={this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff44f',
    height:'100%',
  },

  logoView:{

    height:'25%',
    marginTop:100

  },

  logoText: {
    fontSize: 85,
    fontWeight: "800",
    textAlign: 'center',
    color:'black'
  },
  loginFormView: {
    height:'50%',
  },
  loginFormTextInput: {
    height: 70,
    fontSize: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,

  },

  buttonText:{
    color:'white',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600'
  },

  signUpButtonText:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600'
  },

  loginView:{

    width:'100%'

  },

  signUpText:
  {

    color:'blue'

  },

  createButton: {
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'100%',
    alignSelf:'center',

  },

  loginButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    textAlign:'center',
    justifyContent:'center',
    width:'50%',
    alignSelf:'center'

  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});





const mapStatetoProps = (state) => {

    return {
      orders: state.orderReducer,
      service:state.orderReducer.service
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
  
    return {
      setUserId: (data) => dispatch(setUserId(data))
    }
  
  }


  
  
  export default connect(mapStatetoProps, mapDispatchToProps)(LoginScreen);

  
