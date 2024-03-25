import mongoose, { Document, Schema } from 'mongoose';

export interface TodoDocument extends Document {
  title: string;
  description: string;
  
}

const todoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  
});

export default mongoose.model<TodoDocument>('Todo', todoSchema);
