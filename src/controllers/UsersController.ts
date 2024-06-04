import { Request, Response } from "express";
import Users from "../models/Users";

class UsersController {
    public async create(req: Request, res: Response): Promise<void> {
        const { mail, password } = req.body;
        try {
            const response = await Users.create({ mail, password });
            res.send(response);
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O e-mail ${mail} já está em uso` });
            } else if (e.errors?.mail) {
                res.send({ message: e.errors.mail.message });
            } else {
                res.send({ message: e });
            }
        }
    }

    public async list(_: Request, res: Response): Promise<void> {
        res.send(await Users.find());
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await Users.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        } else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id, mail, password } = req.body;
        try {
            const response = await Users.findByIdAndUpdate(
                id,
                { mail, password },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            } else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
            if (e.code === 11000) {
                res.send({ message: `O e-mail ${mail} já está em uso` });
            } else if (e.errors?.mail) {
                res.send({ message: e.errors.mail.message });
            } else {
                res.send({ message: e });
            }
        }
    }
}

export default new UsersController();
