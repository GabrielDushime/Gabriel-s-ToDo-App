import { Request, Response } from 'express';
import Todo from '../models/Todo';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error: unknown) { // Type annotation for error
    res.status(500).json({ error: (error as Error).message }); // Type assertion for error
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error: unknown) { // Type annotation for error
    res.status(500).json({ error: (error as Error).message }); // Type assertion for error
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    res.json(updatedTodo);
  } catch (error: unknown) { // Type annotation for error
    res.status(500).json({ error: (error as Error).message }); // Type assertion for error
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error: unknown) { // Type annotation for error
    res.status(500).json({ error: (error as Error).message }); // Type assertion for error
  }
};
