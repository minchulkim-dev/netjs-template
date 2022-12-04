import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  deletedAt: Date;

  // methods
  getAccessTokenPayload: () => any;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.getAccessTokenPayload = function () {
  return {
    name: this.name,
  };
};

UserSchema.index({ email: 1 }, { unique: true });
