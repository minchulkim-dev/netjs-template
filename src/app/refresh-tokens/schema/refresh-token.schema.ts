import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/schema/user.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({
  collection: 'refreshTokens',
})
export class RefreshToken {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({ required: true })
  token: string;

  @Prop({ type: Date, required: true })
  expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

RefreshTokenSchema.index({ email: 1, token: 1 });
RefreshTokenSchema.index({ expiresAt: 1 });
