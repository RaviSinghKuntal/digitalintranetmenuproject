import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  links: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  title: string = 'Item';
  constructor() {}

  ngOnInit(): void {}
}
