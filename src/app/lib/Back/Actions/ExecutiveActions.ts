import { connectToDb } from "../ConnectToDB";
import { Order } from "../Models/Order";
import { User } from "../Models/User";

export const getPrioOrder = async () => {
  try {
    await connectToDb();
    const res = await Order.findOne().sort({ count: 1 }).exec();
    const exec = await User.findOne({ executive: res.executive });
    const ContactData = {
      executive: exec.executive,
      descp: exec.descp,
      wpp: exec.wpp,
      src: exec.src,
    };

    return ContactData;
  } catch (error) {
    console.error("Erro ao determinar o consultor", error);
  }
};
