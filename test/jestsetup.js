import Adapter    from 'enzyme-adapter-react-16';
import Enzyme,
{
  shallow,
  render,
  mount
}                 from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });
global.render = render;
global.mount = mount;
global.shallow = shallow;
console.error = message => {
  throw new Error(message);
};
