import {SETBARBER,SETBARBERID,SETSERVICE,SETSLOT ,SETTOTAL} from './actionTypes'

const initialState = {
    service:[],
    barber:'',
    slot:[],
    total:0,
    barberId:''
}

const orderReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case SETBARBER:
            return{...state,
            barber:state.barber = action.data
            }
        case SETBARBERID:
            return{...state,
            barberId:state.barberId = action.data
            }
        case SETSERVICE:
            return {...state,
            service: state.service = action.data
            }
        case SETSLOT:
            return{...state,
            slot:state.slot = action.data
            }
        case SETTOTAL:
            return{...state,
            total:state.total = action.data
            }
        default: // need this for default case
            return state
    }
}

export default orderReducer