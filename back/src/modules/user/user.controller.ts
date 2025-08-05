import { Response, Request } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  updateUserStreak,
  getUserStats,
  updateUserXaviCoins,
  assignMissionsToUser
} from "./user.service";
import { UserInput } from "../../models/User";
import { errorHelper } from "../../utils/error";
import { log } from "console";
import db from "../../config/database";


export const getUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const { section } = req.query;
    const users = await getUsers(section as string);
    res.json(users);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, pokemonId, section } = req.body;
    
    // Validaciones básicas
    if (!name || !email || !password) {
      res.status(400).json({
        error: "Los campos nombre, email y contraseña son obligatorios"
      });
      return;
    }
    
    if (!roleId || !pokemonId) {
      res.status(400).json({
        error: "Los campos roleId y pokemonId son obligatorios"
      });
      return;
    }
    
    const user = await createUser(name, email, password, roleId, pokemonId, section);
    
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: user
    });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = await updateUser(parseInt(id), userData);
    res.json(user);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(parseInt(id));
    res.json(user);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const verifyCodeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "El usuario ya está verificado" });
      return;
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      res.status(400).json({ message: "Código de verificación no encontrado" });
      return;
    }

    if (user.verificationCodeExpires < new Date()) {
      res.status(400).json({ message: "Código de verificación expirado" });
      return;
    }

    if (user.verificationCode !== code) {
      res.status(400).json({ message: "Código de verificación incorrecto" });
      return;
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.status(200).json({ message: "Usuario verificado correctamente" });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const updateUserStreakController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const result = await updateUserStreak(parseInt(userId));

    res.status(200).json({
      success: true,
      data: result,
      message: 'Streak actualizado correctamente'
    });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const getUserStatsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const stats = await getUserStats(parseInt(userId));

    res.status(200).json({
      success: true,
      data: stats,
      message: 'Estadísticas obtenidas correctamente'
    });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const updateUserXaviCoinsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount, operation = 'add' } = req.body;
    
    if (!userId || !amount) {
      res.status(400).json({ error: 'userId y amount son requeridos' });
      return;
    }

    if (operation !== 'add' && operation !== 'subtract') {
      res.status(400).json({ error: 'operation debe ser "add" o "subtract"' });
      return;
    }

    const result = await updateUserXaviCoins(parseInt(userId), Number(amount), operation);

    res.status(200).json({
      success: true,
      data: result,
      message: 'XaviCoins actualizadas correctamente'
    });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const assignMissionsToUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      res.status(400).json({ error: 'userId es requerido' });
      return;
    }

    const result = await assignMissionsToUser(parseInt(userId));

    res.status(200).json({
      success: true,
      data: result,
      message: 'Misiones asignadas correctamente'
    });
  } catch (error: any) {
    errorHelper(error, res);
  }
};
