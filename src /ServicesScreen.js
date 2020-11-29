import React, { Component } from 'react';
import {Keyboard,Image,FlatList, Text, View,StyleSheet, TextInput,TouchableHighlight, TouchableWithoutFeedback,TouchableOpacity, Alert, KeyboardAvoidingView,Dimensions} from 'react-native';
import { FontAwesome,FontAwesome5,MaterialIcons,Ionicons,AntDesign,Octicons,ScrollView } from '@expo/vector-icons';
import { Card,CheckBox, ListItem, Button, Icon,Avatar,Badge} from 'react-native-elements';
import {setService,setTotal} from './store/actions'
import {connect} from  'react-redux';


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
          services:[]
        };
    
    
      }



      data = [
        { key:1,Name:"Hair Cut",isCheck:false,Price:10.00,email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        { key:2,Name:"Dye",isCheck:false,Price:20.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        { key:3,Name:"Dreads",isCheck:false,Price:15.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        { key:4,Name:"Eye Brows",isCheck:false,Price:10.00,email:'jmae@gmail.com',avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
        { key:5,Name:"Shape UP",isCheck:false,Price:5.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        { key:6,Name:"Relaxer",isCheck:false,Price:15.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        { key:7,Name:"Shape UP",isCheck:false,Price:5.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
        { key:8,Name:"Relaxer",isCheck:false,Price:15.00,email:'jmae@gmail.com',avatar_url:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
    ]


      async componentDidMount()
      {
          let bools = [...this.state.ischecked]
          
          this.data.forEach(ckb => {

          bools.push(ckb.isCheck)
          
        });

        this.setState({ischecked:bools})
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

          selected.push({Name:this.data[index].Name,Price:this.data[index].Price});

          this.setState({total:this.state.total + this.data[index].Price,services:selected});

         }
         else
         {
            var selected = [...this.state.services];

            var Name = this.data[index].Name

            selected = selected.filter(function(obj)
              {

                return obj.Name !== Name
              })

            this.setState({total:this.state.total - this.data[index].Price,services:selected});
         }

         this.setState({ischecked:checkboxes})    
      }
    

    render()
    {
    return (


      <View styles={styles.container}>

        <View style={styles.Body}>
          <View> 
          <Text style={styles.textStyle}>
            Choose Service
            </Text>
            </View>
         
          <FlatList
            data={this.data}
            keyExtractor={(item,index)=> index.toString()}
            renderItem={({ item, index }) => (

              <ListItem
                onPress={() => this.isCheckBox(index)}


                style={styles.list} key={item.key}>

                <CheckBox style={this.data[index].isCheck}
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
  
    textStyle: {
        textAlign: 'center',
        color: 'black',
        fontSize: 40,
        padding: 7
      },
      Body:{

        backgroundColor:'#fff44f',
        height:'85%'
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

  console.log(state);

  return {
    orders: state.orderReducer
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