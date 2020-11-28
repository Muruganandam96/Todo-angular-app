import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { KanbanComponent } from './components/kanban/kanban.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropdownDirective } from './shared/dropdown.directive';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoaderComponent } from './shared/loader/loader/loader.component';
import { ModalPopupComponent } from './shared/modal-popup/modal-popup.component';




@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    DropdownDirective,
    SidenavComponent,
    LoaderComponent,
    ModalPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
