import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { TabManagerService } from '../../services/tabManager/tab-manager.service';
import { ModalExampleComponent } from '../modal-example/modal-example.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public asideOpened = false;

  constructor(public tabManager: TabManagerService, public auth: AuthService, private modalService:
    NgbModal, private authService: AuthService) {}

  ngOnInit() {
    // this.tabManager.open('Personnel', PersonnelListComponent, null, ['far', 'address-card'], 'orange');
    // this.tabManager.open('Users', UsersListComponent, null, ['fas', 'users'], 'teal');
    // this.tabManager.open('Timesheet', TimesheetListComponent, null, ['fas', 'clock'], 'pink');
    this.tabManager.open('Dashboard', DashboardComponent, null, ['fas', 'home'], 'primary');
  }

  openModal() {
    const promptRef = this.modalService.open(ModalExampleComponent, {
      backdrop: true,
      windowClass: 'full-modal'
    });
  }

  openComposeModal() {
    const promptRef = this.modalService.open(ModalExampleComponent, {
      backdrop: false,
      container: '#compose-container',
      windowClass: 'compose-modal'
    });
  }

  openUsersList() {

  }

  /**
   * Open/close sidebar
   */
  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }
}
