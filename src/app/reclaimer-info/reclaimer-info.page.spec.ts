import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReclaimerInfoPage } from './reclaimer-info.page';

describe('ReclaimerInfoPage', () => {
  let component: ReclaimerInfoPage;
  let fixture: ComponentFixture<ReclaimerInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimerInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReclaimerInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
