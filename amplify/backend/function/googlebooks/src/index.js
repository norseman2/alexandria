const axios = require('axios')

exports.handler = function (event, _, callback) {
  const { search } = event.arguments
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes?key=AIzaSyB9L78gXec4QPjJ8IBjzrujBMyZDrGEJww&q='+search
  let books = []
  axios.get(apiUrl).then(
    response => {
      const items = response.data.items
      items.forEach(element => {
        let volumeInfo = element.volumeInfo
        let book = {
          id: element.id,
          name: volumeInfo.title,
          author: volumeInfo.authors.join(),
          description: volumeInfo.description,
          year: volumeInfo.publishedDate
        }
        books.push(book)
      });
      console.log('books',books)
      callback(null, books)
    }
  ).catch(err => {
      console.log(err)
      callback(err)
    }
  )
}