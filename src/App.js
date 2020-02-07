import React from 'react';
import './App.css';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Addbook from './Addbook';

function App(props) {
  const bookQuery = gql`{
  books{
    title
    author
  }
}`

  return (
    <Query query={bookQuery}>
      {
        ({ data, loading, error }) => {
          if (loading)
            return <div>Fetching</div>
          if (error)
            return <div>Error</div>
          const newData = data.books
          return (
            <div>
              {newData.map((ele, index) => {
                return (
                  <div key={index}>
                    <h2 key={index}>{index}{ele.title}--{ele.author}</h2>
                  </div>
                )
              })}
              <Addbook />
            </div>
          )
        }
      }
    </Query>

  );
}

export default App;
