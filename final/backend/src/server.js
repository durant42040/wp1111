import { GraphQLServer, PubSub } from 'graphql-yoga';
import ArticleModel from './models/article';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

import * as fs from 'fs'

const pubsub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync('./src/schema.graphql', 'utf-8'),
    resolvers: {
      Query,
      Mutation,
    },
  }),
  context: {
    ArticleModel,
    pubsub
  }
})

const Server = createServer(yoga);

export default Server
