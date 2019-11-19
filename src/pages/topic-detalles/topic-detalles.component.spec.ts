import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetallesComponent } from './topic-detalles.component';

describe('TopicDetallesComponent', () => {
  let component: TopicDetallesComponent;
  let fixture: ComponentFixture<TopicDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
