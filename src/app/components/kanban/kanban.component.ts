import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProjectDetailCateogory, ProjectDetails } from 'src/app/models/projectDetails';
import { FirebaseService } from 'src/app/service/firebase-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalPopupService } from 'src/app/shared/modal-popup/modal-popup.service';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  @ViewChild('taskInput') taskInput: ElementRef;

  projectName: string;
  taskName: string;
  edittaskName: string;

  @Input() projectDetails: any[] = [];
  @Input() kanbanType: string;
  @Input() categoryID: string;
  @Input() projectID: string;
  editProject: boolean;

  constructor(private fireservice: FirebaseService,
              private router: Router,
              private modalService: ModalPopupService) {

  }

  ngOnInit(): void {
    if (!this.projectDetails) {
      this.projectDetails = [];
      console.log(this.projectDetails.length);
    }
  }

  editText(project: ProjectDetails): void {
    project.isEdit = true;
  }


  editTask(modal: TemplateRef<any>, event, { taskName }) {
    this.editProject = true;
    this.edittaskName = taskName;
    this.taskInput.nativeElement.style.height = 'auto';
    this.modalService.open(modal, event.target);


  }


  updateProjectName(project: ProjectDetails): void {
    project.isEdit = false;
    console.log(project);
    const details = {
      projectName: project.projectName,
      status: project.status
    };
    this.fireservice.updateProject(details);
  }

  deleteProject(project: ProjectDetails): void {
    console.log(project.id);
    this.fireservice.deleteProject(project.id);
  }

  onSubmitProject(form: NgForm): void {
    if (this.projectName) {
      const doc = {
        projectName: this.projectName,
        status: 'Yet to complete',
      };
      this.projectDetails.push(doc);
      this.fireservice.addProject(doc);
      // console.log(this.projectDetails);
    }
    else {
      alert('Field is empty');
    }
  }

  onSubmitTask(form: NgForm): void {
    if (this.taskName) {
      const doc = {
        taskName: this.taskName,
        status: 'Completed',
      };
      this.taskName = '';
      if (!this.projectDetails) {
        this.projectDetails = [doc];
      }
      else {
        this.projectDetails.push(doc);
      }
      console.log(this.projectDetails);
      this.fireservice.updateTask(doc, this.projectID, this.categoryID);
    }

  }


  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.projectDetails);
  }


  exit($event): void {
    console.log('exit');
    console.log(this.projectDetails);
  }

  adjustHeight(event) {
    this.taskInput.nativeElement.style.height = '40px';
    this.taskInput.nativeElement.style.height = (24 + this.taskInput.nativeElement.scrollHeight - 24 ) + 'px';
  }



}
