import {
    Route, 
    Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export default function PrivateRoute({ children }) {
    let {user} = useContext(AuthContext)
    return user ? children : (
        <Navigate to="/login" replace/>
    );
}
  