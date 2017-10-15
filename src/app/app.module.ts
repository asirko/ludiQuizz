import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ScreenComponent } from './screen/screen.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { PlayerComponent } from './player/player.component';
import { QuestionnaireService } from './admin/questionnaire.service';
import { HttpModule } from '@angular/http';
import { PlayerNameComponent } from './player/player-name/player-name.component';
import { FormsModule } from '@angular/forms';
import { PlayerService } from './player/player.service';
import { HttpClientModule } from '@angular/common/http';
import { AutofocusDirective } from './shared/autofocus/autofocus.directive';
import { AdminService } from './admin/admin.service';
import { TestComponent } from './player/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerNameComponent,
    PlayerComponent,
    AdminComponent,
    ScreenComponent,
    AutofocusDirective,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuestionnaireService, PlayerService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
