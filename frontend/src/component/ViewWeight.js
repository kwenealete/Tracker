import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';
import Graph from './graph';

export const GET_WEIGHT = gql`
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


const ViewWeight = () => (
    
    <Query query= {GET_WEIGHT}>
        {({ loading, error, data }) => {
            if(loading) return <div>Fetching Weight</div>
            if(error) return <div data-test="graphql-error">Error</div>

            return(
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CreatedAt</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.measurements.map(measurement => (
                                <tr key={measurement.id}>
                                    <td>{measurement.id}</td>
                                    <td>{measurement.createdAt}</td>
                                    <td>{measurement.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div id="timeline">
                        <Graph />
                    </div>
                </div>
                
            )
        }}
    </Query>
);
   

export default ViewWeight;
