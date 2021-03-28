
import React , {Component} from 'react';
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import { WebView } from 'react-native-webview';
import { Modal, Portal, Provider } from 'react-native-paper';
import WebViewModalProvider, { WebViewModal } from "react-native-webview-modal";

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
            visible={true}
            source={{ uri: "https://www.iubenda.com/terms-and-conditions/78734417" }}
          />
        </View>
      </WebViewModalProvider>

       
    

 



    );
  }

}








export default PrivacyPolicy;
