import { useAppSelector } from '@/hooks/use-redux-hooks';
import { ROUTES } from '@/pages/constants';
import { Navigate, useLocation } from 'react-router-dom';

import type { ReactNode } from 'react';

type LocationState = {
  from?: { pathname: string };
};

export const ACCESS_TYPE = {
  ANY: 'any',
  AUTH: 'auth',
  GUEST: 'guest',
} as const;

export type AccessType = (typeof ACCESS_TYPE)[keyof typeof ACCESS_TYPE];

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
    return <div>Loading...</div>;
  }

  if (access === ACCESS_TYPE.AUTH && !user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} />;
  }

  if (access === ACCESS_TYPE.GUEST && user) {
    const locationState = (location.state as LocationState | null) ?? {
      from: { pathname: ROUTES.HOME },
    };
    const from = locationState.from ?? { pathname: ROUTES.HOME };
    return <Navigate to={from} />;
  }

  return <>{children}</>;
};
