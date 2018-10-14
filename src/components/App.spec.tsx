import * as React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('Should render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
