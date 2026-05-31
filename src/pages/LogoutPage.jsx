import { useLogoutQuery } from "../features/profile/profileApi.js";

const LogoutPage = () => {
  const { data, isError, isLoading, isSuccess } = useLogoutQuery();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div>
        {isLoading && !isSuccess
          ? "Logging Out..."
          : isSuccess && "Logged-Out..."}
      </div>
    </div>
  );
};

export default LogoutPage;
