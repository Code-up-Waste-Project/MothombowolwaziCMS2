import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReclaimerPage } from './reclaimer.page';

describe('ReclaimerPage', () => {
  let component: ReclaimerPage;
  let fixture: ComponentFixture<ReclaimerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReclaimerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
