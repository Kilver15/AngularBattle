import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosStoreComponent } from './generos-store.component';

describe('GenerosStoreComponent', () => {
  let component: GenerosStoreComponent;
  let fixture: ComponentFixture<GenerosStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerosStoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerosStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
