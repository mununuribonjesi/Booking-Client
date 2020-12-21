import React, { Component} from 'react';
import { FlatList, Text, View, StyleSheet,TouchableOpacity, LogBox} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import {setSlot} from './store/actions';
import {connect} from  'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';

class SlotScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      stickyHeaderIndices: [],
      date: new Date(),
      ischecked: [],
      availableTimeSlots: [],
      selectedSlot: [],
      data:[],
      duration:'60'
    };

  }
  
  async componentDidMount()
  {    

    var date = Moment(new Date()).format("YYYY-MM-DD");
    await this.generateSlots(date);
  }




generateSlots = async (date) =>
{

  var workHours = await this.getWorkHours(date);
  console.log(workHours);
  var bookings = await this.getAppointments(date);
  var duration = this.props.services[0].Duration;

  var inputDataFormat = "HH:mm:ss";
  var outputFormat = "HH:mm";

  var tmp = Moment(duration, inputDataFormat);
  var dif = tmp - Moment().startOf("day");

  var startIntervalTime = Moment(workHours[0].startTime, inputDataFormat);
  var endIntervalTime = Moment(workHours[0].startTime, inputDataFormat).add(+dif, "ms");
  var finishTime = Moment(workHours[0].endTime, inputDataFormat);
  var createdSlots = [];

  while (startIntervalTime < finishTime) {

        var siT = new Date(Date.parse(startIntervalTime));

        var eiT = new Date(Date.parse(endIntervalTime));

        var  x = bookings.filter(function(p)
        {
          var st = new Date(Date.parse(Moment(p.startTime,"HH:mm")))
          var et = new Date(Date.parse(Moment(p.endTime,"HH:mm")))
           
           return st.getTime() < eiT && et.getTime() > siT
        })

        if(x.length == 0)
        {
          createdSlots.push({
              startTime: startIntervalTime.format(outputFormat),
              endTime: endIntervalTime.format(outputFormat),
              date:date
          }); 
        }

  startIntervalTime.add(dif, "ms");
  endIntervalTime.add(dif, "ms");
}
this.setState({availableTimeSlots:createdSlots})
}

  getAppointments = async (date) => {

    const token = await AsyncStorage.getItem('token');
  
      const response = await axios({
        method: 'get',
        url: 'https://368cfaca1e2f.ngrok.io/api/appointments',
        params: {
          'barberId': this.props.barberId,
          'date':date
        },
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
  
  
      if (response.status === 200)
      {
  
        return response.data.bookings
      }
  
      else 
      {  
        return response.status
      }

  }
  

  getWorkHours = async (date) => {
    
      const token = await AsyncStorage.getItem('token');
  
      const response = await axios({
        method: 'get',
        url: 'https://368cfaca1e2f.ngrok.io/api/workHours',
        params: {
          'barberId': this.props.barberId,
          'date':date
        },
        headers:{
          'Authorization':`Bearer ${token}`
        }
      });
  
  
      if (response.status === 200)
      {
  
        return response.data.time
      }
  
      else 
      {  
        return response.status
      }
  
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
    this.setState({ischecked:slots,selectedSlot:timeSlots[index]});
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
     
    var ad = Date.parse()

    ad.hou
    this.setState({ date: date, availableTimeSlots: timeSlots,ischecked:[] });

  }


  render() {
    LogBox.ignoreAllLogs(true);
    return (


      <View styles={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Schedule
            </Text>
        </View>

        <View style={styles.Calendar}>
          <Calendar
            onChange={(date) => this.onChangeDate(date)}
            selected={this.state.date}
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(10, 'years').startOf('day')}
          />
        </View>

        <View style={styles.slotHeader}>
          <Text style={styles.textStyle}>
            Available Slots
            </Text>
        </View>

        <View style={styles.slots}>
          <FlatList

            data={this.state.availableTimeSlots}
            keyExtractor={(x,i) => i.toString()}
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
        </View>
        <View style={styles.Footer}>


          <TouchableOpacity
            onPress={() =>{ this.props.navigation.navigate('CheckoutScreen'),this.props.setSlot(this.state.selectedSlot)}}
          >

            <Text style={styles.FooterText}>
              Confirm
          </Text>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
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
    fontSize: 40,
    textAlign: 'center',

  },
  logoText: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 44


  },
})


const mapStatetoProps  = (state) =>
{

  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString(),
    services: state.orderReducer.service
  }
}

const mapDispatchToProps = (dispatch) =>
{ 
  return {
  setSlot: (data) => dispatch(setSlot(data))

  }

}


export default connect(mapStatetoProps,mapDispatchToProps) (SlotScreen);



