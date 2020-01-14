import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistersPage } from './registers.page';

describe('RegistersPage', () => {
  let component: RegistersPage;
  let fixture: ComponentFixture<RegistersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
