import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase-service.service';
import { ProjectDetails } from '../../models/projectDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectDetails = [];

  constructor(
    private fireservice: FirebaseService,
    private router: Router) {

  }


  ngOnInit() {
    this.fireservice.getProjects().subscribe(res => {
      this.projectDetails = [];
      res.forEach(doc => {
        const data = doc.payload.doc.data() as ProjectDetails;
        data.id = doc.payload.doc.id;
        this.projectDetails.push(data);
      });
      const { id, projectName } = this.projectDetails[0];
      this.router.navigate(['/details', projectName, id]);

    });
  }


  navigateTo(project): void {

    this.projectDetails.forEach(el => {

      if (el.id === project.id) {
        el.isActive = true;
      }
      else {
        el.isActive = false;
      }

    });
    this.router.navigate(['/details', project.projectName, project.id]);
  }


}
