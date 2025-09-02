import { getUser } from "@/services/user.actions";
import { LogoutButton } from "./components/logout-button";

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-6 border-2 border-gray-800 rounded-lg w-full max-w-[500px]">
        <h1 className="text-2xl font-medium font-sans flex flex-row items-center gap-2">
          <span className="text-white">NextJS</span>
          <span className="text-gray-400">Profile</span>
        </h1>

        <ul className="flex flex-col gap-2 text-gray-400">
          <li>
            <span className="font-medium text-white">Name:</span> {user?.fullname}
          </li>
          <li>
            <span className="font-medium text-white">Email:</span> {user?.email}
          </li>
        </ul>

        <footer className="mt-4 w-full flex flex-col items-center gap-2">
          <LogoutButton />
        </footer>
      </div>
    </div>
  );
}