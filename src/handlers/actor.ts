import {Request, Response} from 'express';
import prisma from '../client';

// Get all actors
// ROUTE: '/api/v1/actors'
// METHOD: Get
export async function getActors(req: Request, res: Response) {
  try {
    const actors = await prisma.actor.findMany();

    if (!actors) {
      res.status(204).json({
        status: true,
        message: 'There are no actors to fetch',
        data: [],
      });
    }

    res.status(200).json({
      status: true,
      message: 'Actors successfully fetched',
      data: actors,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Get a single actor using the actor's id
// ROUTE: '/api/v1/actors/:id'
// METHOD: Get
export async function getActor(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const actor = await prisma.actor.findFirst({where: {id}});

    if (!actor) {
      res.status(404).json({
        status: false,
        message: `There is no actor with the id ${id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Actor with id ${id} successfully fetched`,
      data: actor,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Create a new actor
// ROUTE: '/api/v1/actors'
// METHOD: Post
export async function createActor(req: Request, res: Response) {
  try {
    const actor = await prisma.actor.create({
      data: req.body,
    });

    res.status(201).json({
      status: true,
      message: 'Actor successfully created',
      data: actor,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: false,
      message: `Server error: ${e}`,
    });
  }
}

// Update an actor using the actor's id
// ROUTE: '/api/v1/actors/:id'
// METHOD: Patch
export async function updateActor(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const {firstName, lastName, thumbnailURL, createdOn, deleted} = req.body;

    const actor = await prisma.actor.findFirst({where: {id}});

    if (!actor) {
      res.status(404).json({
        status: false,
        message: `There is no actor with the id ${id}`,
      });
    } else {
      const updatedActor = await prisma.actor.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          thumbnailURL,
          createdOn,
          modifiedOn: (actor.modifiedOn = new Date()),
          deleted,
        },
      });

      res.status(200).json({
        status: true,
        message: `Actor with id ${id} successfully updated`,
        data: updatedActor,
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

// Delete an actor using the actor's id. This will perform a logical delete by toggling the actor's deleted flag to true
// ROUTE: '/api/v1/actors/:id'
// METHOD: Delete
export async function deleteActor(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const actor = await prisma.actor.findFirst({where: {id}});

    if (!actor) {
      res.status(404).json({
        status: false,
        message: `There is no actor with the id ${id}`,
      });
    } else {
      const deletedActor = await prisma.actor.update({
        where: {
          id,
        },
        data: {
          deleted: (actor.deleted = true),
          modifiedOn: (actor.modifiedOn = new Date()),
        },
      });

      res.status(200).json({
        status: true,
        message: `Actor with the id ${id} successfully marked as deleted`,
        data: deletedActor,
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
