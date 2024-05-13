import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class User{
  
  @Prop({ unique: true, uppercase: true, trim: true})
  name: string;

  @Prop({ unique: false, trim: true})
  password: string;

  @Prop({ unique: true, uppercase: true, trim: true})
  email: string;

  @Prop({ unique: false})
  online: boolean;

}

export const userSchema = SchemaFactory.createForClass(User);