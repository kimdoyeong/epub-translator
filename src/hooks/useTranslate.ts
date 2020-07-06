import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileSlice from "../store/FileSlice";
import { RootState } from "../store";
import Preload from "../constants/Preload";

function useTranslate() {
  const dispatch = useDispatch();
  const {
    to,
    translate,
    data: { bookPath },
    options,
  } = useSelector((state: RootState) => state.file);

  const onTranslate = useCallback(async () => {
    dispatch(FileSlice.actions.setProgress(true));

    const { TranslateManager } = Preload;
    const manager = new TranslateManager(to, bookPath, translate);
    const jobs = manager.setOptions(options).getJobs();

    for (const i in jobs) {
      const job = jobs[i];
      dispatch(
        FileSlice.actions.setProgressState(
          job.name + " 중... (" + (i + 1) + "/" + jobs.length + ")"
        )
      );
      await job.execute();
    }

    dispatch(FileSlice.actions.done());
  }, [dispatch, to, translate, bookPath, options]);

  return onTranslate;
}

export default useTranslate;
