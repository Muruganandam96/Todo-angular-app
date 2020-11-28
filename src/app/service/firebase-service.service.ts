import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fireservice: AngularFirestore) {

  }



  getProjects(): Observable<any> {
    // return this.fireservice.collection('projects').get();
    return this.fireservice.collection('projects').snapshotChanges();
  }

  getProjectCollection(id){
    return this.fireservice.collection('projects').doc(id).collection('categories').get();
  }


  addProject(doc): void {
    this.fireservice.collection('projects').add(doc);
  }

  addCategory(newCategory, projectID) {
    this.fireservice.collection('projects')
                    .doc(projectID)
                    .collection('categories').add(newCategory);
  }

  updateProject(project): void {
    this.fireservice.collection('projects').doc(project.id).update(project);
  }

  deleteProject(id): void {
    this.fireservice.collection('projects').doc(id).delete();
  }

  updateTask(doc, docID, categoryID): void {
    this.fireservice.collection('projects')
      .doc(docID)
      .collection('categories')
      .doc(categoryID).update({
        tasks: firebase.firestore.FieldValue.arrayUnion(doc)
      });
  }
}
