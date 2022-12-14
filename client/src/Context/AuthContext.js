import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);
    const [isLoaded,setIsLoaded] = useState(true);

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
    // setIsAdmin(true)
        setIsAdmin(data.user.email === "b20165@students.iitmandi.ac.in")

        });
    }, []);    

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated,isAdmin,setIsAdmin}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}