import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './navbar.css'

const NavBar = () => {
    const [err,setErr] = useState('');
    const [loading,setLoading] = useState(false);
    const {logout} = useAuth();
    const navigate = useNavigate();
    async function handleLogout(){
        try{
            setErr('');
            setLoading(true);
            await logout();
            navigate('/login');
        }catch(e){
            setErr('Failed to LogOut')
        }
        setLoading(false);
    }
  return (
    <>
    <div className="header">
        <div className="nav-elements">
          <Button disabled={loading} onClick={handleLogout}>Log Out</Button>
        </div>
    </div>
    {err&&
    <Alert variant='danger'>{err}</Alert>}
    </>
  )
}

export default NavBar;