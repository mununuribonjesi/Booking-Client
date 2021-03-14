import { ActivityIndicatorComponent } from 'react-native';
import { act } from 'react-test-renderer';
import { SETBARBER, SETBARBERID, SETSERVICE, SETSLOT, SETTOTAL, SETUSERID, SETORGANISATIONID, SETUSER,SETAUTHENTICATION,SETUSERCACHE,SETUPDATE} from './actionTypes';
import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
    service: [],
    barber: '',
    slot: [],
    total: 0,
    barberId: '',
    userId: '',
    organisationId: ''
}

const updateState =
{
    update:false
}


const userState = {
    userId:"",
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    radius: 0,
    isAuthenticated:false
}

const memberCache = new Cache({
    namespace: "MuniBook",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});


const userCache = async (cache = memberCache, action) => 
 {



    console.log(data);

    switch(action.type)
    {
        case SETUSERCACHE:
              await cache.set("user",action.data)
              break
        
            
        default: 
        return data
    }

}


const updateReducer = (state=updateState,action) =>
{
    switch(action.type){
        case SETUPDATE:
            return {...state,
                update:state.update = action.update
            }
            default:
            return state
    }
}



const userReducer = (state = userState, action) => {
    switch (action.type) {
        case SETUSER:
            return {
                ...state,
                userId:state.userId = action.userId,
                firstname: state.firstname = action.firstname,
                lastname: state.lastname = action.lastname,
                email: state.email = action.email,
                dob: state.dob = action.dob,
                radius: state.radius = action.radius,
                isAuthenticated:state.isAuthenticated=action.isAuthenticated
            }
        case SETAUTHENTICATION:
            return{
                ...state,
                isAuthenticated:state.isAuthenticated=action.isAuthenticated
            }
        default:
            return state
    }
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETBARBER:
            return {
                ...state,
                barber: state.barber = action.data
            }
        case SETBARBERID:
            return {
                ...state,
                barberId: state.barberId = action.data
            }
        case SETSERVICE:
            return {
                ...state,
                service: state.service = action.data
            }
        case SETSLOT:
            return {
                ...state,
                slot: state.slot = action.data
            }
        case SETTOTAL:
            return {
                ...state,
                total: state.total = action.data
            }
        case SETUSERID:
            return {
                ...state,
                userId: state.userId = action.data
            }
        case SETORGANISATIONID:
            return {
                ...state,
                organisationId: state.organisationId = action.data
            }

        default: // need this for default case
            return state
    }
}


export { orderReducer, userReducer,userCache,updateReducer}