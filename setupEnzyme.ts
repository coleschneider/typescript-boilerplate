import {configure} from 'enzyme';
import * as enzymeAdapter from 'enzyme-adapter-react-16';

const globalAdapter = new enzymeAdapter();

configure({adapter: globalAdapter})