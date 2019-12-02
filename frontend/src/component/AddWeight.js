import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { GET_WEIGHT } from './ViewWeight';

const CREATE_MEASUREMENT = gql`
mutation createMeasurement($UserId: ID!, $createdAt: String!, $weight: Float!){
    createMeasurement(UserId: $UserId createdAt: $createdAt weight: $weight) {
        id
        weight
        createdAt
        user {
            id
            firstName
            }        
      }
}`;


class AddWeight extends Component {
  state = {
    weight: '',
    UserId: 1,
    createdAt: new Date().toLocaleDateString()
  }

  render() {
    const { weight, UserId, createdAt } = this.state;
    return (
      <div className="form">
        <div className=" background-gray flex flex-column mt3">
          <h4 className="no-margin">UserId</h4>  
          <input
            id="UserId"
            className="mb2"
            value={UserId}
            onChange={e => this.setState({ UserId: e.target.value })}
            type="text"
            placeholder="UserId"
          />
          <h4 className="no-margin">Weight</h4>
          <input
            className="mb2"
            id="weight"
            value={weight}
            onChange={e => this.setState({ weight: e.target.value })}
            type="text"
            placeholder="Enter weight measurement"
          />
          <h4 className="no-margin">Date</h4>
          <input
            className="mb2"
            id="createdAt"
            value={createdAt}
            onChange={e => this.setState({ createdAt: e.target.value })}
            type="text"
            placeholder="Enter date "
          />
        </div>
        <Mutation 
            mutation={CREATE_MEASUREMENT}
            variables={{ weight: parseFloat(weight), UserId: UserId, createdAt: createdAt }}
            refetchQueries = {{ query: GET_WEIGHT }}
            onCompleted={() => this.props.history.push('/')}
            
             >
          { weightMutattion => <button type="submit" onClick= {weightMutattion} >Add Weight</button> }
        </Mutation>
      </div>
    )
  }
}

export default AddWeight;
export { CREATE_MEASUREMENT };