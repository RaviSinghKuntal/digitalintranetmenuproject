import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DialogBoxService } from '../../../services/dialog.service';
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Input() title: Title;
  constructor(private router: Router, private _dialogBox: DialogBoxService) {}

  ngOnInit(): void {}

  openDialog() {
    this._dialogBox.openDialog();
  }
}
