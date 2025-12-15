import { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './LoginModal.css'

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValid, setIsValid] = useState(false)

  // Validate form whenever email or password changes
  useEffect(() => {
    const emailValid = email.trim() !== '' && email.includes('@')
    const passwordValid = password.trim() !== ''
    setIsValid(emailValid && passwordValid)
  }, [email, password])

  // Update validation when inputs change
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid && onLogin) {
      onLogin({ email, password })
    }
  }

  const handleSwitchToRegister = () => {
    setEmail('')
    setPassword('')
    setIsValid(false)
    if (onSwitchToRegister) {
      onSwitchToRegister()
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="login"
      title="Sign in"
      buttonText="Sign in"
      onSubmit={handleSubmit}
      linkText="Sign up"
      onLinkClick={handleSwitchToRegister}
      isValid={isValid}
    >
      <div className="login-modal__field">
        <label htmlFor="login-email" className="login-modal__label">
          Email
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          className="login-modal__input"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="login-modal__field">
        <label htmlFor="login-password" className="login-modal__label">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          className="login-modal__input"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
    </ModalWithForm>
  )
}

export default LoginModal

