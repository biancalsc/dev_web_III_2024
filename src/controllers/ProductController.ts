import { Request, Response } from "express";
import Product from "../models/Product";
import mongoose from "mongoose";

class ProductController {
    public async create(req: Request, res: Response): Promise<void> {
        const { name, Category } = req.body;
        try {
            // Verifica se o Category é um ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(Category)) {
                res.send({ message: "Categoria inexistente" });
                return;
            }

            // Verifica se o Category existe
            const categoryExists = await mongoose.models.Category.exists({ _id: Category });
            if (!categoryExists) {
                res.send({ message: "Categoria inexistente" });
                return;
            }

            const response = await Product.create({ name, Category });
            res.send(response);
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O nome ${name} já está em uso` });
            }
            else if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            }
            else if (e.errors?.Category) {
                res.send({ message: e.errors.Category.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, name, Category } = req.body;
        try {
            // Verifica se o Category é um ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(Category)) {
                res.send({ message: "Categoria inexistente" });
                return;
            }

            // Verifica se o Category existe
            const categoryExists = await mongoose.models.Category.exists({ _id: Category });
            if (!categoryExists) {
                res.send({ message: "Categoria inexistente" });
                return;
            }

            const response = await Product.findByIdAndUpdate(
                id,
                { name, Category },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O nome ${name} já está em uso` });
            }
            else if (e.errors?.name) {
                res.send({ message: e.errors.name.message });
            }
            else if (e.errors?.Category) {
                res.send({ message: e.errors.Category.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Product.find(
            {},
            {},
            {
                sort: { name: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Product.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }
}


export default new ProductController();
