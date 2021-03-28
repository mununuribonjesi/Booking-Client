import React, { Component } from 'react';
import {Keyboard,Button,Image, Text, View,StyleSheet, TextInput,TouchableHighlight, TouchableWithoutFeedback,TouchableOpacity, Alert, KeyboardAvoidingView,Dimensions} from 'react-native';
import { WebView } from 'react-native-webview';

class GalleryScreen extends Component
{


    render()
    {
    return (

        <WebView
        source={{ uri: 'https://google.com' }}
        style={{ marginTop: 20 }}
      />

    )
    }



}
export default GalleryScreen
