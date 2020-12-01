import React, { Component } from 'react';
import {FlatList, Text, View,StyleSheet,TouchableOpacity} from 'react-native';
import {CheckBox, ListItem} from 'react-native-elements';
import {setService,setTotal} from './store/actions'
import {connect} from  'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'react-native-axios';

class ServicesScreen extends Component
{
    constructor(props) {
        super(props);

        this.state = {
          username: '',
          password: '',
          stickyHeaderIndices: [],
          ischecked:[],
          total:0.00,
          services:[],
          data:[]
        };
      }

      async componentDidMount()
      {     

          const token = await AsyncStorage.getItem('token');
          const response = await axios({
            method: 'get',
            url: 'https://24d5e361a273.ngrok.io/api/barberskills',
            params: {
              'barberId': this.props.barberId,
            },
            headers:{
              'Authorization':`Bearer ${token}`
            }
          });
          
          try {

      
            if (response.status === 200) {
             
              const data = response.data.skills;
              this.setState({data:data});  
            }
      
          } catch (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
          } 


          let checklist = [...this.state.ischecked]

          data = [...this.state.data]
          
          data.forEach(ckb => {

            checklist.push(false);
          
        });

        this.setState({ischecked:checklist})
      }


       ListHeader = () => {
        //View to set in Header
        return (

          <View style={styles.headerFooterStyle}>
            <Text style={styles.textStyle}>
                Select Barber
            </Text>
          </View>

        );
      };

      isCheckBox(index){

        let checkboxes = [...this.state.ischecked]

         checkboxes[index] = !checkboxes[index];

        
         if(checkboxes[index]===true)
         {

          var selected = [...this.state.services]

          selected.push({Name:this.state.data[index].Name,Price:this.state.data[index].Price});

          this.setState({total:this.state.total + this.state.data[index].Price,services:selected});

         }
         else
         {
            var selected = [...this.state.services];

            var Name = this.state.data[index].Name

            selected = selected.filter(function(obj)
              {

                return obj.Name !== Name
              })

            this.setState({total:this.state.total - this.state.data[index].Price,services:selected});
         }

         this.setState({ischecked:checkboxes})    
      }
    

    render()
    {
    return (


      <View styles={styles.container}>

<View style={styles.subHeader}>
          <Text style={styles.textStyle}>
            Choose Service
            </Text>
        </View>

        <View style={styles.Body}>
         
         
          <FlatList
            data={this.state.data}
            keyExtractor={(item,index)=> index.toString()}
            renderItem={({ item, index }) => (

              <ListItem
                onPress={() => this.isCheckBox(index)}


                style={styles.list} key={item.key}>

                <CheckBox 
                  checked={this.state.ischecked[index]}
                  onPress={() => this.isCheckBox(index)}
                  checkedColor='black'
                  size={40}
                  ListFooterComponent={() => this.ListHeader()}
                />
                <ListItem.Content>
                  <ListItem.Title><Text style={styles.logoText}>{item.Name}</Text></ListItem.Title>
                  <ListItem.Title
                  ><Text> {"£" + item.Price + '.00'}</Text></ListItem.Title>
                </ListItem.Content>
              </ListItem>

            )}
          />
          
          <Text style={styles.textStyle}>
            {"£" + (this.state.total) + ".00"}
          </Text>

        </View>
  
        <View style={styles.Footer}>
          {this.state.total > 0 &&
        
          <TouchableOpacity
          onPress={() =>{this.props.setTotal(this.state.total),this.props.setService(this.state.services), this.props.navigation.navigate('SlotScreen')}}
          >

          <Text style={styles.FooterText}>
            Continue
          </Text>
          </TouchableOpacity>
    }
        </View>
    
   </View>

   
    )
    }


    
}


const styles = StyleSheet.create({
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



const mapStatetoProps  = (state) =>
{
  return {
    orders: state.orderReducer,
    barberId: state.orderReducer.barberId.toString()
  }
}

const mapDispatchToProps = (dispatch) =>
{ 

  return {
  setService: (data) => dispatch(setService(data)),
  setTotal: (data) => dispatch(setTotal(data))
  
  }

}


export default connect(mapStatetoProps,mapDispatchToProps) (ServicesScreen);