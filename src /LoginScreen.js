import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      username: '',
      password: '',
      isFailed: false
    };
  }


  setToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }

  async onLogin() {

    const response = await axios({
      method: 'post',
      url: 'http://804405b72e85.ngrok.io/api/login',
      data: {
        'email': this.state.username,
        'password': this.state.password
      }
    });
    
    try {

      const token = response.data.token;

      if (response.status === 200 && token) {
        this.setState({ isAuthenticated: true });
        this.setToken(token);
        this.props.navigation.navigate('HomeScreen');
        //const value = await AsyncStorage.getItem('token')
      }

    } catch (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    }
  }


  render() {

    return (
    <View style={styles.containerView}> 
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <View style={styles.logoView}> 
              <Text style={styles.logoText}>Muni Book</Text>         
              </View> 
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </View>
  
    );
  }
}


export default LoginScreen;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff44f',
    height:'100%',
  },

  logoView:{

    height:'30%',
    marginTop:50

  },

  logoText: {
    fontSize: 85,
    fontWeight: "800",
    marginBottom: 50,
    textAlign: 'center',
    color:'black'
  },
  loginFormView: {
    height:'100%',
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,

  },

  buttonText:{
    color:'white',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600'
  },

  loginView:{

    width:'100%'

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

