import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDispatch } from "react-redux";
import { useLazyGetProfileQuery } from "../features/profile/profileApi";
import { setProfile, unsetProfile } from "../features/profile/profileSlice";

const UseAuthListener = () => {
  const dispatch = useDispatch();
  const [triggerGetProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "INITIAL_SESSION" && session?.user) {
          try {
            const profile = await triggerGetProfile(session.user.id).unwrap();
            dispatch(setProfile({ profile }));
          } catch (err) {
            console.error("Error loading profile:", err);
          }
        } else if (event === "SIGNED_OUT") {
          dispatch(unsetProfile());
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch, triggerGetProfile]);

  return null;
};

export default UseAuthListener;
