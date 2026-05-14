import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API está a funcionar 🚀" });
});

// COLOCA A ROTA AQUI
app.post("/users", async (req, res) => {
  try {
    const { email, password, name, phone, userType, driverProfile } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        phone,
        userType,
        driverProfile: userType === "DRIVER" && driverProfile
          ? {
              create: {
                vehicleModel: driverProfile.vehicleModel,
                vehiclePlate: driverProfile.vehiclePlate,
                vehicleColor: driverProfile.vehicleColor,
                licenseNumber: driverProfile.licenseNumber,
              },
            }
          : undefined,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.log("ERRO:", error);
    res.status(500).json({ error: error.message });
  }
});

// A ROTA LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.json({
      message: "Login realizado",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });

  } catch (error) {
    console.log("ERRO LOGIN:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔥 NÃO APAGAR ISTO
app.listen(3001, "0.0.0.0", () => {
  console.log("Servidor rodando na porta 3001");
});