import { useEffect } from "react";
import { useLogoutMutation } from "../features/profile/profileApi.js";

const LogoutPage = () => {
  const [logout, { isLoading, isSuccess, isError }] = useLogoutMutation();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div>
        {isLoading && !isSuccess
          ? "Logging Out..."
          : isSuccess
            ? "Logged Out"
            : isError
              ? "Logout Failed"
              : null}
      </div>
    </div>
  );
};

export default LogoutPage;
