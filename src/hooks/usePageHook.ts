import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import LoadBookPage from "../pages/LoadBookPage";

function usePageHook() {
  const file = useSelector((state: RootState) => state.file.file);
  const history = useHistory();

  useEffect(() => {
    if (file) {
      history.replace(LoadBookPage.path);
    }
  }, [history, file]);
}

export default usePageHook;
