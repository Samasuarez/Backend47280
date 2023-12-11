import {Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({required: true})
    first_name: string
    @Prop({required: true})
    last_name: string
    @Prop({required: true})
    email: string

}
export const UserSchema = SchemaFactory.createForClass(User)

