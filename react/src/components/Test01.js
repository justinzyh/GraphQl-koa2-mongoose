import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
class Test01 extends Component{
  render(){
    console.log(this.props);
    return(
      <div>
        <h1>你好</h1>
      </div>
    )
  }
}
export default graphql(gql`
  query{
    Jobs{
      _id,
      job_name
    }
  }
`)(Test01)