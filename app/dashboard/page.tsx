import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import SignOutButton from "../auth/SignOutButton";
import MyPosts from "./MyPosts";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="mx-4 md:mx-48 xl:mx-96 mt-6">
      <div className="flex justify-between items-center px-1 py-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-black dark:text-slate-50">
          What I've sAId.
        </h1>
        <SignOutButton />
      </div>
      <MyPosts />
    </main>
  );
};

export default Dashboard;
