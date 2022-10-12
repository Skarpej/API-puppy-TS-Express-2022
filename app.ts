import express from 'express';
import bodyParser from 'body-parser';
import { Application, Request, Response } from 'express';
import { getAllPuppies, getOnePuppy, createOnePuppy, updateOnePuppy, deleteOnePuppy } from './db'
import { Puppy } from 'type/puppy';

const app: Application = express();

app.use(bodyParser.json())

app.get('/api/puppies', async (_req: Request, res: Response) => {
  const allPuppies = await getAllPuppies();
  return res.json(allPuppies);
});

app.get('/api/puppies/:id', async (req: Request, res: Response) => {
  const onePuppy = await getOnePuppy(req.params.id as string);
  return res.json(onePuppy);
});

app.post('/api/puppies', async (req: Request, res: Response) => {
  const newPuppy = await createOnePuppy(req.body as Puppy);
  return res.status(201).json(newPuppy);
});

app.put('/api/puppies/:id', async (req: Request, res: Response) => {
  const updatedPuppy = await updateOnePuppy(req.params.id as string, req.body as Puppy)
  return res.json(updatedPuppy);
});

app.delete('/api/puppies/:id', async (req: Request, res: Response) => {
  await deleteOnePuppy(req.params.id as string);
  return res.sendStatus(204)
});


export default app;
