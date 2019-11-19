import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {
  public page_title: string;
  public search: any;

  constructor(
    public _router: Router,
  ) {
    this.page_title = 'Bienvenido al foro Oruga Learning';
    
   }

  ngOnInit() {
  }

  goSearch(){
    this._router.navigate(['/buscar', this.search]);
    //console.log(this.search);
  }

}
