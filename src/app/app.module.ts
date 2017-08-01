import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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
import { NomEquipeComponent } from './utilisateur/nom-equipe/nom-equipe.component';
import { FormsModule } from '@angular/forms';
import { NomEquipeService } from './utilisateur/nom-equipe/nom-equipe.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NomEquipeComponent,
    QuestionComponent,
    UtilisateurComponent,
    AdminComponent,
    ScreenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuestionService, ReponseService, QuestionnaireService, NomEquipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
