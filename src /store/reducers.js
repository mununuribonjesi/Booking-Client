import { ActivityIndicatorComponent } from 'react-native'
import { SETBARBER, SETBARBERID, SETSERVICE, SETSLOT, SETTOTAL, SETUSERID,SETORGANISATIONID} from './actionTypes'

const initialState = {
    service: [],
    barber: '',
    slot: [],
    total: 0,
    barberId: '',
    userId: '',
    organisationId:''
}

const userState = {

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


export default orderReducer