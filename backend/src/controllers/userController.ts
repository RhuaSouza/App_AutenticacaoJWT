import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../PrismaClient.js";

export async function users(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany();
  return res.status(200).json(allUsers);
}
export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const usuarioExistente = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (usuarioExistente) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const novoUsuario = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return res
    .status(201)
    .json({ message: "Usuário criado com sucesso", user: novoUsuario });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const usuario = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!usuario) {
    return res.status(400).json({ message: "Usuário ou senha inválidos" });
  }

  const passwordMatch = await bcrypt.compare(password, usuario.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Email ou senha inválidos" });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return res
    .status(200)
    .json({ message: "Login realizado com sucesso", token });
}

export async function profile(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return res.json(user);
}
