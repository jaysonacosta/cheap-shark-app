import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Output() toggle = new EventEmitter<boolean>();

  sidebarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.toggle.emit(this.sidebarOpen);
  }
}
