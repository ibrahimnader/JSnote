import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { produce } from "immer";

interface BundleType {
  loading: boolean;
  error: string | null;
  data: {
    [key: string]: {
      code: string;
      error: string;
    };
  };
}
const initialState: BundleType = {
  loading: false,
  error: null,
  data: {},
};
const bundlesReducer = produce((state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.BUNDLE_CREATED:
      state.data[action.payload.id] = action.payload.bundle;
      return state;
    default:
      return state;
  }
});
export default bundlesReducer;
