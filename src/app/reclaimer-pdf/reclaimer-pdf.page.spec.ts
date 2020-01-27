import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReclaimerPDFPage } from './reclaimer-pdf.page';

describe('ReclaimerPDFPage', () => {
  let component: ReclaimerPDFPage;
  let fixture: ComponentFixture<ReclaimerPDFPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclaimerPDFPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReclaimerPDFPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
