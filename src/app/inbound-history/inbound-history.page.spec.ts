import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InboundHistoryPage } from './inbound-history.page';

describe('InboundHistoryPage', () => {
  let component: InboundHistoryPage;
  let fixture: ComponentFixture<InboundHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InboundHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
