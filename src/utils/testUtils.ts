export const tryCatchWrapper = (fn: Function) => async (...arg: Array<any>) => {
      try {
            return await fn(...arg);
      } catch(e) {
            return e.response.errors[0];
      }
};
