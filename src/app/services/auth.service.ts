import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Register user.
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Check if user is logged in or not.
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  // Logout the user
  logout() {
    this.afAuth.auth.signOut();
  }
}
