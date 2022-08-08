import { updateDoc, doc } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import homeIcon from '../../src/assets/svg/homeIcon.svg'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async () => {
    try {
      // make sure entered name is different to currently stored name
      if (auth.currentUser.displayName !== name) {
        // update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('Could not update your details')
    }
  }

  // useEffect(() => {
  //   setUser(auth.currentUser);
  // }, [])

  return (
  <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={onLogout}>
        Log Out
      </button>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        {/* change/done button */}
        <p className="changePersonalDetails" onClick={() => {
          changeDetails && onSubmit()
          setChangeDetails((prevState) => !prevState)
        }}>
          {changeDetails ? 'Done' : 'Change'}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <input 
            type="text" 
            id="name" 
            className={!changeDetails ? 'profileName' : 'profileNameActive'} 
            disabled={!changeDetails} 
            value={name} 
            onChange={onChange}
          />
          <input 
            type="text" 
            id="email" 
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} 
            disabled={!changeDetails} 
            value={email} 
            onChange={onChange}
          />
        </form>
      </div>
      <Link to={'/create-listing'} className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your home</p>
        <img src={arrowRight} alt="" />
      </Link>
    </main> 
  </div>
  )
}

export default Profile

