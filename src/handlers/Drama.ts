import {Request, Response} from 'express';
import prisma from '../client';
import {Drama} from '@prisma/client';

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
    const id = parseInt(req.params.id);
    const drama = await prisma.drama.findFirst({where: {id}});

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Drama with id ${id} successfully fetched`,
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
    const drama: Drama = await prisma.drama.create({
      data: {
        title: req.body.title,
        year: req.body.year,
        thumbnailURL: req.body.thumbnailURL,
        description: req.body.description,
        seasons: req.body.seasons,
        episodes: req.body.episodes,
        modifiedOn: new Date(),
        genreId: req.body.genreId,
        originCountryId: req.body.originCountryId,
        cast: {
          connect: {id: req.body.actorId},
        },
        staff: {
          connect: {id: req.body.personId},
        },
        tags: {
          connect: {id: req.body.tagId},
        },
      },
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
    const id = parseInt(req.params.id);

    const drama = await prisma.drama.findFirst({where: {id}});

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${id}`,
      });
    } else {
      const updatedDrama = await prisma.drama.update({
        where: {
          id,
        },
        data: {
          title: req.body.title,
          year: req.body.year,
          thumbnailURL: req.body.thumbnailURL,
          description: req.body.description,
          seasons: req.body.seasons,
          episodes: req.body.episodes,
          modifiedOn: new Date(),
          genreId: req.body.genreId,
          originCountryId: req.body.originCountryId,
          cast: {
            connect: {id: req.body.actorId},
          },
          staff: {
            connect: {id: req.body.personId},
          },
          tags: {
            connect: {id: req.body.tagId},
          },
        },
      });

      res.status(200).json({
        status: true,
        message: `Drama with id ${id} successfully updated`,
        data: updatedDrama,
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

// Delete a drama using the drama's id. This will perform a logical delete by toggling the drama's deleted flag to true
// ROUTE: '/api/v1/dramas/:id'
// METHOD: Delete
export async function deleteDrama(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const drama = await prisma.drama.findFirst({where: {id}});

    if (!drama) {
      res.status(404).json({
        status: false,
        message: `There is no drama with the id ${id}`,
      });
    } else {
      const deletedDrama = await prisma.drama.update({
        where: {
          id,
        },
        data: {
          deleted: (drama.deleted = true),
          modifiedOn: (drama.modifiedOn = new Date()),
        },
      });

      res.status(200).json({
        status: true,
        message: `Drama with the id ${id} successfully marked as deleted`,
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
