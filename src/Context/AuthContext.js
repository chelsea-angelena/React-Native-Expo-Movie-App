import React from 'react';
import { View, Text } from 'react-native';

import * as db from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = React.createContext();
