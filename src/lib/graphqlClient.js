import { GraphQLClient } from "graphql-request";

export function getGraphQLClient() {
  if (typeof window !== "undefined") {
    return new GraphQLClient("/api/products");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.URL || 'https://localhost:3000';

  if (!baseUrl) {
    throw new Error("URL não definida");
  }

  return new GraphQLClient(`${baseUrl}/api/products`);
}