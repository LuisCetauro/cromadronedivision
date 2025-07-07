import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/Back/auth";
import { redirect } from "next/navigation";
import {
  GetMyContacts,
  DeleteContact,
} from "@/app/lib/Back/Actions/ContactActions";

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
  slug: string;
}

export default async function Dashboard() {
  try {
    console.log("Iniciando Dashboard");

    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session) {
      redirect("/Admin");
    }

    const user = session.user;
    console.log("User:", user);

    if (user && user.executive) {
      let contacts: Contact[] = [];

      try {
        contacts = await GetMyContacts(user.executive);
        console.log("Contacts:", contacts);
      } catch (dbError) {
        console.error("Erro ao buscar contatos:", dbError);
        return (
          <section>
            <p>Erro ao carregar seus contatos. Tente novamente mais tarde.</p>
          </section>
        );
      }

      return (
        <section className="flex flex-col justify-center items-center mt-4">
          <div>
            <p>Bem-vindo, {user.executive}!</p>
            <button>Alterar senha</button>
          </div>
          <h2>Seus Leads:</h2>

          {contacts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {contacts.map((contact) => (
                <li
                  key={contact._id}
                  className="p-4 border rounded-lg bg-white shadow-md "
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
                  <form action={DeleteContact}>
                    <input type="hidden" name="slug" value={contact.slug} />
                    <button
                      className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                      type="submit"
                    >
                      Excluir Lead
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <p>Todos os seus leads foram respondidos.</p>
          )}
        </section>
      );
    } else {
      return (
        <section>
          <p>Bem-vindo!</p>
          <h2>Seus contatos:</h2>
          <p>Não há contatos novos no momento.</p>
        </section>
      );
    }
  } catch (error) {
    console.error("Erro no Dashboard:", error);
    return (
      <section>
        <h2>Erro ao carregar a página</h2>
        <pre>{String(error)}</pre>
      </section>
    );
  }
}
  