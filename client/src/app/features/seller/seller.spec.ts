import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { Seller } from './seller';

describe('Seller', () => {
  let component: Seller;
  let fixture: ComponentFixture<Seller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seller],
      providers: [
        provideMockStore({
          initialState: {
            products: { products: [], loading: false, error: null, searchQuery: '' },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Seller);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
