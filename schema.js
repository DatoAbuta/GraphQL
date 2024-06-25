export const typeDefs = `#graphql

    type User {
        id: ID,
        name: String,
        age: Int,
        isSmoker: Boolean,
        posts: [Post]
    }

    type Post {
        id: ID,
        title: String,
        description: String,
        user: User
    }

    input UpdateUserInput {
        name: String,
        age: Int,
        isSmoker: Boolean
    }

    input UpdatePostInput {
        title: String,
        description: String
    }

    type Query {
        users: [User],
        posts: [Post],
        user(id: ID!): User
    }

    type Mutation {
        deleteUser(id: ID): User
        createUser(name: String!, age: Int!, isSmoker: Boolean!): User
        updateUser(id: ID!, body: UpdateUserInput!): User

        deletePost(id: ID): Post
        createPost(title: String!, description: String!, userId: ID!): Post
        updatePost(id: ID!, body: UpdatePostInput!): Post
    }

`;
