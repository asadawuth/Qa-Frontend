import { useAuth } from "../hook/use-auth";
import LoadingWeb from "../component/LoadingWeb";
import { useState } from "react";

export default function ConfirmsetImageDefault() {
  const { setProfileDefaults } = useAuth();
  const [loading, setLoading] = useState(false);
  const uploadImageDefault = async () => {
    try {
      setLoading(true);
      await setProfileDefaults();
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center p-3">
      {loading && <LoadingWeb />}
      <button
        type="submit"
        className="bg-slate-200 hover:bg-slate-300 rounded-lg font-bold p-3"
        onClick={uploadImageDefault}
      >
        Confirm
      </button>
    </div>
  );
}
