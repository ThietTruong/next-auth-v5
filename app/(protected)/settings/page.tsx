import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async (e) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </div>
  );
};
export default SettingPage;
