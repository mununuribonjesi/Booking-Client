import React, { Component } from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import Tab from './functionalComponents/AppointmentComponent';
import {ListItem} from 'react-native-elements';
import Moment from 'moment';
import config from '../config';
import axios from 'react-native-axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setBarber, setBarberId } from './store/actions'
import { connect } from 'react-redux';
import { TabView, SceneMap } from 'react-native-tab-view';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';


class AppointmentScreen extends Component
{

    constructor(props) {
        super(props);

        this.state = {
          upcomingAppointments:[],
          recentAppointments:[],
          index:0,
          isError:false,
          errorMessage:''
        };
      }


      async componentDidMount() {

        var response = await this.getCustomerAppointments();
        if (response.status === 200) {     
        var customerAppointments = response.data.customerApp;
        var upcomingAppointments = customerAppointments.filter(ua => {
        var str = ua.endTime;
        var parts = str.slice(0, -1).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];

        return Moment(dateComponent+'T'+timeComponent) > Moment()
        
        });

        var recentAppointments = customerAppointments.filter(ra => {
        var str = ra.endTime;
        var parts = str.slice(0, -1).split('T');
        var dateComponent = parts[0];
        var timeComponent = parts[1];
  
        return Moment(dateComponent+'T'+timeComponent) < Moment()
        
        });
          this.setState({upcomingAppointments:upcomingAppointments,recentAppointments:recentAppointments});
        }
     }


     isError = () =>
    {
      this.setState({isError:!this.state.isError});
      this.props.navigation.navigate('HomeScreen');
    }





      async getCustomerAppointments()
      {
        const token = await AsyncStorage.getItem('token');
        
        var res;

        await axios({
          method: 'get',
          url: config.Availability_URL +'/api/customerAppointments',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            'customerId':this.props.userId.toString()
          }
          
        }).then(response => 
          {

            res = response

          }).catch(error => {
            if(error.response)
            {
              res = error.response;
              this.setState({errorMessage:JSON.stringify(error.response.status),isError:true});
            }
          })

          return res;
    }



  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }


  setIndex(index)
  {
    this.setState({index:index});
  }

    FirstRoute = () => (
      <FlatList style={styles.FlatList}
        data={Object.values(this.state.upcomingAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        ListFooterComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)
    

    
    SecondRoute = () => (<FlatList style={styles.FlatList}
        data={Object.values(this.state.recentAppointments)}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        ListFooterComponent={this.FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderAppointment}
      />)



    renderAppointment = ({ item }) => {

        return (
          <View>
            <ListItem style={styles}>
              <ListItem.Title style={styles.leftText}>Barber:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>{item.barber}
              </Text>
            </ListItem>
            <ListItem style={styles}>
              <ListItem.Title style={styles.leftText}>Service:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>{item.skill}
              </Text>
            </ListItem>
            <ListItem >
              <ListItem.Title style={styles.leftText}>Date:</ListItem.Title>
              <ListItem.Content >
              </ListItem.Content>
              <Text style={styles.rightText}>
                {Moment(new Date(item.date)).format("ddd DD MMM YYYY")}
              </Text>
            </ListItem>
            <ListItem>
              <ListItem.Title style={styles.leftText}>Slot:</ListItem.Title>
              <ListItem.Content>
              </ListItem.Content>
              <Text style={styles.rightText}>
              {Moment(new Date(item.startTime)).format("HH:mm")} - {Moment(new Date(item.endTime)).format("HH:mm")} 
              </Text>
            </ListItem>
            
            <ListItem>
              <ListItem.Title style={styles.leftText}>Price:</ListItem.Title>
              <ListItem.Content>
    
              </ListItem.Content>
              <Text style={styles.rightText}>
    
                £{item.price.toFixed(2)}
    
              </Text>
            </ListItem>
            
          </View>)
      }


    render()
    {


      const renderScene = SceneMap({
        first: this.FirstRoute,
        second:this.SecondRoute,
      });

      const routes= [
        { key: 'first', title: 'Upcoming' },
        { key: 'second', title: 'Recent' },
      ];

      const index = this.state.index;

      const initialLayout = { width: Dimensions.get('window').width };
     
    return (

        <View styles={styles.container}>
        <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error fetching appointments \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>

        <View style={styles.subHeader}>
                  <Text style={styles.textStyle}>
                    Appointments
                    </Text>
                </View>
        
                <View style={styles.Body}>
                <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(index) => this.setIndex(index)}
      initialLayout={initialLayout}
    />
                  <Text style={styles.textStyle}>

                  </Text>
        
                </View>
          
                <View style={styles.Footer}>
                  <TouchableOpacity
                     onPress={() =>
                        this.props.navigation.navigate("BookScreen",{
                          isGetByService:false
                        })}
                  >
        
                  <Text style={styles.FooterText}>
                    Book Now 
                  </Text>
                  </TouchableOpacity>
                </View>
           </View>
    )
    }   
}

export const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    height:'100%',
    flex:1
  },

  subHeader: {
    backgroundColor: '#fff44f',
    height: '10%'
  },

  textStyle: {
      textAlign: 'center',
      color: 'black',
      fontSize: 40,
      padding: 7
    },
    Body:{

      backgroundColor:'white',
      height:'75%'
    },

    Footer:{
      backgroundColor:'black',
      height:'15%'

    },

    FooterText:
    {
      color:'white',
      marginTop:25,
      fontSize: 40,
      textAlign: 'center',
      
    },
  logoText: {
    fontSize: 20,
    fontWeight: "800",

  },
})



const mapStatetoProps = (state) => {

    return {
      userId: state.orderReducer.userId,
    }
  }
  
  

  
  export default connect(mapStatetoProps)(AppointmentScreen);