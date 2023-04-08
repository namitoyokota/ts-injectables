import { FirebaseError } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../firebase.service';
import { NavigationService } from '../navigation.service';

export class FirebaseAuthentication {
    /** Currently logged in user */
    currentUser = new BehaviorSubject<User>(null);

    /** Currently logged in user */
    currentUser$ = this.currentUser.asObservable();

    /** Indicates whether user just created an account */
    newUser = false;

    /** Auth for Google */
    googleAuthProvider: GoogleAuthProvider;

    /** Auth for Facebook */
    facebookAuthProvider: FacebookAuthProvider;

    constructor(private firebaseService: FirebaseService, private navigationService: NavigationService) {
        this.googleAuthProvider = new GoogleAuthProvider();
        this.facebookAuthProvider = new FacebookAuthProvider();
    }

    /** Listen to change in log in state */
    listenToAuthChange(): void {
        const auth = getAuth();
        onAuthStateChanged(auth, (user: User) => {
            if (user) {
                this.currentUser.next(user);
                this.firebaseService.mailbox.retrieveCollection.next(user.uid);
                this.navigationService.goToHomePage();
            } else {
                this.currentUser.next(null);
                this.firebaseService.mailbox.clearCollection.next();
                this.navigationService.goToSignInPage();
            }
        });
    }

    /** Logs in user with provided credentials */
    async signIn(email: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(getAuth(), email, password)
                .then(() => {
                    resolve();
                })
                .catch((error: FirebaseError) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Logs in user with Google account */
    async signInWithGoogle(): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithPopup(getAuth(), this.googleAuthProvider)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Logs in user with Facebook account */
    async signInWithFacebook(): Promise<void> {
        return new Promise((resolve, reject) => {
            signInWithPopup(getAuth(), this.facebookAuthProvider)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Creates new account with provided credentials */
    async signUp(email: string, password: string): Promise<void> {
        this.newUser = true;

        return new Promise((resolve, reject) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    resolve();
                })
                .catch((error: FirebaseError) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Creates new account with Google account */
    async signUpWithGoogle(): Promise<void> {
        this.newUser = true;

        return new Promise((resolve, reject) => {
            signInWithPopup(getAuth(), this.googleAuthProvider)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Creates new account with Facebook account */
    async signUpWithFacebook(): Promise<void> {
        this.newUser = true;

        return new Promise((resolve, reject) => {
            signInWithPopup(getAuth(), this.facebookAuthProvider)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject(error);
                });
        });
    }

    /** Logs out currently logged in user */
    async signOut(): Promise<void> {
        return new Promise((resolve, reject) => {
            signOut(getAuth())
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject();
                });
        });
    }

    /** Delete user's account and their data */
    async deleteAccount(): Promise<void> {
        const userToDelete = getAuth().currentUser;

        return new Promise((resolve, reject) => {
            deleteUser(userToDelete)
                .then(() => {
                    this.firebaseService.mailbox.deleteCollection.next(userToDelete.uid);
                    resolve();
                })
                .catch((error) => {
                    console.warn(error);
                    reject();
                });
        });
    }
}
