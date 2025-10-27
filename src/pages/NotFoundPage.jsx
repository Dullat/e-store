import { Link } from "react-router-dom";
import { FaGamepad } from "react-icons/fa";
import { useScrollToTop } from "../hooks/useScrollToTop";

const NotFoundPage = () => {
  useScrollToTop();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white bg-gradient-to-br from-zinc-900 via-zinc-950 to-[#161622] rounded-2xl p-8 shadow-lg mt-8 mx-2">
      <FaGamepad
        size={64}
        className="text-purple-500 mb-4 drop-shadow-lg animate-spin"
      />

      <h1 className="text-5xl font-extrabold mb-3 tracking-tight text-white drop-shadow">
        404
      </h1>
      <p className="text-lg text-zinc-300 mb-7 text-center max-w-md">
        Oops! Bro... The page you’re looking for does not exist,
        <br />
        or was removed by an ancient glitch in the Matrix.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-600 transition shadow-md text-lg"
      >
        👈 Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
