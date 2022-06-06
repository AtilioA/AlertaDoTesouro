import { Request, Response } from 'express';
import ensureAuthenticated from './ensureAuthenticated';

describe('ensures', () => {
  it('rejects when JWT is missing', () => {
    const request = {
      headers: {
        // authorization: 'Bearer 12345',
      },
    } as Request; // Asserting to type is fine to mock a request, that's the whole point;
    const next = jest.fn();
    ensureAuthenticated(
      request,
      null as unknown as Response, // Passing stuff "force-asserting" like this is fine since for this function specifically it won't use it ever -- it's even names as `_` in the function definition
      next,
    );
    expect(next.mock.calls).toHaveLength(1);
    expect(next.mock.calls[0][0] instanceof Error).toBeTruthy();
    expect(next.mock.calls[0][0].message).toBe(
      'Invalid JSON Web Token: JSON Web Token is missing',
    );
  });

  // TODO
  it.todo('validates a valid and authentic JWT');

  describe('rejects JWT present but invalid', () => {
    it('not in Bearer token format', () => {
      const request = {
        headers: {
          authorization: '12345',
        },
      } as Request;
      const next = jest.fn();

      ensureAuthenticated(request, null as unknown as Response, next);

      expect(next.mock.calls).toHaveLength(1);
      expect(next.mock.calls[0][0] instanceof Error).toBeTruthy();
      expect(next.mock.calls[0][0].message).toBe(
        'Invalid JSON Web Token: jwt must be provided',
      );
    });

    it('rejects malformed JWT token', () => {
      const request = {
        headers: {
          authorization: 'Bearer 12345',
        },
      } as Request;
      const next = jest.fn();

      ensureAuthenticated(request, null as unknown as Response, next);

      expect(next.mock.calls).toHaveLength(1);
      expect(next.mock.calls[0][0] instanceof Error).toBeTruthy();
      expect(next.mock.calls[0][0].message).toBe(
        'Invalid JSON Web Token: jwt malformed',
      );
    });

    // TODO
    it.todo('invalid JWT token');
  });
});
