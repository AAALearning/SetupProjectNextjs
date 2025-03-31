import { getCurrentUser } from "@/utils/auth";

const Page = async () => {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  return (
    <div>
      <h1>
        {currentUser?.id} - {currentUser?.role}
      </h1>
      <p>This is private route</p>
    </div>
  );
};

export default Page;
