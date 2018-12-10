import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { TabManagerService } from '../../services/tabManager/tab-manager.service';
import { ExampleComponent } from '../example/example.component';
import { ModalExampleComponent } from '../modal-example/modal-example.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * Sidebar is opened
   */
  public asideOpened = false;

  next = 1;

  constructor(public tabManager: TabManagerService, public auth: AuthService, private modalService: NgbModal) {}

  ngOnInit() {
    this.tabManager.open('Aaron Wellbore X85eww', ExampleComponent, null, ['fas', 'home'], 'teal');
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, null, ['fas', 'check']);
  }

  addTab() {
    this.tabManager.open('Title<b>@</b>' + this.next, ExampleComponent, { message: 'hello world!' }).subscribe((tab) => {
      (<ExampleComponent>tab.componentInstance).message = 'IT WORKS!' + this.next++;
    });
  }

  goto() {
    this.tabManager.open('CCCCCCCFFFFFFFFFGGGGGGGGGKKKKKKKK', ExampleComponent, null, ['fas', 'check']);
  }

  openModal() {
    const promptRef = this.modalService.open(ModalExampleComponent, {
      backdrop: true,
      windowClass: 'full-modal'
    });
  }

  /**
   * Open/close sidebar
   */
  toggleSidebar() {
    this.asideOpened = !this.asideOpened;
  }
}
