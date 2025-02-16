import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryCardComponent } from './category-card.component';

describe('CategoryCardComponent', () => {
  let component: CategoryCardComponent;
  let fixture: ComponentFixture<CategoryCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CategoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
