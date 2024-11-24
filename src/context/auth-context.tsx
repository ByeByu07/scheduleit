// import { createContext, useContext, ReactNode } from 'react';
// import { useAuth, useUser } from '@clerk/clerk-react';
// import React from 'react';

// interface AuthContextType {
//   isLoaded: boolean;
//   isSignedIn: boolean | undefined;
//   userId: string | null;
//   user: any;
// }

// const AuthContext = createContext<AuthContextType>({
//   isLoaded: false,
//   isSignedIn: undefined,
//   userId: null,
//   user: null,
// });

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const { isLoaded, isSignedIn, userId } = useAuth();
//   const { user } = useUser();

//   return (
//     <AuthContext.Provider value={{ isLoaded, isSignedIn, userId, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuthContext = () => useContext(AuthContext);
