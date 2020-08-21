import React from 'react';

//amplify
import { API, graphqlOperation } from 'aws-amplify'

//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import query definition
import { listBooks as ListBooks } from './graphql/queries'

export default class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }  

  async componentDidMount() {
    try {
      this.fetchBooks()
    } catch (err) {
      console.log('error fetching books', err)
    }
  }

  fetchBooks = async() => {
    const books = await API.graphql(graphqlOperation(ListBooks))
    console.log('books:', books)
    this.setState({
      books: books.data.listBooks.items
    })
  } 

  render() {

    const { books } = this.state;

    return (

      <Container className="p-3">
        <Jumbotron style={{backgroundColor:'#607d8b'}}>
          <h1 className="header">Books</h1>
        </Jumbotron>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Year</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.books.map((book, index) => (
                <tr key={index}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                  <td>{book.description}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

    )

  }

}