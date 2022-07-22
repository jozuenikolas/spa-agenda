import { TestBed } from '@angular/core/testing';

import { PokemonResolver } from './pokemon.resolver';

describe('PokemonResolver', () => {
  let resolver: PokemonResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PokemonResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
