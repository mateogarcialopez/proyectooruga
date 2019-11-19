import { Component, OnInit } from '@angular/core';
import { SERVICES } from '../../config/webservices';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  //templateUrl: './search.component.html',
  templateUrl: '../topics/topics.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  Topics: any = {};
  public page_title: string;  
  public no_paginate: boolean;  

  constructor(
    private ServicesProvider: ServicesProvider,
    public _route: ActivatedRoute,
    //public fb: FormBuilder,
  ) {
    this.page_title = 'Buscar:';
    this.no_paginate = true;
  }


  ngOnInit() {

    this._route.params.subscribe(params => {
      var search = params['search'];
      this.page_title = this.page_title + ' ' + search;      
      console.log(this.page_title);
    });
    this.fn_getTopics();
  }

  fn_getTopics() {
    this._route.params.subscribe(params => {
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.BUSCAR + params['search'], {}).then(data => {
        console.log(data);
        this.Topics = data.topic;
        this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
      });
    });
  }

}
