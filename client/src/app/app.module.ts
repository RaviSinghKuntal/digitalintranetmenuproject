import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DefaultModule } from './layout/default/default.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketioService } from './modules/services/socketio.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DefaultModule,
    NgbModule,
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
