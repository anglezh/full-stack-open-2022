import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    author {
      name
      born
      bookCount
    }
  }
}
`
export const FILTER_BOOKS = gql`
query filterBooksByGenre($genre: String){
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
}
`
export const ME = gql`
query{
  me{
    username
    favouriteGenre
    id
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title:String!, $author:String!, $published:Int!, $genres:[String!]!){
  addBook(
    title:$title,
    author:$author,
    published:$published,
    genres:$genres
    ){
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
}
`
export const UPDATE_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo){
    name
    born
  }
}
`
export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`