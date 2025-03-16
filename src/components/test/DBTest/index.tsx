import { getDBData } from "@/actions/test/db";
import CreateDataButton from "./CreateDataButton";

// Call db
const DBTest = async () => {
  const users = await getDBData();
  return (
    <>
      <CreateDataButton />
      {users.map((u) => (
        <div key={u.id}>
          <p>
            {u.id} - {u.name} - {u.email}
          </p>
        </div>
      ))}
    </>
  );
};

export default DBTest;
