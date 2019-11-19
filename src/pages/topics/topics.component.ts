import { Component, OnInit } from '@angular/core';
import { SERVICES } from '../../config/webservices';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public totalPages: Number;
  public page: string;
  public next_page: any;
  public prev_page: any;
  public numbre_pages: any;
  Topics: any = {};
  public search: any;

  constructor(
    private ServicesProvider: ServicesProvider,
    public _route: ActivatedRoute,
    public _router: Router,
  ) {
    this.page_title = 'Preguntas';
    
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var page = +params['page'];


      if(!page || page == null || page == undefined){
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      } 
    this.fn_getTopics(page);
  });
}

prueba() {
  console.log("prueba nueva")
}

fn_getTopics(page = 1) {
  this.ServicesProvider.preloaderOn();
  this.ServicesProvider.get(SERVICES.LISTTOPIC + page, {}).then(data => {
    console.log(data);
    this.Topics = data.topics;

    //navegacion de paginacion
    //totalDocs
    this.totalPages = data.totalPages;
    var number_pages = [];
    for (var i = 1; i <= this.totalPages; i++) {
      number_pages.push(i);
    }

    this.numbre_pages = number_pages;

    if (page >= 2) {
      this.prev_page = page - 1;
    } else {
      this.prev_page = 1;
    }

    if (page < this.totalPages) {
      this.next_page = page + 1;
    } else {
      this.next_page = this.totalPages;
    }

    this.ServicesProvider.preloaderOff();
  }, _fail => {
    this.ServicesProvider.preloaderOff();
    this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
  });
}

goSearch(){
  this._router.navigate(['/buscar', this.search]);
  //console.log(this.search);
}

}


