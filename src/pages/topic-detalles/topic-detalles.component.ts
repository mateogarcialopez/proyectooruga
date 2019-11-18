import { Component, OnInit } from '@angular/core';
import { SERVICES } from '../../config/webservices';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-detalles',
  templateUrl: './topic-detalles.component.html',
  styleUrls: ['./topic-detalles.component.scss']
})
export class TopicDetallesComponent implements OnInit {

  Topic: any = {};
  constructor(
    private ServicesProvider: ServicesProvider,
    public _route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.fn_getTopics();
  }


  fn_getTopics() {
    this._route.params.subscribe(params => {
      this.ServicesProvider.preloaderOn();
      this.ServicesProvider.get(SERVICES.TOPICS + params[''], {}).then(data => {
        console.log(data);
        this.Topic = data.topic;
        this.ServicesProvider.preloaderOff();
      }, _fail => {
        this.ServicesProvider.preloaderOff();
        this.ServicesProvider.generarPopupGenerico("Error", "Ha ocurrido un problema, por favor intentalo de nuevo", null);
      });
    });
  }
}
