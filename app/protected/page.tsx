import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAILS } from "@/utils/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  if (user.email && ADMIN_EMAILS.includes(user.email)) {
    redirect('/protected/admin');
  }

  redirect('/protected/vote');
}
