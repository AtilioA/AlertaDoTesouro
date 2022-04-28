declare module Express {
  export interface Request {
    user: { id: string };
  }
}
