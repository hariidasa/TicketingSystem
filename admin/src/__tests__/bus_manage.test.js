import React from 'react';
import {shallow} from 'enzyme';
import BusManage from "../components/BusManage";




//Positive test to observe whether the component renders properly
describe("Bus Manage Component- Positive",() =>{
    it('should render without throwing an error',() =>{
        expect(shallow(<BusManage />).find('form.BusM').exists()).toBe(true)
    })
})

//Negative test to observe whether the component renders properly
describe("Bus Manage Component- Negative",() =>{
    it('should not render without throwing an error',() =>{
        expect(shallow(<BusManage />).find('form.bus').exists()).toBe(false)
    })
})


//Tests written to find out the form inputs by their ids
it('renders Bus Name',() =>{
    expect(shallow(<BusManage/>).find('#busName').length).toEqual(1)
})

it('renders Bus Route Name',() =>{
    expect(shallow(<BusManage/>).find('#routeName').length).toEqual(1)
})

it('renders Bus Driver Name',() =>{
    expect(shallow(<BusManage/>).find('#driverName').length).toEqual(1)
})

it('renders Bus Class',() =>{
    expect(shallow(<BusManage/>).find('#routeClass').length).toEqual(1)
})

it('renders No of Seats as only integer',() =>{
    expect(shallow(<BusManage/>).find('#quantity').length).toEqual(1)
})


describe('Bus Name Input',() =>{
    it('should response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<BusManage/>);
        wrapper.find('#trainName').simulate('change',{target:{name:'busName',value:'TN-2345'}});

        expect(wrapper.state('Tname')).toEqual('TN-2345');
    })
})

describe('Number of seats Input - Postive',() =>{
    it('should response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<BusManage/>);
        wrapper.find('#quantity').simulate('change',{target:{name:'quantity',value:50}});

        expect(wrapper.state('quantity')).toEqual(50);
    })
})

describe('Number of seats Input - Negative',() =>{
    it('should not response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<BusManage/>);
        wrapper.find('#quantity').simulate('change',{target:{name:'quantity',value:'50'}});

        expect(wrapper.state('quantity')).toEqual('50');
    })
})


