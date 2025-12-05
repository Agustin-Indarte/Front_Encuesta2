import {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [user, setUser] = useState(null);
const [profileImage, setProfileImage] = useState(null);
const [loading, setLoading] = useState(true);

const getToken = () => localStorage.getItem("token");

const register = async (userData) =>{ 
    return await authService.register(userData)
}

const login = async (credentials) => {
    const {token, user} = await authService.login(credentials);
    localStorage.setItem("token", token)
    setUser(user);
    await getProfile(); // cargar la imagen y el perfil actualizado    
}

const logout = async () => {
    const token = getToken();
    try {
        if (token) {
            await fetch("https://back-encuesta2.onrender.com/api/v1/logout", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        toast.success("Sesión cerrada");
    } finally {
        localStorage.removeItem("token");
        setUser(null);
        setProfileImage(null);
    }
}

const getProfile = async () => {
    const token = getToken();

    if(!token){
        return        
    }

    const data = await authService.profile()

    setUser(data)

    //si hay una imagen, armar la URL para mostrarla en el navegador
    if(data.profileImage){
        setProfileImage(`https://back-encuesta2.onrender.com${data.profileImage}`)
    }
}

//useEffect que solo se ejecuta si hay un token ya guardado
useEffect(() => { 
    const token = getToken()

        if(!token){
            setLoading(false);
            return
        }

        const init = async () => {
            try {
                const valid = await authService.verifyToken();
                if(valid){
                    await getProfile()
                } else {
                    toast.error("Tu sesión expiró. Vuelve a iniciar sesión.");
                    await logout()
                }                
            } catch (error) {
                toast.error("Error al verificar sesión. Vuelve a iniciar sesión.");
                await logout()               
            } finally {
                setLoading(false);
            }
        };

        init()

}, []);

    return (
        <AuthContext.Provider
        value={{
            user,
            login,
            register, 
            logout,
            profileImage,
            getProfile,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

