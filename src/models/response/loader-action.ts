export const LOADER_ON = "LOADER_ON";
export const LOADER_OFF = "LOADER_OFF";
export const IS_LOADING = "IS_LOADING";

export const setLoaderOn = () => {
  return {
    type: LOADER_ON,
  };
};

export const setLoaderOff = () => {
  return {
    type: LOADER_OFF,
  };
};

export const setIsLoading = (payload: boolean) => {
  return {
    type: IS_LOADING,
    payload,
  };
};
