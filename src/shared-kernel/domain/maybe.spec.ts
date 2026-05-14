import { Maybe } from './maybe';

describe('Maybe.some — valid inputs', () => {
  it('should create a present Maybe with the given value', () => {
    expect(Maybe.some('hello').isPresent()).toBe(true);
  });

  it('should expose the wrapped value via .value', () => {
    expect(Maybe.some(42).value).toBe(42);
  });

  it('should throw when receiving undefined', () => {
    expect(() => Maybe.some(undefined)).toThrow();
  });

  it('should throw when receiving null', () => {
    expect(() => Maybe.some(null)).toThrow();
  });
});

describe('Maybe.none — absent state', () => {
  it('should create an absent Maybe', () => {
    expect(Maybe.none().isAbsent()).toBe(true);
  });

  it('should not be present', () => {
    expect(Maybe.none().isPresent()).toBe(false);
  });
});

describe('Maybe.fromNullable — boundary conversion', () => {
  it('should create a present Maybe from a non-null value', () => {
    expect(Maybe.fromNullable('hello').isPresent()).toBe(true);
  });

  it('should create an absent Maybe from null', () => {
    expect(Maybe.fromNullable(null).isAbsent()).toBe(true);
  });

  it('should create an absent Maybe from undefined', () => {
    expect(Maybe.fromNullable(undefined).isAbsent()).toBe(true);
  });
});

describe('Maybe.value — access guard', () => {
  it('should throw when accessing value of an absent Maybe', () => {
    expect(() => Maybe.none<string>().value).toThrow();
  });

  it('should return the wrapped value when present', () => {
    expect(Maybe.some('hello').value).toBe('hello');
  });
});

describe('Maybe.getOrElse — fallback access', () => {
  it('should return the wrapped value when present', () => {
    expect(Maybe.some('hello').getOrElse('default')).toBe('hello');
  });

  it('should return the default value when absent', () => {
    expect(Maybe.none<string>().getOrElse('default')).toBe('default');
  });
});

describe('Maybe.map — transformation', () => {
  it('should transform the value when present', () => {
    expect(Maybe.some(2).map((x) => x * 3).value).toBe(6);
  });

  it('should return an absent Maybe when mapping over absent', () => {
    expect(
      Maybe.none<number>()
        .map((x) => x * 3)
        .isAbsent(),
    ).toBe(true);
  });
});

describe('Maybe.ifPresent — side effects', () => {
  it('should call the callback with the value when present', () => {
    const fn = jest.fn();
    Maybe.some('hello').ifPresent(fn);
    expect(fn).toHaveBeenCalledWith('hello');
  });

  it('should not call the callback when absent', () => {
    const fn = jest.fn();
    Maybe.none<string>().ifPresent(fn);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('Maybe.toNullable — persistence bridge', () => {
  it('should return the value when present', () => {
    expect(Maybe.some('hello').toNullable()).toBe('hello');
  });

  it('should return null when absent', () => {
    expect(Maybe.none<string>().toNullable()).toBeNull();
  });
});

describe('Maybe.equals — equality', () => {
  it('should return true when both are present with the same primitive value', () => {
    expect(Maybe.some('hello').equals(Maybe.some('hello'))).toBe(true);
  });

  it('should return false when present values differ', () => {
    expect(Maybe.some('hello').equals(Maybe.some('world'))).toBe(false);
  });

  it('should return true when both are absent', () => {
    expect(Maybe.none<string>().equals(Maybe.none<string>())).toBe(true);
  });

  it('should return false when one is present and the other is absent', () => {
    expect(Maybe.some('hello').equals(Maybe.none())).toBe(false);
  });

  it('should return false when other is not provided', () => {
    expect(Maybe.some('hello').equals()).toBe(false);
  });

  it('should return true when comparing an instance to itself', () => {
    const m = Maybe.some('hello');
    expect(m.equals(m)).toBe(true);
  });
});
