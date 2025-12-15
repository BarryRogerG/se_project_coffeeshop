import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {currentYear} Supersite, Powered by News API
      </p>
      <nav className="footer__nav">
        <a href="/" className="footer__link">Home</a>
        <a href="https://tripleten.com" className="footer__link" target="_blank" rel="noopener noreferrer">
          TripleTen
        </a>
      </nav>
    </footer>
  )
}

export default Footer

