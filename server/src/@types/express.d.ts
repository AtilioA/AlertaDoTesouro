// Should be as global https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express-serve-static-core/index.d.ts#L15-L23
declare namespace Express {
  export interface Request {
    user: { id: string };
  }
}
