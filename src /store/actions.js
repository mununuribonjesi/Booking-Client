import {SETBARBER ,SETSERVICE,SETSLOT ,SETTOTAL,SETBARBERID} from './actionTypes'

export const setBarber = (barber) => ({
    type: SETBARBER,
    data:barber,
})

export const setService = (service) => ({
    type: SETSERVICE,
    data:service,
})


export const setSlot = (slot) => ({
    type: SETSLOT,
    data:slot
})

export const setTotal = (total) => ({
    type: SETTOTAL,
    data:total

})

export const setBarberId = (barberId) => ({
    type: SETBARBERID,
    data:barberId
})





