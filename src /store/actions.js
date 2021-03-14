import {SETBARBER ,SETSERVICE,SETSLOT ,SETTOTAL,SETBARBERID,SETORGANISATIONID,SETUSERID,SETUSER,SETAUTHENTICATION,SETUSERCACHE,GETUSERCACHE,SETUPDATE} from './actionTypes'

export const setBarber = (barber) => ({
    type: SETBARBER,
    data:barber,
})

export const setService = (service) => ({
    type: SETSERVICE,
    data:service,
})


export const setUserId = (userId) => ({
    type: SETUSERID,
    data:userId,
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

export const setOrganisationId = (organisationId) => ({
    type: SETORGANISATIONID,
    data:organisationId
})

export const setUser = (userId,firstname,lastname,email,dob,radius,isAuthenticated) =>({
    type: SETUSER,
    userId:userId,
    firstname:firstname,
    lastname:lastname,
    email:email,
    dob:dob,
    radius:radius,
    isAuthenticated:isAuthenticated

})

export const setUpdate = (update) => ({
    type:SETUPDATE,
    update:update
})

export const setUserCache = (data) =>({
    type:SETUSERCACHE,
    data:data
})

export const getUserCache =() =>({
    type:GETUSERCACHE
})

export const setAuthentication = (isAuthenticated) =>({
    type:SETAUTHENTICATION,
    isAuthenticated:isAuthenticated
})




