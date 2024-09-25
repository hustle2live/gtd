import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PRoutesProps {
	isAuthed: boolean;
	redirectPath: string;
	children: ReactNode;
}

const ProtectedRoute = ({
	isAuthed,
	redirectPath,
	children,
}: PRoutesProps): ReactNode => {
	if (!isAuthed) {
		return <Navigate to={redirectPath} replace />;
	}

	return <>{children}</>;
};

export { ProtectedRoute };
