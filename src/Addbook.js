import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const addBookMutation = gql`mutation addbookMutation($title:String!, $author:String!){
    addBook(title:$title, author:$author){
        title
        author
    }
}
`
const bookQuery = gql`{
    books{
      title
      author
    }
  }`

export class Addbook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            author: ''
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    render() {
        let inputTitle;
        let inputAuthor
        let title = this.state.title
        let author = this.state.author
        return (
            <div>
                <input type="text" ref={node => { inputTitle= node }} name="title" value={this.state.value} onChange={(e) => { this.handleChange(e) }} placeholder="title"></input><br>
                </br>
                <input type="text" ref={node => { inputAuthor= node }} name="author" value={this.state.value} onChange={(e) => { this.handleChange(e) }} placeholder="author"></input><br>
                </br>
                <Mutation mutation={addBookMutation} refetchQueries={[{ query: bookQuery }]}>
                    {
                        (addbookMutate, { error }) => {
                            if (error) {
                                return <div>error</div>
                            }
                            return (
                                <button type="button" onClick={(e) => {
                                    e.preventDefault()
                                    addbookMutate({
                                        variables: { title, author }
                                    })
                                    inputTitle.value = ""
                                    inputAuthor.value=""
                                }}>Submit</button>
                            )
                        }
                    }
                </Mutation>
            </div>)
    }
}

export default Addbook;
