import { Component, OnInit, ViewChild } from '@angular/core';
import { title }  from "../../../shared/constant";
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  title: string = title.Item ;
  links: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor() {}

  ngOnInit(): void {}
}
