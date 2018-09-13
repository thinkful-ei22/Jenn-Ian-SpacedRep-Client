import React from 'react';
import {shallow} from 'enzyme';
import {Dashboard} from './dashboard';

describe('<Dashboard/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Dashboard dispatch={()=>{}} 
        handleAnswerSubmit={()=>{}} 
        nextQuestion={()=>{}} 
        currentQuestion={{}} 
        feedback={true} 
        currentUser={{}}/>);
  });
});