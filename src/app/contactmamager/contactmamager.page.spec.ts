import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactmamagerPage } from './contactmamager.page';

describe('ContactmamagerPage', () => {
  let component: ContactmamagerPage;
  let fixture: ComponentFixture<ContactmamagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactmamagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactmamagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
