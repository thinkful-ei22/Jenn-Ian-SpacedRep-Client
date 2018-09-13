import React from 'react';
import {shallow} from 'enzyme';
import {StatsPage} from './stats';

describe('<StatsPage/>', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<StatsPage dispatch={()=>{}} questionList={[]}/>);
  });
});