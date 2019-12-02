import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const TWENTY_MIN_TEMP_SUBSCRIPTION= gql`
    query {
        measurements {
            id
            createdAt
            weight
            user {
                id
                email
            }
        }
    }
`;

class Graph extends Component {
  render() {
    return (
      <div
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center', }}
      >
        <Query query={TWENTY_MIN_TEMP_SUBSCRIPTION}>
          {
            ({data, error, loading}) => {
              if (error) {
                console.error(error);
                return "Error";
              }
              if (loading) {
                return "Loading";
              }
              let chartJSData = {
                labels: [],
                datasets: [{
                  label: "Weight Progress timeline",
                  data: [],
                  pointBackgroundColor: [],
                  borderColor: 'brown',
                  fill: false
                }]
              };
              data.measurements.forEach((measurement) => {
                chartJSData.labels.push(measurement.createdAt);
                chartJSData.datasets[0].data.push(measurement.weight);
                chartJSData.datasets[0].pointBackgroundColor.push('brown');
              })
              return (
                <Line
                  data={chartJSData}
                  options={{
                    animation: {duration: 0},
                  
                  }}
                />
              );
            }
          }
        </Query>
      </div>
    );
  }
}

export default Graph;