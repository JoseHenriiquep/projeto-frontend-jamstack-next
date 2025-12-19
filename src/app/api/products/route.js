import { createSchema, createYoga } from "graphql-yoga";
import { db } from "@/lib/firebaseAdmin";

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
        products: async (_, __, ctx) => {
          const products = await ctx.db.collection('products').get();
          return products.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        },
        product: async (_, { id }, ctx) => {
          const product = await ctx.db.collection("products").doc(id).get();

          if (!product.exists) return null;

          return {
            id: product.id,
            ...product.data(),
          };
        },
      },
    },
  }),
  graphqlEndpoint: "/api/products",
  context: () => ({
    db: db
  })
})

export { yoga as GET, yoga as POST };
