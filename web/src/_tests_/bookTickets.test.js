import React from 'react';
import {shallow} from 'enzyme';
import Login from "../components/Login";


//Positive test to observe whether the component renders properly
describe("Train Ticket Component- Positive",() =>{
  it('should render without throwing an error',() =>{
    expect(shallow(<Login />).find('form#Loginf').exists()).toBe(true)
  })
});

//Negative test to observe whether the component renders properly
// describe("Train ticket Component- Negative",() =>{
//   it('should not render without throwing an error',() =>{
//     expect(shallow(<Home />).find('form.trainT').exists()).toBe(false)
//   })
// });

//Positive test to observe whether the component renders properly
// describe("Bus Ticket Component- Positive",() =>{
//   it('should render without throwing an error',() =>{
//     expect(shallow(<Home />).find('form.busT').exists()).toBe(true)
//   })
// });

//Negative test to observe whether the component renders properly
// describe("Bus Ticket Component- Negative",() =>{
//   it('should not render without throwing an error',() =>{
//     expect(shallow(<Home />).find('form.busT').exists()).toBe(false)
//   })
// });