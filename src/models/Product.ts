import mongoose, { ObjectId, Schema, Types } from "mongoose";
import Category from "./Category";

const CategorySchema = new Schema({
    name:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "O nome é obrigatório"]
    },
    category:{
        type: Types.ObjectId,
        ref: Category,
        required: [true, "A categoria é obrigatória"],
        validate: {
            validator: async function(_id:ObjectId){
                const documento = await mongoose.models.Category.findById(_id);
                return !!document;
            },
            message: "A categoria não existe no cadastro"
        }
    }
},{
    toJSON: {
        transform: function(doc,ret,options){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

export default mongoose.model("Category", CategorySchema, "categories");
