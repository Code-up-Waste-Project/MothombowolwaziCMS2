import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutboundDriverInfoPage } from './outbound-driver-info.page';

describe('OutboundDriverInfoPage', () => {
  let component: OutboundDriverInfoPage;
  let fixture: ComponentFixture<OutboundDriverInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundDriverInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutboundDriverInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
