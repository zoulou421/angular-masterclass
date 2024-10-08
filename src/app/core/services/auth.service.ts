import { inject, Injectable } from '@angular/core';
//import { Auth, authState, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
export interface Credential{
  email:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInWithPopup(provider: OAuthProvider) {
      throw new Error('Method not implemented.');
  }
 
  private auth:Auth=inject(Auth);
  readonly authState$=authState(this.auth);
    currentUser: any;

  signUpWithEmailAndPassword(credential:Credential):Promise<UserCredential>{
    return createUserWithEmailAndPassword(this.auth,credential.email,credential.password)
  }

  logInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this.auth,
      credential.email,
      credential.password
    );
  }

  logOut(): Promise<void> {
    return this.auth.signOut();
  }

  // providers

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  signInWithGithubProvider(): Promise<UserCredential> {
    const provider = new GithubAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this.auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }
 
}
