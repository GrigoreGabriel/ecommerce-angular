import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  @Output()
  cartOpen = new EventEmitter<boolean>();
  closeModal() {
    this.cartOpen.emit(false);
  }
}
