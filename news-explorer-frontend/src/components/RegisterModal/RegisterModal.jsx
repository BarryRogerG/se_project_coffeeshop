import { useState, useEffect } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './RegisterModal.css'

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(false)

  // Validate form whenever email, password, or name changes
  useEffect(() => {
    const emailValid = email.trim() !== '' && email.includes('@')
    const passwordValid = password.trim() !== '' && password.length >= 8
    const nameValid = name.trim() !== '' && name.length >= 2
    setIsValid(emailValid && passwordValid && nameValid)
  }, [email, password, name])

  // Update validation when inputs change
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid && onRegister) {
      onRegister({ email, password, name })
    }
  }

  const handleSwitchToLogin = () => {
    setEmail('')
    setPassword('')
    setName('')
    setIsValid(false)
    if (onSwitchToLogin) {
      onSwitchToLogin()
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="register"
      title="Sign up"
      buttonText="Sign up"
      onSubmit={handleSubmit}
      linkText="Sign in"
      onLinkClick={handleSwitchToLogin}
      isValid={isValid}
    >
      <div className="register-modal__field">
        <label htmlFor="register-email" className="register-modal__label">
          Email
        </label>
        <input
          type="email"
          id="register-email"
          name="email"
          className="register-modal__input"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="register-modal__field">
        <label htmlFor="register-password" className="register-modal__label">
          Password
        </label>
        <input
          type="password"
          id="register-password"
          name="password"
          className="register-modal__input"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          minLength="8"
          required
        />
      </div>
      <div className="register-modal__field">
        <label htmlFor="register-name" className="register-modal__label">
          Name
        </label>
        <input
          type="text"
          id="register-name"
          name="name"
          className="register-modal__input"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          required
        />
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal

