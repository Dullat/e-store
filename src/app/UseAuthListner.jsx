import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../features/profile/profileApi.js";
import { setProfile, unsetProfile } from "../features/profile/profileSlice";

const UseAuthListener = () => {
  const { data, isLoading, isError, error } = useGetProfileQuery();
  console.log(data, "this is from main root");

  return null;
};

export default UseAuthListener;
