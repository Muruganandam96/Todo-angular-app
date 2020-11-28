import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit, OnDestroy {

  private element: any;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {

    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal--overlay') {
        this.hide();
      }
    })

  }

  show(modal, target: HTMLElement) {
    const ele = target.parentElement.parentElement as HTMLElement;
    const top = ele.getBoundingClientRect().top + 'px';
    const left = ele.getBoundingClientRect().left + 'px';
    const node = this.element.firstElementChild;
    node.setAttribute('style', 'display: block;');
    console.log(node.firstElementChild);
    node.firstElementChild.setAttribute('style', 'top: ' + top + '; left: ' + left + ';');
    document.body.appendChild(this.element);
  }

  hide() {
    const node = this.element.firstElementChild;
    node.setAttribute('style', 'display: none;');
    document.body.removeChild(this.element);
  }

  ngOnDestroy(): void {
    this.element.remove();
    document.body.removeChild(this.element);
}



}
