import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { posts, users } from "./data.js";

const resolvers = {
  Query: {
    users() {
      return users;
    },

    posts() {
      return posts;
    },

    user(parent, args) {
      const { id } = args;
      return users.find((el) => el.id == id);
    },
  },
  Post: {
    user(parent, args) {
      return users.find((el) => el.id == parent.userId);
    },
  },
  User: {
    posts(parent) {
      return posts.filter((el) => el.userId === parent.id);
    },
  },
  Mutation: {
    deleteUser(_, args) {
      const { id } = args;
      const index = users.findIndex((el) => el.id == id);
      if (index === -1) return null;
      const user = users.splice(index, 1);
      return user[0];
    },
    createUser(_, args) {
      const { name, age, isSmoker } = args;
      const newUser = {
        id: users.length + 1,
        name,
        age,
        isSmoker,
      };
      users.push(newUser);
      return newUser;
    },
    updateUser(_, args) {
      const { id, body } = args;
      const index = users.findIndex((el) => el.id == id);
      if (index === -1) return null;

      const updatedUser = {
        ...users[index],
        ...body,
      };

      users[index] = updatedUser;
      return updatedUser;
    },
    deletePost(_, args) {
      const { id } = args;
      const index = posts.findIndex((el) => el.id == id);
      if (index === -1) return null;
      const post = posts.splice(index, 1);
      return post[0];
    },
    createPost(_, args) {
      const { title, description, userId } = args;
      const newPost = {
        id: posts.length + 1,
        title,
        description,
        userId: parseInt(userId, 10),
      };
      posts.push(newPost);
      return newPost;
    },
    updatePost(_, args) {
      const { id, body } = args;
      const index = posts.findIndex((el) => el.id == id);
      if (index === -1) throw new Error("Post not found");

      const updatedPost = {
        ...posts[index],
        ...body,
      };

      posts[index] = updatedPost;
      return updatedPost;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: 1121 });
console.log(`server is running on ${url}`);
