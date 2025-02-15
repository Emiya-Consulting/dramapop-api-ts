import {Request, Response} from 'express';
import prisma from '../client';

// Get all dramas
// ROUTE: '/api/v1/dramas'
// METHOD: Get
export async function getDramas(req: Request, res: Response) {
  try {
    const dramas = await prisma.drama.findMany();

    if (!dramas) {
      res.status(204).json({
        status: true,
        message: 'There are no dramas to fetch',
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: 'Dramas successfully fetched',
      data: dramas,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Get a single drama using the drama's id
// ROUTE: '/api/v1/dramas/:id'
// METHOD: Get
export async function getDrama(req: Request, res: Response) {
  try {
    const {id: dramaid} = req.params;
    const drama = await prisma.drama.findFirst({where: {id: dramaid}});

    console.log(dramaid);

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${dramaid}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Drama with id ${dramaid} successfully fetched`,
      data: drama,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Create a new drama
// ROUTE: '/api/v1/dramas'
// METHOD: Post
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
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Update a drama using the drama's id
// ROUTE: '/api/v1/dramas/:id'
// METHOD: Patch
export async function updateDrama(req: Request, res: Response) {
  try {
    const {id: dramaid} = req.params;

    const drama = await prisma.drama.findFirst({where: {id: dramaid}});

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${dramaid}`,
      });
    }

    const updatedDrama = await prisma.drama.update({
      where: {
        id: dramaid,
      },
      data: req.body,
    });

    res.status(200).json({
      status: true,
      message: `Drama with id ${dramaid} successfully updated`,
      data: updatedDrama,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error ${e}`,
    });
  }
}

// Delete a drama using the drama's id. This will perform a logical delete by toggling the drama's deleted flag to true
// ROUTE: '/api/v1/dramas/:id'
// METHOD: Delete
export async function deleteDrama(req: Request, res: Response) {
  try {
    const {id: dramaid} = req.params;

    const drama = await prisma.drama.findFirst({where: {id: dramaid}});

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${dramaid}`,
      });
    } else {
      const deletedDrama = await prisma.drama.update({
        where: {
          id: dramaid,
        },
        data: (drama.deleted = true),
      });

      res.status(200).json({
        status: true,
        message: `Drama with the id ${dramaid} successfully marked as deleted`,
        data: deletedDrama,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error ${e}`,
    });
  }
}
