import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageusersPage } from './manageusers.page';

describe('ManageusersPage', () => {
  let component: ManageusersPage;
  let fixture: ComponentFixture<ManageusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageusersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
