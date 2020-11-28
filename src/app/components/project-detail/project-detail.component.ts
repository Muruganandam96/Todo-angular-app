import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectDetailCateogory } from 'src/app/models/projectDetails';
import { FirebaseService } from 'src/app/service/firebase-service.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  projectName: string;
  projectDetailCategory = [];
  projectID: string;
  newCategory: string;

  constructor(
    private fireservice: FirebaseService,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.projectID = params.get('id');
      this.projectName = params.get('name');
      this.fireservice.getProjectCollection(this.projectID).subscribe(res => {
        if (res.docs.length) {
          res.forEach(element => {
            const data = element.data() as ProjectDetailCateogory;
            data.id = element.id;
            console.log(data.id);
            this.projectDetailCategory.push(data);
          });
        }
        else {
          this.projectDetailCategory = [];
          console.log('empty');
        }
      });
    });
  }

  onLoad() {
    
  }

  onSubmitCategory(categoryForm: NgForm) {
    const doc = {
      categoryName: this.newCategory,
    };
    this.newCategory = '';
    this.projectDetailCategory.push(doc);
    this.fireservice.addCategory(doc, this.projectID);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.projectDetailCategory, event.previousIndex, event.currentIndex);

  }
}


