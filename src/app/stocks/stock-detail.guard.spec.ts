import { TestBed, async, inject } from '@angular/core/testing';

import { StockDetailGuard } from './stock-detail.guard';

describe('StockDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockDetailGuard]
    });
  });

  it('should ...', inject([StockDetailGuard], (guard: StockDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
