import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalPopupService {

  constructor() { }

  open(modal, target) {
    // this.moda
    modal.show(modal, target);
    console.log(modal);
  }

}
