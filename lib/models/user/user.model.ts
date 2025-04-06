import { model, models, Schema } from "mongoose";
import { IAddress, IUser } from "./interface";

const AddressSchema = new Schema<IAddress>({
  fullName: { type: String, required: true },
  phone: { type: String },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    addresses: { type: [AddressSchema], default: [] },
    role: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
