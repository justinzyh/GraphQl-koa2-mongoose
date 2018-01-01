import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
export default class Test02 extends Component{
  render(){
    console.log(this.props.client.query);
    return(
      <div>
        <h1>第二个页面</h1>
      </div>
    )
  }
  componentDidMount(){
  }
}


const querySQL = `
  query{
    Jobs{
      _id,
      job_name
    }
  }
`;