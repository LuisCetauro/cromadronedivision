import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

export const connectToDb = async () => {
  if (connection.isConnected) {
    console.log("✅ Já conectado ao MongoDB.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState === 1;

    console.log("✅ Conectado ao MongoDB com sucesso.");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message);
    throw new Error("Falha na conexão com o banco");
  }
};
