import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public search: any;

  constructor(
    public _router: Router,
  ) { }

  ngOnInit() {
  }


  goSearch(){
    this._router.navigate(['/buscar', this.search]);
    //console.log(this.search);
  }

}
