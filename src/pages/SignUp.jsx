import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
// firebase
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import OAuth from "../Components/OAuth"

function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const {name, email, password} = formData

  const navigate = useNavigate()

  // capture form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value // idOfInput: enteredText
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      // registering the user - returns a promise
      const userCredential = await createUserWithEmailAndPassword
      (
        auth, 
        email, 
        password
      )
      // getting user info
      const user = userCredential.user

      // updating user display name
      updateProfile(auth.currentUser, {
        displayName: name
      })

        // add user to firestore
        // make a copy of form data
        const formDataCopy = {...formData}
        // remove password from copied variable
        delete formDataCopy.password
        // add a timestamp to copy data
        formDataCopy.timestamp = serverTimestamp()
        // setDoc updates database and adds user to 'users' firestore collection
        await setDoc(doc(db, 'users', user.uid), formDataCopy)

      // redirecting to home
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Hi! Nice to Meet You!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="text" className="nameInput" placeholder="Name:"      id='name' value={name} onChange={onChange}/>
            <input type="email" className="emailInput" placeholder="Email:" id='email' value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id='password' value={password} onChange={onChange}/>
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>

            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth */}
          <OAuth />

          <Link to='/sign-in' className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp