import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosEditComponent } from './generos-edit.component';

describe('GenerosEditComponent', () => {
  let component: GenerosEditComponent;
  let fixture: ComponentFixture<GenerosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
