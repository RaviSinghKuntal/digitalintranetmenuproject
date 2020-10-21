import { Component, OnInit } from '@angular/core';

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
