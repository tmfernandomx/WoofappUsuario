import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from 'angularfire2'; //importar estas tres cosas
import { environment } from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { AngularFireAuthModule} from '@angular/fire/auth';
import { PipesModule } from './pipes/pipes.module';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     PipesModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFirestoreModule, AngularFireAuthModule,
     ComponentsModule,
    ],
  providers: [
    SocialSharing,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
