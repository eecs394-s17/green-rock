import { NgModule, ErrorHandler } from '@angular/core';
import { AutosizeModule } from 'angular2-autosize';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CommentsPage } from '../pages/comments/comments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignaturePadModule } from 'angular2-signaturepad';

export const firebaseConfig = {
  apiKey: "AIzaSyBKFbHiZ0KGRfw5r2NVlp2EsKfBNaJsamc",
  authDomain: "green-rock-231ab.firebaseapp.com",
  databaseURL: "https://green-rock-231ab.firebaseio.com",
  projectId: "green-rock-231ab",
  storageBucket: "green-rock-231ab.appspot.com",
  messagingSenderId: "356162231263"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CommentsPage
  ],
  imports: [
    SignaturePadModule,
    AutosizeModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
