import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtxComponent } from './dashtx.component';

describe('DashtxComponent', () => {
  let component: DashtxComponent;
  let fixture: ComponentFixture<DashtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
