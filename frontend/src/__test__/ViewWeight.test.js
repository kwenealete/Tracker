import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import ViewWeight, { GET_WEIGHT } from '../component/ViewWeight';
import { MockedProvider } from 'react-apollo/test-utils';


const fakeMeasurement = () => ({
    __typename: 'Measurement',
    id: 'abc123',
    weight: 50,
    user: null,
  });

  describe('<ViewWeight/>', () => {
      it('renders with proper data', async () =>{
          const mocks = [
              {
                  request: { query: GET_WEIGHT, variables: { id: 123 } },

                  result: {
                      data: {
                          measurement: fakeMeasurement(),
                      }
                  }
              }
          ];
          const wrapper = mount(
            <MockedProvider mocks={mocks}>
              <ViewWeight id="123" />
            </MockedProvider>
          );
        //   console.log(wrapper.debug());
          expect(wrapper.text()).toContain('Fetching Weight');
          await wait();
          wrapper.update();
          console.log(wrapper.debug());
          
          
          expect(toJSON(wrapper.find('Table'))).toMatchSnapshot();   
          expect(toJSON(wrapper.find('thead'))).toMatchSnapshot();          
          expect(toJSON(wrapper.find('td'))).toMatchSnapshot();   
          
      })

      it('Errors with a not found measurement', async () => {
        const mocks = [
          {
            request: { query: GET_WEIGHT, variables: { id: '123' } },
            result: {
              errors: [{ message: 'Error' }],
            },
          },
        ];
        const wrapper = mount(
          <MockedProvider mocks={mocks}>
            <ViewWeight id="123" />
          </MockedProvider>
        );
        await wait();
        wrapper.update();
        console.log(wrapper.debug());
        const measurement = wrapper.find('[data-test="graphql-error"]');
        expect(measurement.text()).toContain('Error');
        expect(toJSON(measurement)).toMatchSnapshot();
      });
  })