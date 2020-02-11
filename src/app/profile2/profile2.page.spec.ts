import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Profile2Page } from './profile2.page';

describe('Profile2Page', () => {
  let component: Profile2Page;
  let fixture: ComponentFixture<Profile2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Profile2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Profile2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
