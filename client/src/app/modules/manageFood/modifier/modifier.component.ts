import { Component, OnInit } from '@angular/core';
import { title }  from "../../../shared/constant";

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css'],
})
export class ModifierComponent implements OnInit {
  title: string = title.Modifier;
  constructor() {}

  ngOnInit(): void {}
}
