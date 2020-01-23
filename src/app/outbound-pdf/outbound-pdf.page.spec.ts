import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutboundPDFPage } from './outbound-pdf.page';

describe('OutboundPDFPage', () => {
  let component: OutboundPDFPage;
  let fixture: ComponentFixture<OutboundPDFPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundPDFPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutboundPDFPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
