import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Lấy data từ supabase trực tiếp hoặc qua drizzle
/*
const supabase = await createClient();
const { data: test } = await supabase.from("Test").select();
*/

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (ex) {
          console.error("Error setAll supabase::", ex);
        }
      },
    },
  });
}
