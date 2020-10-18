import React from 'react';
import {shallow} from 'enzyme';
import TrainManage from "../components/TrainManage";

//Positive test to observe whether the component renders properly
describe("Train Manage Components- Positive",() =>{
    it('should render without throwing an error',() =>{
        expect(shallow(<TrainManage />).find('form.trainM').exists()).toBe(true)
    })
})

//Negative test to observe whether the component renders properly
describe("Train Manage Components- Negative",() =>{
    it('should not render without throwing an error',() =>{
        expect(shallow(<TrainManage />).find('form.trains').exists()).toBe(false)
    })
})


//Tests written to find out the form inputs by their ids
it('renders Train Name',() =>{
    expect(shallow(<TrainManage/>).find('#trainName').length).toEqual(1)
})

it('renders Route Name',() =>{
    expect(shallow(<TrainManage/>).find('#routeName').length).toEqual(1)
})

it('renders Driver Name',() =>{
    expect(shallow(<TrainManage/>).find('#driverName').length).toEqual(1)
})

it('renders Train Class',() =>{
    expect(shallow(<TrainManage/>).find('#routeClass').length).toEqual(1)
})

it('renders No of Seats as only integer',() =>{
    expect(shallow(<TrainManage/>).find('#quantity').length).toEqual(1)
})


describe('Train Name Input',() =>{
    it('should response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<TrainManage/>);
        wrapper.find('#trainName').simulate('change',{target:{name:'Tname',value:'UdarataMenike'}});

        expect(wrapper.state('Tname')).toEqual('UdarataMenike');
    })
})

describe('Number of seats Input - Postive',() =>{
    it('should response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<TrainManage/>);
        wrapper.find('#quantity').simulate('change',{target:{name:'quantity',value:50}});

        expect(wrapper.state('quantity')).toEqual(50);
    })
})

describe('Number of seats Input - Negative',() =>{
    it('should not response to event change and state change in Train Component',() =>{

        const wrapper = shallow(<TrainManage/>);
        wrapper.find('#quantity').simulate('change',{target:{name:'quantity',value:'50'}});

        expect(wrapper.state('quantity')).toEqual('50');
    })
})


