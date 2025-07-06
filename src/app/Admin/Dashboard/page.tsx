import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/Back/auth";
import { redirect } from "next/navigation";
import { GetMyContacts } from "@/app/lib/Back/Actions/ContactActions";

interface Contact {
  _id: string;
  Name: string;
  Phone: string;
  Email: string;
  Bussines: string;
  Message: string;
  ExecutiveName: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/Admin");
  }

  const user = session.user;

  if (user && user.executive) {
    const contacts = await GetMyContacts(user.executive);

    return (
      <section>
        <h1>Sucesso</h1>
        <p>Bem-vindo, {user.executive}!</p>
        <h2>Seus contatos:</h2>

        {contacts && contacts.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {contacts.map((contact: Contact) => (
              <li
                key={contact._id}
                className="p-4 border rounded-lg bg-white shadow-md"
              >
                <p>
                  <strong>Nome:</strong> {contact.Name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.Email}
                </p>
                <p>
                  <strong>Telefone:</strong> {contact.Phone}
                </p>
                <p>
                  <strong>Empresa:</strong> {contact.Bussines}
                </p>
                <p>
                  <strong>Mensagem:</strong> {contact.Message}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Você ainda não recebeu nenhum contato.</p>
        )}
      </section>
    );
  } else {
    return (
      <section>
        <h1>Sucesso</h1>
        <p>Bem-vindo, {user.executive}!</p>
        <h2>Seus contatos:</h2>
        <p>Não há contatos novos no momento.</p>
      </section>
    );
  }
}
