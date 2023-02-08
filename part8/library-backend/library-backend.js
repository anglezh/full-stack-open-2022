const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')


mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/books')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String):[Book!]!
    allAuthors:[Author!]!
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String
    born: Int
    bookCount: String
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }


`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.find({ name: args.author })
        if (author.length === 0) { return [] }
        const books = await Book.find({ genres: { $in: [args.genre] }, author: author[0]._id }).populate('author', { name: 1, born: 1 })
        return books
      }
      else if (args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } }).populate('author', { name: 1, born: 1 })
        return books
      } else if (args.author) {
        const author = await Author.find({ name: args.author })
        if (author.length === 0) {
          return []
        }
        const books = await Book.find({ author: author[0]._id }).populate('author', { name: 1, born: 1 })
        return books
      } else {
        const books = await Book.find({}).populate('author', { name: 1, born: 1 })
        return books
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const a = await Book.find({ author: root._id })
      return a.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const book = new Book({ ...args })
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.find({ name: args.author })
      book.author = author[0]._id

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      book.author = author[0]
      return book
    },
    editAuthor: async (root, args, context) => {
      const newAuthor = { ...args }
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const author = await Author.find({ name: args.name })
        const updateAuthor = await Author.findByIdAndUpdate(author[0]._id, { name: args.name, born: args.setBornTo }, { new: true, runValidators: true, context: 'query' })
        console.log(updateAuthor)
        return updateAuthor
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    createUser: async (root, args) => {
      console.log(args)
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      console.log(user)
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
