import AppLayout from "@/components/AppLayout";
import { getCurrentUser } from "@/lib/session";

export default async function Home() {

  const user = await getCurrentUser();

  return (
    <AppLayout>
      <div>
        <p>Seja bem-vindo, {user.name}.</p>
      </div>
    </AppLayout>
  )
}