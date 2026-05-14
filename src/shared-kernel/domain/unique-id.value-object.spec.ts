import { InvalidUniqueIdException, UniqueId } from './unique-id.value-object';

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';
const VALID_UUID_2 = '550e8400-e29b-41d4-a716-446655440001';

describe('UniqueId.generate — auto-generated id', () => {
  it('should produce a value that matches the UUID format', () => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(UniqueId.generate().value).toMatch(uuidRegex);
  });

  it('should generate a unique value on each call', () => {
    expect(UniqueId.generate().value).not.toBe(UniqueId.generate().value);
  });
});

describe('UniqueId.fromString — valid UUID', () => {
  it('should create a UniqueId preserving the exact given value', () => {
    expect(UniqueId.fromString(VALID_UUID).value).toBe(VALID_UUID);
  });
});

describe('UniqueId.fromString — invalid UUID', () => {
  it('should throw when the value is empty', () => {
    expect(() => UniqueId.fromString('')).toThrow(InvalidUniqueIdException);
  });

  it('should throw when the value is an arbitrary string', () => {
    expect(() => UniqueId.fromString('not-a-uuid')).toThrow(InvalidUniqueIdException);
  });

  it('should throw when the version nibble is out of the accepted range', () => {
    expect(() => UniqueId.fromString('550e8400-e29b-91d4-a716-446655440000')).toThrow(
      InvalidUniqueIdException,
    );
  });
});

describe('UniqueId.equals — equality', () => {
  it('should return true for two ids with the same value', () => {
    expect(UniqueId.fromString(VALID_UUID).equals(UniqueId.fromString(VALID_UUID))).toBe(true);
  });

  it('should return false for two different ids', () => {
    expect(UniqueId.fromString(VALID_UUID).equals(UniqueId.fromString(VALID_UUID_2))).toBe(false);
  });

  it('should return false when other is not provided', () => {
    expect(UniqueId.fromString(VALID_UUID).equals()).toBe(false);
  });

  it('should return true when comparing an instance to itself', () => {
    const id = UniqueId.fromString(VALID_UUID);
    expect(id.equals(id)).toBe(true);
  });
});
