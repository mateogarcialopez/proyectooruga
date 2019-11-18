import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {
  public page_title: string;

  constructor() {
    this.page_title = 'Bienvenido al foro Oruga Learning';
   }

  ngOnInit() {
  }

}
