import { Store } from "redux";
import Preload from "../constants/Preload";

function storeMiddleware(store: Store) {
  return (next: any) => {
    return (action: any) => {
      const result = next(action);
      Preload.Store.store(store.getState());
      return result;
    };
  };
}

export default storeMiddleware;
