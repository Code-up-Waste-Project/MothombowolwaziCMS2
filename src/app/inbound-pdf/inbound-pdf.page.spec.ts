import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboundPDFPage } from './inbound-pdf.page';

describe('InboundPDFPage', () => {
  let component: InboundPDFPage;
  let fixture: ComponentFixture<InboundPDFPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundPDFPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboundPDFPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
