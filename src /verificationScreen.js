import React, { Component } from 'react';
import axios from 'react-native-axios';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { setUserId} from './store/actions';
import { connect } from 'react-redux';
import config from '../config';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons'; 
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    };
  
    state={
        isResend:false
    }

    resend = () =>
    {
        this.setState({isResend:!this.state.isResend});

    }


    async verifificationMessage(email)
    {


      const response = await axios({
        method: 'post',
        url: config.Authentication_URL+'/api/resend',
        data: {
          'email':email,
        }
      });
      
      try {
  
        if (response.status === 200) {

          this.setState({isResend:!this.state.isResend});

        }
  
      } catch (error) {
        throw error;
      }
    }


  render() {


    const b = this.props.navigation.state.params.email;

    return (
      

    <View style={styles.containerView}> 


          <View style={styles.verificationFormView}>

          <MaterialCommunityIcons name="email-check-outline" size={200} color="black" />
        
              <View style={styles.createButton}> 


              <Text style={styles.signUpButtonText}>
              Check Your Email!
              </Text>

              <Text style={styles.verificationText}>
              To confirm your email address click the link
              in the email that we have sent to{" "}
              {b}
              </Text>
        
              <TouchableOpacity onPress={() => this.verifificationMessage(b)}>
              <Text style={styles.resendText}>
              <Text style={styles.signUpText}> 
              Re-send verification   
            </Text>
            </Text>
            </TouchableOpacity>


            <TouchableOpacity
            onPress={() => { this.props.navigation.navigate('LoginScreen')}}
            >

              <Text style={styles.signUpButtonText}>      
                Already have an account? 
                {" "}
          
              </Text>
              <Text style={styles.passwordSignIn}>
              <Text style={styles.signUpText}> 
              Use Your Password to sign in   
            </Text>
            </Text>
              </TouchableOpacity>
              </View>
       
              </View>

              <SCLAlert
              show={this.state.isResend}
              onRequestClose={this.resend}
              theme="info"
              title="Check Your Email!"
              subtitle="A verification email has been sent."
              headerIconComponent={<Entypo name="paper-plane" size={80} color="white" />}
            >
              <SCLAlertButton theme="info" onPress={this.resend}>OK</SCLAlertButton>
            </SCLAlert>
       
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

  verificationFormView: {
    height:'100%',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop:10,
    alignItems: 'center',
  },

  passwordSignIn:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600',
    marginTop:7,
    textDecorationLine:'underline'

  },

  signUpButtonText:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600'
  },

  verificationText:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600',
    marginTop:20,
    marginBottom:20
  },

  resendText:{
    color:'black',
    fontSize:20,
    textAlign:'center',
    fontWeight:'600',
    marginTop:5,
    marginBottom:20
  },


  loginView:{

    width:'100%'

  },

  signUpText:
  {

    color:'blue'

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


  
  
  export default connect(mapStatetoProps, mapDispatchToProps)(VerificationScreen);

  
