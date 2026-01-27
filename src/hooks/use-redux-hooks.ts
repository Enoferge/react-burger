import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import type { TAppDispatch, TRootState } from '@/store';

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
