import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TeamNameComponent } from './team-name/team-name.component';
import { QuestionComponent } from './question/question.component';
import { AdminComponent } from './admin/admin.component';
import { ScreenComponent } from './screen/screen.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ReponseService } from './utilisateur/reponse.service';
import { QuestionService } from './question.service';
import { QuestionnaireService } from './admin/questionnaire.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TeamNameComponent,
    QuestionComponent,
    UtilisateurComponent,
    AdminComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [QuestionService, ReponseService, QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
