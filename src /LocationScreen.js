import React, { Component } from 'react';
import { FlatList,View, Text, StyleSheet, TouchableOpacity,SafeAreaView} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import {ListItem } from 'react-native-elements';
import { setOrganisationId, setService, setTotal } from './store/actions'
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {UIActivityIndicator} from 'react-native-indicators';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';
import config from '../config';
import { relative } from 'path';
import { ScrollView } from 'react-native-gesture-handler';

import axiosRetry from 'axios-retry';

class LocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischecked: [],
      total: 0.00,
      services: [],
      data: [],
      isLoading:false,
      city:'',
      ImgToBase64:'',
      errorMessage:'',
      isError:false,
      radius:''
      
    };
  }

  async componentDidMount() {

    var authenticatedUser = await AsyncStorage.getItem('user');
    var data = JSON.parse(authenticatedUser);

    this.setState({radius:data.radius});


  }

  isError = () =>
  {
    this.setState({isError:!this.state.isError});
    this.props.navigation.navigate('HomeScreen');
  }



navigateToScreen()
{

  var isGetByService = this.props.navigation.state.params.isGetByService;

  if(isGetByService)
  {
    this.props.navigation.navigate("ServicesScreen",{
      isGetByService
    })
  }

  else 
  {
    this.props.navigation.navigate("BookScreen",{
      isGetByService
    })
  }

}


setOrganisation(response)
{

  this.setState({data:response.data.organisation});
  this.setState({isLoading:false});
}



  ListHeader = () => {
    return (

      <View style={styles.headerFooterStyle}>
        <Text style={styles.textStyle}>
          Select Barber
            </Text>
      </View>

    );
  };


  render() {
    return (

      <View style={styles.container}> 
      <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching Locations \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>

      <View style={styles.searchbar} pointerEvents='box-none'> 
      
      <GooglePlacesAutocomplete
      placeholder='Enter Location'
      minLength={2}
      currentLocation={true}
      autoFocus={true}
      returnKeyType={'default'}
      fetchDetails={true}
      query={{
        key: config.PLACES_KEY,
        language: 'en',
      }}
      onPress={async (data, details = null) => {
        // 'details' is provided when fetchDetails = true
        var city = data.terms[0].value;

        var location = details.geometry.location;
        var lat = location.lat;
        var long = location.lng;

        this.setState({isLoading:true});

         await axios({
          method: 'get',
          url: config.Availability_URL + '/api/organisation',
          params: {
            'lat':lat,
            'long':long,
            'radius':this.state.radius
          }
        }).then(response => 
          {
            this.setOrganisation(response);

          }).catch(error => {
            if(error.response)
            {
              this.setState({isLoading:false});
              this.setState({errorMessage:JSON.stringify(error.response.status),isError:true});

            }
          })

          this.setState({isLoading:false});
      }}
    
      styles={{
        textInputContainer: {
          backgroundColor: 'black',
          zIndex: 0
        },
        
        textInput: {
          height: 40,
          color: 'black',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    </View>


    {this.state.isLoading &&


        
      <View style={styles.loading}>
      <UIActivityIndicator name="Saving" size={80} color="black" />
      <Text style={styles.loadingText}> Fetching Locations</Text>
    </View>
    }


    {!this.state.isLoading &&
 

      <SafeAreaView style={{flex: 1}}>


    <FlatList
      data={this.state.data}
      style={styles.flatlist}
      keyExtractor={(x,i) => i.toString()}
      renderItem={({ item, }) => (     
        <TouchableOpacity
        onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
        >

          <ListItem      
            style={styles.list} key={item._id} bottomDivider>
            <UserAvatar size={80} name="Avishay Bar" src={item.uri} />  
            <ListItem.Content>
              <View styles={styles.list}>
                <ListItem.Title><Text style={styles.listText}>{item.companyName}</Text></ListItem.Title>
              </View>
              <View styles={styles.list}>
              <ListItem.Subtitle><Text style={styles.listText}>{item.addressLine1}</Text></ListItem.Subtitle>
            </View>
            <View styles={styles.list}>
            <ListItem.Subtitle><Text style={styles.listText}>{item.town}</Text></ListItem.Subtitle>
          </View>
          <View styles={styles.list}>
          <ListItem.Subtitle><Text style={styles.listText}>{item.postCode}</Text></ListItem.Subtitle>
        </View>

 
        <Text style={styles.leftText}>{"\n" + Number(item.distance).toFixed(2) + ' mi'}</Text>

   



            </ListItem.Content>

            <View> 
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.props.setOrganisationId(item._id),this.navigateToScreen()}}
            >
              <Text style={styles.bookText}>Book Now</Text>
                        

       
            </TouchableOpacity>
            </View>


 
          </ListItem>



        </TouchableOpacity>
        
      )}
    />
    </SafeAreaView>
      }
    </View>
    
    )
  }
}

export const styles = StyleSheet.create({

  list: {
  fontSize: RFValue(20),
},

leftText:{
  textAlign:'right',
  fontSize: RFValue(12),
  color:'blue'

},


listText:{
  fontSize: RFValue(12),

},
scrollView:{
  top:40,
},

flatlist:{
  top:40,
  marginBottom:40,
},

searchbar:{
  position:'absolute',
  left:0,
  top:0,
  width:'100%',
  height:'40%',
  zIndex:100,
},


container: {
  justifyContent: 'center',
  height: '100%',
  flex: 1,
  textAlign: 'left'
},

imagewrapper: {
  alignSelf: 'center'
},
textStyle: {
  textAlign: 'center',
  color: 'black',
  fontSize: 40,
  padding: 7
},
headerFooterStyle: {

  backgroundColor: '#fff44f'

},

button: {
  alignItems: 'center',
  backgroundColor: '#00ff00',
  padding: 10,
},

bookText:{
  color:'black'
},


iconWrapper: {
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 100,
  backgroundColor: '#fff',
  borderRadius: 10

},

wrapper: {
  marginTop: 50,
  paddingLeft: 20,
  width: '50%',
  flexDirection: 'row'

},
item: {
  width: '100%', // is 50% of container width
  paddingLeft: 10,
  height: '100%'

},

itemwrapper: {

},
logoText: {
  fontSize: 20,
  fontWeight: "800",
  marginTop: 20,
  textAlign: 'center',
},
itemtext: {
  textAlign: 'left',
  marginTop: 10,
  fontSize: 20

},

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

const mapStatetoProps = (state) => {
  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setService: (data) => dispatch(setService(data)),
    setTotal: (data) => dispatch(setTotal(data)),
    setOrganisationId: (data) => dispatch(setOrganisationId(data))
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(LocationScreen);