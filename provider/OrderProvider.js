import React, { Component,createContext } from 'react';

const OrderContext = createContext({});

class OrderProvider extends Component {

    state={
        price:0,
        items:[],
        barber:'',
        selectedSlot:[]
    }


    setPrice = (price) =>{
        this.setState({price})
    }


    setItems = (items) =>
    {
        this.setState({items})
    }

    setBarber = (barber) =>
    {
        this.setState({barber})
    }

    setSelectedSlot = (selectedSlot) =>
    {
        this.setState({selectedSlot})
    }


    render()
    {
    return(
          <OrderContext.Provider

          values ={{
            price:this.state.price,
            items:this.state.items,
            barber:this.state.barber,
            setPrice:this.setState,
            setItems:this.setItems,
            setBarber:this.setBarber
          }} >


          {this.props.children}



          </OrderContext.Provider>


    )

    }
}

export {OrderProvider,OrderContext}