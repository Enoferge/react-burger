import { Loading } from '@/components/loading/loading';
import { useAppSelector } from '@/hooks/use-redux-hooks';
import { ROUTES } from '@/pages/constants';
import { Navigate, useLocation } from 'react-router-dom';

import { ACCESS_TYPE, type AccessType } from './protected-route.constants';

import type { LocationState } from '@/types';
import type { ReactNode } from 'react';

export const ProtectedRoute = ({
  access = ACCESS_TYPE.ANY,
  children,
}: {
  access?: AccessType;
  children: ReactNode;
}): React.JSX.Element => {
  const location = useLocation();
  const { isAuthChecked, user } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <Loading />;
  }

  if (access === ACCESS_TYPE.AUTH && !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  if (access === ACCESS_TYPE.GUEST && user) {
    const from = (location.state as LocationState | null)?.from ?? {
      pathname: ROUTES.HOME,
    };
    return <Navigate to={from} />;
  }

  return <>{children}</>;
};
