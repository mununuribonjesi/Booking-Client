

import React , {Component} from 'react';
import { SafeAreaView, StyleSheet, View, Button,Text } from "react-native";
import { WebView } from 'react-native-webview';
import { Modal, Portal, Provider } from 'react-native-paper';
import WebViewModalProvider, { WebViewModal } from "react-native-webview-modal";
import {UIActivityIndicator} from 'react-native-indicators';
import { RFValue } from "react-native-responsive-fontsize";

class PrivacyPolicy extends Component{

  state = {
      accepted: false
  }

  render(){
    return (



           
        <WebViewModalProvider>
        <View style={StyleSheet.absoluteFill}>
          <SafeAreaView />
          <WebView
          startInLoadingState={true}
            visible={true}
            source={{ uri: "https://www.iubenda.com/privacy-policy/78734417" }}
            renderLoading={() => {
              return   <View style={styles.loading}>
              <UIActivityIndicator name="Saving" size={80} color="black" />
              <Text style={styles.loadingText}> Privacy Policy </Text>
            </View>
            }}
          />
        </View>
      </WebViewModalProvider>

       
    

 



    );

}
}


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },

  loadingText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: RFValue(30),
    color: '#4285F4'
  },
  })








export default PrivacyPolicy;
