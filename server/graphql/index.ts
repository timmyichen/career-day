import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      testQuery: {
        type: GraphQLString,
        resolve() {
          return 'this is a test query';
        },
      },
    },
  }),
});

export default schema;
