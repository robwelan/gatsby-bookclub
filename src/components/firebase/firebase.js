import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  getUserProfile({ userId, onSnapshot }) {
    return this.db
    .collection('public-profiles')
    .where('userId', '==', userId)
    .limit(1)
    .onSnapshot(onSnapshot);
  }

  async createAuthor({ authorName }) {
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');

    return createAuthorCallable({
      authorName,
    });
  }

  async getAuthors() {
    return this.db.collection('authors').get();
  }

  async createBook({ authorId, bookCover, bookName, summary }) {
    const createBookCallable = this.functions.httpsCallable('createBook');

    createBookCallable({
        authorId,
        bookCover,
        bookName,
        summary,
      });
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async postComment({text, bookId}) {
    const postCommentCallable = this.functions.httpsCallable('postComment');

    return postCommentCallable({
      text,
      bookId,
    });
  }

  async register({
    email,
    firstname,
    lastname,
    password,
    username,
  }) {
    await this.auth.createUserWithEmailAndPassword(email, password);

    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');

    createProfileCallable({
      firstname,
      lastname,
      username,
    });
  }

  subscribeToBookComments({ bookId, onSnapshot }) {
    const bookRef = this.db.collection('books').doc(bookId);

    return this.db
    .collection('book-comments')
    .where('book', '==', bookRef)
    .orderBy('dateCreated', 'desc')
    .onSnapshot(onSnapshot);
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
