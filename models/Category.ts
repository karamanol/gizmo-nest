import mongoose, { Schema, Types } from "mongoose";

const propertySchema = new Schema({
  propertyName: {
    type: String,
    required: [true, "Property must have a name"],
  },
  propertyValuesArr: {
    type: [String],
    required: [true, "Add at least one value for the property"],
  },
});

const categorySchema = new Schema(
  {
    name: { type: String, required: [true, "Category must have a name"] },
    parentCat: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: [propertySchema] },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export type CategoryPropertyType = {
  propertyName: string;
  propertyValuesArr: string[];
};

export type CategoryType = {
  _id: Types.ObjectId;
  name: string;
  parentCat?: string;
  properties: CategoryPropertyType[];
};
