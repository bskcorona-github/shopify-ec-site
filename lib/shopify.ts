import { GraphQLClient } from 'graphql-request'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

// Demo mode configuration
const isDemoMode = !domain || !storefrontAccessToken || 
  domain === 'demo-store.myshopify.com' || 
  storefrontAccessToken === 'demo-token'

export const storefront = isDemoMode 
  ? null // Demo mode - will use fallback data
  : new GraphQLClient(`https://${domain}/api/2023-10/graphql.json`, {
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
    })

export const isDemo = isDemoMode

// GraphQL queries
export const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`

export const GET_COLLECTIONS_QUERY = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`
