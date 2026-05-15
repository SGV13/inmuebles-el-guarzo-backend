import { InvalidUserRoleException } from '../exceptions/invalid-user-role.exception';
import { UserRole } from './user-role.value-object';

describe('UserRole.create — valid roles', () => {
  it('should create an ADMIN role', () => {
    expect(UserRole.create('ADMIN').value).toBe('ADMIN');
  });

  it('should create an ADVISOR role', () => {
    expect(UserRole.create('ADVISOR').value).toBe('ADVISOR');
  });
});

describe('UserRole.create — invalid roles', () => {
  it('should throw when role is invalid', () => {
    expect(() => UserRole.create('SUPERUSER')).toThrow(InvalidUserRoleException);
  });

  it('should throw when role is empty string', () => {
    expect(() => UserRole.create('')).toThrow(InvalidUserRoleException);
  });

  it('should throw when role is lowercase', () => {
    expect(() => UserRole.create('admin')).toThrow(InvalidUserRoleException);
  });
});

describe('UserRole — factory methods', () => {
  it('should create ADMIN role via admin()', () => {
    const role = UserRole.admin();
    expect(role.value).toBe('ADMIN');
    expect(role.isAdmin()).toBe(true);
    expect(role.isAdvisor()).toBe(false);
  });

  it('should create ADVISOR role via advisor()', () => {
    const role = UserRole.advisor();
    expect(role.value).toBe('ADVISOR');
    expect(role.isAdvisor()).toBe(true);
    expect(role.isAdmin()).toBe(false);
  });
});

describe('UserRole.equals', () => {
  it('should return true for two roles with the same value', () => {
    expect(UserRole.create('ADMIN').equals(UserRole.create('ADMIN'))).toBe(true);
  });

  it('should return false for two different roles', () => {
    expect(UserRole.admin().equals(UserRole.advisor())).toBe(false);
  });

  it('should return false when other is not provided', () => {
    expect(UserRole.admin().equals()).toBe(false);
  });

  it('should return true when comparing an instance to itself', () => {
    const a = UserRole.admin();
    expect(a.equals(a)).toBe(true);
  });
});
