import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppComponent } from './app.component';

import { ProjectDetailComponent } from './components/project-detail/project-detail.component';


const routes: Routes = [
    { path: 'details/:name/:id', component: ProjectDetailComponent },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
