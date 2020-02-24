import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Reclaimer2Page } from './reclaimer2.page';

describe('Reclaimer2Page', () => {
  let component: Reclaimer2Page;
  let fixture: ComponentFixture<Reclaimer2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reclaimer2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Reclaimer2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
