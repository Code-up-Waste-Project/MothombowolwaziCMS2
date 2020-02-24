import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Inbound2Page } from './inbound2.page';

describe('Inbound2Page', () => {
  let component: Inbound2Page;
  let fixture: ComponentFixture<Inbound2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Inbound2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Inbound2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
