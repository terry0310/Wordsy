import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../../../main/auth/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockContext: ExecutionContext;

  beforeEach(() => {
    guard = new JwtAuthGuard();
    mockContext = {} as ExecutionContext;
  });

  describe('handleRequest', () => {
    it('should return user when authentication is successful', () => {
      const mockUser = { id: 'user123', username: 'testuser' };

      const result = guard.handleRequest(null, mockUser, null, mockContext);

      expect(result).toBe(mockUser);
    });

    it('should throw UnauthorizedException when user is null', () => {
      expect(() => {
        guard.handleRequest(null, null, null, mockContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is undefined', () => {
      expect(() => {
        guard.handleRequest(null, undefined, null, mockContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw error when err is present', () => {
      const error = new Error('Authentication failed');
      const mockUser = { id: 'user123', username: 'testuser' };

      expect(() => {
        guard.handleRequest(error, mockUser, null, mockContext);
      }).toThrow(error);
    });

    it('should throw the original error when both err and no user', () => {
      const error = new Error('Token expired');

      expect(() => {
        guard.handleRequest(error, null, null, mockContext);
      }).toThrow(error);
    });
  });
});