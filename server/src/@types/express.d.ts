// Should be as global https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L15-L23
declare global {
  declare namespace Express {
    declare interface Request {
      user: { id: string };
      bony: unknown;
      params: {
        notification_id: string;
      };
    }
  }
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
