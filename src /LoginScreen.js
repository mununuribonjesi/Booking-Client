import React, { Component } from 'react';
import axios from 'react-native-axios';
import { Keyboard, Button, Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';
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
      url: 'https://e99e0c6495d7.ngrok.io/api/login',
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
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginFormView}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Muni Book</Text>
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                style={styles.loginFormTextInput}
                placeholderColor="#3897f1"
              />
              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                placeholderColor="#c4c3cb"
                style={styles.loginFormTextInput}
              />

              <Button
                title={'Login'}
                style={styles.loginButton}
                onPress={this.onLogin.bind(this)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}


export default LoginScreen;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: '#fff44f'
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 85,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 50,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
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
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
});

