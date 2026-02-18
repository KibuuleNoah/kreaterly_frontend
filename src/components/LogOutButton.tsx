
import { IconLogout } from '@tabler/icons-react';
import { pb } from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';









function LogOutButton() {
  const navigate = useNavigate() 
  return (
    <button
      onClick={()=>{
        pb.authStore.clear()
        navigate('/auth')
      }}
      className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded"
    >
      <IconLogout size={18} />
      Logout
    </button>
  );
}

export default LogOutButton
