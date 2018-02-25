import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ProjectService } from './services/project.service';
import { JobsListComponent } from './edit-project/jobs-list/jobs-list.component';
import { JobDetailComponent } from './edit-project/job-detail/job-detail.component';
import { EntitiesService } from './services/entities.service';
import { InputStreamComponent } from './edit-project/input-stream/input-stream.component';
import { EnumsService } from './services/enums.service';
import { InputStreamService } from './services/input-stream.service';
import { ConvertComponent } from './convert/convert.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesService } from './services/messages.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'edit',
    component: EditProjectComponent
  },
  {
    path: 'convert',
    component: ConvertComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditProjectComponent,
    JobsListComponent,
    JobDetailComponent,
    InputStreamComponent,
    ConvertComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ProjectService, EntitiesService, InputStreamService, EnumsService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
