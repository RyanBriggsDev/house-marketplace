import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify';
import OAuth from "../Components/OAuth";

// firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value // idOfInput: enteredText
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // initialise auth
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user) {
        navigate('/')
      }
    } catch (error) {
      toast.error('Incorrect user credentials')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className="emailInput" placeholder="Email:" id='email' value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'} className="passwordInput" placeholder="Password" id='password' value={password} onChange={onChange}/>
              <img src={visibilityIcon} alt="show password" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* Google OAuth */}
          <OAuth />

          <Link to='/sign-up' className="registerLink">
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignIn