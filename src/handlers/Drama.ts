import {Request, Response} from 'express';
import {Drama, IDrama} from '../models/Drama';

// Get all dramas
const getAllDramas = async (req: Request, res: Response): Promise<void> => {
  try {
    const dramas: IDrama[] = await Drama.find({});
    res.status(200).json(dramas);
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({message: e.toUpperCase()});
    } else if (e instanceof Error) {
      res.status(500).json({message: e.message});
    }
  }
};

// Create a new drama
const createDrama = async (req: Request, res: Response): Promise<void> => {
  try {
    const drama: IDrama = new Drama(req.body);
    const createdDrama = await drama.save();
    res.status(201).json(createdDrama);
  } catch (e) {
    if (typeof e === 'string') {
      res.status(500).json({message: e.toUpperCase()});
    } else if (e instanceof Error) {
      res.status(500).json({message: e.message});
    }
  }
};

export {getAllDramas, createDrama};
