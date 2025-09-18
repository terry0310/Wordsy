import { UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../../../main/auth/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  describe('handleRequest', () => {
    it('should return user when authentication is successful', () => {
      const mockUser = { id: 'user123', username: 'testuser' };

      const result = guard.handleRequest(null, mockUser, null);

      expect(result).toBe(mockUser);
    });

    it('should throw UnauthorizedException when user is null', () => {
      expect(() => {
        guard.handleRequest(null, null, null);
      }).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is undefined', () => {
      expect(() => {
        guard.handleRequest(null, undefined, null);
      }).toThrow(UnauthorizedException);
    });

    it('should throw error when err is present', () => {
      const error = new Error('Authentication failed');
      const mockUser = { id: 'user123', username: 'testuser' };

      expect(() => {
        guard.handleRequest(error, mockUser, null);
      }).toThrow(error);
    });

    it('should throw the original error when both err and no user', () => {
      const error = new Error('Token expired');

      expect(() => {
        guard.handleRequest(error, null, null);
      }).toThrow(error);
    });
  });
});