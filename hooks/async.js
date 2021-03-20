import { useCallback, useReducer, useEffect, useRef } from 'react';

import { ACTIONS, STATUS, isIdle } from 'utils/operations';

const $fn = () => new Promise();
const states = {
  loading: STATUS.idle,
  data: undefined,
  error: undefined
};
const promiseHandlers = {
  onError: undefined,
  onCompleted: undefined
};
const initialState = {
  ...states,
  ...promiseHandlers
};
const reducer = (state = states, [type, payload]) => {
  switch (type) {
    case ACTIONS.RESET:
      return {
        ...state,
        loading: STATUS.idle
      };
    case ACTIONS.PENDING:
      return {
        ...state,
        loading: STATUS.pending
      };
    case ACTIONS.FULFILLED:
      return {
        loading: STATUS.fulfilled,
        data: payload,
        error: undefined
      };
    case ACTIONS.FAILED:
      return {
        ...state,
        loading: STATUS.failed,
        error: payload
      };
    default:
      return state;
  }
};

export const useBaseAsync = (fn = $fn, state = initialState, lazy = false) => {
  const mounted = useRef(false);
  const initiator = useRef(fn);
  const { onCompleted, onError, ...rest } = state;
  const options = { ...states, ...rest };
  const [newState, dispatch] = useReducer(reducer, options);
  const execute = useCallback(
    async (...args) => {
      dispatch([ACTIONS.PENDING]);

      try {
        const result = await Promise.resolve(initiator.current(...args));

        if (mounted.current) {
          if (typeof onCompleted === 'function') {
            onCompleted(result.data);
          }
          dispatch([ACTIONS.FULFILLED, result.data]);
        }
      } catch (e) {
        if (mounted.current) {
          if (typeof onError === 'function') {
            onError(e?.response?.data || e);
          }
          dispatch([ACTIONS.FAILED, e?.response?.data || e]);
        }
      }
    },
    [onCompleted, onError]
  );

  useEffect(() => {
    mounted.current = true;

    if (!lazy && isIdle(newState.loading)) {
      execute();
    }

    return () => {
      mounted.current = false;
    };
  }, [execute, lazy, newState.loading]);

  useEffect(() => {
    if (initiator.current !== fn) {
      initiator.current = fn;
      dispatch([ACTIONS.RESET]);
    }
  }, [fn]);

  return [newState, execute];
};

export const useAsync = (fn = $fn, state = initialState) =>
  useBaseAsync(fn, state, false);

export const useLazyAsync = (fn = $fn, state = initialState) =>
  useBaseAsync(fn, state, true);
