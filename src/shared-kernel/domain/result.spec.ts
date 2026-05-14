import { Result } from './result';

describe('Result.ok — successful result', () => {
  it('should report isSuccess as true and isFailure as false', () => {
    const result = Result.ok('value');
    expect(result.isSuccess).toBe(true);
    expect(result.isFailure).toBe(false);
  });

  it('should expose the wrapped value', () => {
    expect(Result.ok('hello').value).toBe('hello');
  });

  it('should throw when accessing error on a successful result', () => {
    expect(() => Result.ok('hello').error).toThrow();
  });
});

describe('Result.fail — failed result', () => {
  it('should report isFailure as true and isSuccess as false', () => {
    const result = Result.fail(new Error('oops'));
    expect(result.isFailure).toBe(true);
    expect(result.isSuccess).toBe(false);
  });

  it('should expose the wrapped error', () => {
    const error = new Error('something went wrong');
    expect(Result.fail(error).error).toBe(error);
  });

  it('should throw when accessing value on a failed result', () => {
    expect(() => Result.fail(new Error('oops')).value).toThrow();
  });
});
