/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

type ReducerAction = {
  type: string;
  payload: any;
};

const initialState = {
  user: null,
  loading: true,
  globalLoading: false,
  error: undefined,
  resetEmail: "",
  nextRoute: {
    route: "",
  },
};

const Main = (state = initialState, { type, payload }: ReducerAction) => {
  if (type === "USER__INITIAL") {
    return {
      ...state,
      user: payload.user,
      loading: payload.loading,
      error: payload.error,
    };
  }
  if (type === "GLOBAL__LOADING__START") {
    return {
      ...state,
      globalLoading: true,
    };
  }
  if (type === "GLOBALlOADING__END") {
    return {
      ...state,
      globalLoading: false,
    };
  }

  if (type === "SIGNUP__SUCCESS__NOT_VERIFIED") {
    return {
      ...state,
      user: payload,
    };
  }
  if (type === "LOGIN__USER") {
    return {
      ...state,
      user: payload,
    };
  }
  if (type === "UPDATE__USER") {
    return {
      ...state,
      user: payload,
    };
  }
  if (type === "VERIFY__SUCCESS") {
    return {
      ...state,
      user: payload,
    };
  }

  // if (type === "NEXT__ROUTE__AFTER__AUTH") {
  //   return {
  //     ...state,
  //     currentMovieName: payload,
  //   };
  // }
  if (type === "NEXT_ROUTE_AFTER_AUTH") {
    return {
      ...state,
      nextRoute: payload,
    };
  }
  if (type === "USER__LOGED__OUT") {
    return {
      ...state,
      user: null,
    };
  }
  if (type === "STORE__RESET__EMAIL") {
    return {
      ...state,
      resetEmail: payload,
    };
  }

  return state;
};

export default Main;
