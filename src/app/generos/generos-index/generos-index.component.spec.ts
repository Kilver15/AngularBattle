import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosIndexComponent } from './generos-index.component';

describe('GenerosIndexComponent', () => {
  let component: GenerosIndexComponent;
  let fixture: ComponentFixture<GenerosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
