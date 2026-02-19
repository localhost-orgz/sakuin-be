import type { Request, Response } from 'express';

export const getProfile = (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json({
    status: 'success',
    data: user,
  });
};
