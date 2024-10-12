import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function UserWidget() {
    const { user } = useUser(); 
    const [isOpen, setIsOpen] = useState(false); 
  
    console.log(user); 
  
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  
    if (!user) {
      return null; 
    }
  
    return (
      <div style={styles.widgetContainer}>
        <div onClick={togglePopup} style={styles.widget}>
          <span>{user.name.charAt(0)}</span>
        </div>
  
        {isOpen && (
          <div style={styles.popup}>
            <h3>{user.name}</h3>
            <p>Recycled Items: {user.recycledItems}</p>
          </div>
        )}
      </div>
    );
  }
  

const styles = {
  widgetContainer: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
  },
  widget: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    position: 'absolute',
    top: '50px',
    right: '0px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
    width: '200px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};
