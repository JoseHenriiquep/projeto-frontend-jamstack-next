import { createSchema, createYoga } from "graphql-yoga";
import { getProductByIdFromDb, getProductsFromDB } from "@/lib/products";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Product {
        id: ID!
        name: String!
        price: Float!
        description: String
        imageUrl: String
      }
  
      type Query {
        products: [Product!]!
        product(id: ID!): Product
      }
    `,
    resolvers: {
      Query: {
        products: async () => getProductsFromDB(),
        product: async (_, { id }) => getProductByIdFromDb(id),
      },
    },
  }),
  graphqlEndpoint: "/api/products",
})

export { yoga as GET, yoga as POST };
