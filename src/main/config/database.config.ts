export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/wordsy-flashcards',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};