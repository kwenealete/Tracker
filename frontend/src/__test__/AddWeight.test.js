import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import AddWeight, { CREATE_MEASUREMENT } from '../component/AddWeight';

const fakeMeasurement = () => ({
    __typename: 'Measurement',
    UserId: 1,
    weight: 50,
    createdAt: '21/11/2019',
  });



describe('<AddWeight/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <AddWeight />
      </MockedProvider>
    );
    const form = wrapper.find('.form');
    expect(toJSON(form)).toMatchSnapshot();
  });

  
  it('handles state updating', async () => {
    const wrapper = mount(
      <MockedProvider>
        <AddWeight />
      </MockedProvider>
    );
    wrapper.find('#UserId').simulate('change', { target: { value: 1, name: 'UserId' } });
    wrapper
      .find('#weight')
      .simulate('change', { target: { value: 50, name: 'weight', type: 'float' } });
    wrapper
      .find('#createdAt')
      .simulate('change', { target: { value: '12/10/2019', name: 'createdAt' } });

    expect(wrapper.find('AddWeight').instance().state).toMatchObject({
      UserId: 1,
      weight: 50,
      createdAt: '12/10/2019',
    });
  });
  it('creates a weight measurement when the form is submitted', async () => {
    const measurement = fakeMeasurement();
    const mocks = [
      {
        request: {
          query: CREATE_MEASUREMENT,
          variables: {
            UserId: measurement.UserId,
            weight: measurement.weight,
            createdAt: measurement.createdAt
            
          },
        },
        result: {
          data: {
            AddWeight: {
              ...fakeMeasurement,
              id: '12',
              __typename: 'Measurement',
            },
          },
        },
      },
    ];

    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <AddWeight />
      </MockedProvider>
    );
    // filling out the form
    wrapper.find('#UserId').simulate('change', { target: { value: measurement.UserId, name: 'UserId' } });
    wrapper
      .find('#weight')
      .simulate('change', { target: { value: measurement.weight, name: 'weight', type: 'float' } });
    wrapper
      .find('#createdAt')
      .simulate('change', { target: { value: measurement.createdAt, name: 'createdAt' } });
    

    wrapper.find('.form').simulate('submit');
    await wait(50);
    
    
  });
});