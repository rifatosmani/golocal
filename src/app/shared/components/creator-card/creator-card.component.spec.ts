import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreatorCardComponent } from './creator-card.component';

describe('CreatorCardComponent', () => {
  let component: CreatorCardComponent;
  let fixture: ComponentFixture<CreatorCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CreatorCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
