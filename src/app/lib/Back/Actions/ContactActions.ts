"use server";

import { connectToDb } from "../ConnectToDB";
import { Contact } from "../Models/Contact";
import { Order } from "../Models/Order";

export const AddContact = async (formData: FormData): Promise<void> => {
  const Name = formData.get("Name")?.toString();
  const Phone = formData.get("Phone")?.toString();
  const Email = formData.get("Email")?.toString();
  const Bussines = formData.get("Bussines")?.toString();
  const Message = formData.get("Message")?.toString();
  const ExecutiveName = formData.get("ExecutiveName")?.toString();

  try {
    await connectToDb();

    const newContact = new Contact({
      Name,
      Phone,
      Email,
      Bussines,
      Message,
      ExecutiveName,
    });
    await newContact.save();

    await Order.findOneAndUpdate(
      { executive: ExecutiveName },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
  }
};

export const GetMyContacts = async (executiveName: string) => {
  try {
    const contacts = await Contact.find({
      ExecutiveName: executiveName,
    });
    return contacts;
  } catch (error) {
    console.error("Erro ao buscar seus contatos:", error);
    throw error;
  }
};
