import { Request, Response } from 'express';
import ensureAuthenticated from './ensureAuthenticated';

describe('ensures', () => {
  // FIXME not actually throwing WTF but when env is actually no set on server it throws. I don't think it have anything to do with asynchronous tests and such, since they are on different threads.
  it.skip('fails when `JWT_SECRET` env is not set', () => {
    const request = {
      // Is there a way to modularize this better? Doesn't feel DRY enough.
      headers: {
        authorization: 'Bearer 12345',
      },
    } as Request; // Asserting to type is fine to mock a request, that's the whole point;
    const next = jest.fn();
    delete process.env.JWT_SECRET;
    expect(() =>
      ensureAuthenticated(request, null as unknown as Response, next),
    ).toThrow();
  });

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
    // REVIEW - I don't know how to hard type `jest.fn.mock.calls` since they are `any[]`
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
