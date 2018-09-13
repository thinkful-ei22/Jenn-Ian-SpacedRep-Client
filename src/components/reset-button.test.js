import React from 'react';
import {shallow} from 'enzyme';
import {ResetBtn} from './reset-btn';

describe('<ResetBtn/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<ResetBtn dispatch={()=>{}}/>);
  });
});