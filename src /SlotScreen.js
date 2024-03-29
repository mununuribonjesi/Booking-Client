import React, { Component } from 'react';
import { FlatList,ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Calendar from 'react-native-calendar-datepicker';
//import Calendar from 'react-native-calendar-picker';
import Moment from 'moment';
import { setSlot } from './store/actions';
import { connect } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';
import config from '../config';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {FontAwesome5 } from '@expo/vector-icons';
import {
  SCLAlert,
  SCLAlertButton
} from 'fork-react-native-scl-alert';



class SlotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      ischecked: [],
      availableTimeSlots: [],
      selectedSlot: [],
      data: [],
      confirm: false,
      isGeneratingSlots: false,
      Loading:false,
      isError:false,
      errorMessage:''
    };



  }

  async componentDidMount() {
    this.setState({isLoading:true});
    var date = Moment(new Date()).format("YYYY-MM-DD");
    await this.generateSlots(date);
    this.setState({isLoading:false});
  }

  //generate slots for date selected
  generateSlots = async (date) => {

    var getWorkHours = await this.getWorkHours(date)
    var getAppointments = await this.getAppointments(date)

    if(getWorkHours.status===200&&getAppointments.status===200)
    {

    this.setState({ isGeneratingSlots: true })
    var workHours = [];
    workHours = getWorkHours.data.time;
    var bookings = getAppointments.data.bookings;
    var duration = this.props.services[0].Duration;

    var inputDataFormat = "HH:mm:ss";
    var outputFormat = "HH:mm";
    var tmp = Moment(duration, inputDataFormat);
    var dif = tmp - Moment().startOf("day");

    if (workHours.length > 0) {

      var startIntervalTime = Moment(new Date(workHours[0].startTime), inputDataFormat);
      var endIntervalTime = Moment(new Date(workHours[0].startTime), inputDataFormat).add(+dif, "ms");
      var finishTime = Moment(new Date(workHours[0].endTime), inputDataFormat);
      var createdSlots = [];

      while (startIntervalTime < finishTime) {

        var b = bookings.filter(function (bookings) {

          var startTime = Moment(new Date(bookings.startTime), inputDataFormat);
          var endTime = Moment(new Date(bookings.endTime), inputDataFormat);

          return startTime < endIntervalTime && endTime > startIntervalTime
        })

        if (b.length == 0 && startIntervalTime >= Moment()) {
            createdSlots.push({
            startTime: startIntervalTime.format(outputFormat),
            endTime: endIntervalTime.format(outputFormat),
            date: date
          });
        }

        startIntervalTime.add(dif, "ms");
        endIntervalTime.add(dif, "ms");
      }
    }

    this.setState({ availableTimeSlots: createdSlots, isGeneratingSlots: false })
    }
  }



  getAppointments = async (date) => {

    const token = await AsyncStorage.getItem('token');

    var res;

     await axios({
      method: 'get',
      url: config.Availability_URL + '/api/appointments',
      params: {
        'barberId': this.props.barberId,
        'date': date
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => 
      {

        res = response

      }).catch(error => {
        if(error.response)
        {
          res = error.response;
          this.setState({errorMessage:JSON.stringify(error.response.status),isError:false});
        }
      });

    return res;
  }


  getWorkHours = async (date) => {

    const token = await AsyncStorage.getItem('token');

    var res;

     await axios({
      method: 'get',
      url: config.Availability_URL + '/api/workHours',
      params: {
        'barberId': this.props.barberId,
        'date': date
      },
      headers: {
        'Authorization': `Bearer ${token}`
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
      });

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

  isCheckBox(index) {

    var timeSlots = [...this.state.availableTimeSlots];
    var slots = [];

    timeSlots.forEach(element => {

      slots.push(element.isCheck);
    });

    slots[index] = !slots[index];
    this.setState({ ischecked: slots, selectedSlot: timeSlots[index], confirm: true });
  }

  isError = () =>
  {
    this.setState({isError:!this.state.isError});
    this.props.navigation.navigate('LocationScreen');
  }



  onChangeDate(date) {

    var selectedDate = Moment(new Date(date)).format("YYYY-MM-DD");
    this.generateSlots(selectedDate);
    var timeSlots = [];
    this.state.data.forEach(element => {

      if (element.date === selectedDate) {
        timeSlots.push(element);
      }
    })

    this.setState({ date: date, availableTimeSlots: timeSlots, ischecked: [], confirm: false });
  
  }

  render() {
    return (

      (this.state.isLoading == true ?
        <View style={styles.loading}>
        <UIActivityIndicator size={80} color="black" />
      </View>
  :[

  
      <View styles={styles.container}>
      <SCLAlert
      show={this.state.isError}
      onRequestClose={this.isError}
      theme="danger"
      title="Oops! Something went wrong"
      subtitle={"error generating slots \n\n"+this.state.errorMessage}
      headerIconComponent={<FontAwesome5 name="exclamation" size={40} color="white" />}
    >
      <SCLAlertButton theme="danger" onPress={this.isError}>OK</SCLAlertButton>
    </SCLAlert>
        <View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Schedule
            </Text>
        </View>
       <ScrollView style={styles.Calendar}>
        <View >
          <Calendar
            onChange={(date) => this.onChangeDate(date)}
            selected={this.state.date}
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(7, 'years').startOf('day')}
  
            
          />    
     </View>
     </ScrollView>

        <View style={styles.slotHeader}>
          <Text style={styles.textStyle}>
            Available Slots
            </Text>
        </View>

        <View style={styles.slots}>

          {this.state.isGeneratingSlots == true ?

            <View style={[styles.container, styles.horizontal]}>
            <UIActivityIndicator size={80} color="black" />
            </View>

            : [
              (!this.state.availableTimeSlots || this.state.availableTimeSlots.length === 0 ?

                <Text style={styles.logoText}>

                  No Available Slots !!!

                </Text>
                :
                <FlatList

                  data={this.state.availableTimeSlots}
                  keyExtractor={(x, i) => i.toString()}
                  ItemSeparatorComponent={this.FlatListItemSeparator}
                  ListFooterComponent={this.FlatListItemSeparator}
                  renderItem={({ item, index }) => (

                    <TouchableOpacity
                      onPress={() => this.isCheckBox(index)}

                      style={[
                        { backgroundColor: this.state.ischecked[index] ? '#00ff00' : '#FFFFFF' }
                      ]}
                    >

                      <Text style={styles.logoText}>
                        {item.startTime + " - " + item.endTime}
                      </Text>

                    </TouchableOpacity>
                  )}
                />
              )
            ]
          }
        </View>
    
        <View style={styles.Footer}>
          {this.state.confirm &&
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('CheckoutScreen'), this.props.setSlot(this.state.selectedSlot) }}
            >
              <Text style={styles.FooterText}>
                Confirm
          </Text>
            </TouchableOpacity>
          }
        </View>
      </View>
        ])
    )
  }
}
const mapStatetoProps = (state) => {
  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString(),
    services: state.orderReducer.service
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSlot: (data) => dispatch(setSlot(data))
  }
}


export const styles  = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    flex: 1,
    flexDirection:'row'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: RFValue(35),
    padding: 7
  },
  subHeader: {

    backgroundColor: '#fff44f',
    height: '10%'
  },

  Calendar: {
    height: '40%'

  },

  Footer: {
    backgroundColor: 'black',
    height: '15%'

  },

  slotHeader: {
    backgroundColor: '#fff44f',
    height: '10%'

  },

  slots: {
    backgroundColor: 'white',
    height: '25%',
    justifyContent: 'center'

  },

  FooterText:
  {
    color: 'white',
    marginTop: 25,
    fontSize: RFValue(35),
    textAlign: 'center',

  },
  logoText: {
    fontSize: RFValue(15),
    fontWeight: "800",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 44


  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})




export default connect(mapStatetoProps, mapDispatchToProps)(SlotScreen);



