import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tnc-modal',
  standalone: true,
  templateUrl: './tnc-modal.component.html',
  styleUrls: ['./tnc-modal.component.scss']
})
export class TncModalComponent {
  constructor(
    private readonly activeModal: NgbActiveModal,
  ) {}

  close(): void {
    this.activeModal.close();
  }
}
