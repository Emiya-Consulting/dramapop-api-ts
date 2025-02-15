import {Request, Response} from 'express';
import prisma from '../client';

// Get all dramas
export async function getDramas(req: Request, res: Response) {
  try {
    const dramas = await prisma.drama.findMany();

    if (!dramas) {
      res.status(204).json({
        status: true,
        message: 'There are no dramas to fetch',
      });
    }

    res.status(200).json({
      status: true,
      message: 'Dramas successfully fetched',
      data: dramas,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
}

// Create a new drama
export async function createDrama(req: Request, res: Response) {
  try {
    const drama = await prisma.drama.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: 'Drama successfully created',
      data: drama,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Server error',
    });
  }
}
