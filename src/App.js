import React from 'react';

//amplify
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

//react-bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

// import query definition
import { listBooks as ListBooks } from './graphql/queries'
import { getGoogleBooks as GetGoogleBooks } from './graphql/queries'

class App extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      googleBooks: []
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

    const googleBooks = await API.graphql(graphqlOperation(GetGoogleBooks,{search:"shakespeare"})).then(
      (result) => {
        console.log(result)
        this.setState({
          googleBooks: result.data.getGoogleBooks
        })
      }).catch( (err) => {
        console.log(err)
    })
  } 

  render() {

    const { books } = this.state;

    return (

      <Container className="p-3">
        <Jumbotron style={{backgroundColor:'#607d8b'}}>
          <h1 className="header">Books</h1>
        </Jumbotron>
        <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              My Books
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Google Books
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
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
                  this.state.googleBooks.map((book, index) => (
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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      </Container>
      
    )

  }

}

export default withAuthenticator(App, { includeGreetings: true })