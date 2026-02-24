import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function OAuth() {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


  const handleGoogleClick = async () => {
    if (loading) return;
    
    setLoading(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt : 'select_account'});
    try{
        const resultsFromGoogle = await signInWithPopup(auth,provider);
        const res = await fetch("http://localhost:2068/api/auth/google" , {
            method : 'POST',
            credentials : 'include',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({
                name : resultsFromGoogle.user.displayName,
                email : resultsFromGoogle.user.email,
                googlePhotoUrl : resultsFromGoogle.user.photoURL,
            }),
        })
        const data = await res.json();
        if(res.ok){
            dispatch(signInSuccess(data));
            navigate('/');
        }
        
    }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }

  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3
             bg-white text-gray-700 font-medium
             border border-gray-300
             rounded-xl px-5 py-3
             shadow-sm
             hover:shadow-md hover:bg-gray-50
             active:scale-[0.98]
             transition-all duration-200
             disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <div className="bg-white p-1 rounded-full shadow-sm">
        <AiFillGoogleCircle className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
      </div>
      <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
    </button>
  );
}
