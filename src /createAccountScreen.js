import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard,DatePickerIOS, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserId} from './store/actions';
import { connect } from 'react-redux';
import config from '../config';
import DatePicker from '@react-native-community/datetimepicker';

class createAccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      firstname: '',
      lastname:'',
      password: '',
      confirmPassword:'',
      email:'',
      date:'',
      chosenDate: new Date() 
    };
  }


  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }




  render() {

    return (
    <View style={styles.containerView}> 

          <View style={styles.loginFormView}>

          <TextInput
          value={this.state.firstname}
          onChangeText={(firstname) => this.setState({ firstname })}
          placeholder={'Forename'}
          placeholderTextColor='black'
          style={styles.loginFormTextInput}
          placeholderColor="#3897f1"
        />
        <TextInput
          value={this.state.lastname}
          onChangeText={(lastname) => this.setState({ lastname })}
          placeholder={'Surname'}
          placeholderTextColor='black'
          style={styles.loginFormTextInput}
          placeholderColor="#3897f1"
        />
           
              <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email Address'}
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
              <TextInput
                value={this.state.password}
                placeholderTextColor='black'
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Confrim Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />
              <TouchableOpacity
              >

                <View style={styles.loginButton}> 
               <Text style={styles.buttonText}>           
                 Create Account            
               </Text>
               </View>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('LoginScreen')}}
              >
              <View style={styles.createButton}> 
              <Text style={styles.signUpButtonText}>           
                Already have an account? 
                {" "}
                <Text style={styles.signUpText}> 
                  Sign In    
                </Text>
              </Text>
              </View>
              </TouchableOpacity>
          </View>
      </View>
  
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff44f',
    height:'100%',
  },


  logoText: {
    fontSize: 85,
    fontWeight: "800",
    textAlign: 'center',
    color:'black'
  },
  loginFormView: {
    height:'100%',
    marginTop:110
  },
  loginFormTextInput: {
    height: 60,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 25,

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


  
  
  export default connect(mapStatetoProps, mapDispatchToProps)(createAccountScreen);

  
