import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="brand-link">
              <span className="brand-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" width="24" height="24">
                  <path d="M392.8 65.2C375.8 60.3 358.1 70.2 353.2 87.2L225.2 535.2C220.3 552.2 230.2 569.9 247.2 574.8C264.2 579.7 281.9 569.8 286.8 552.8L414.8 104.8C419.7 87.8 409.8 70.1 392.8 65.2zM457.4 201.3C444.9 213.8 444.9 234.1 457.4 246.6L530.8 320L457.4 393.4C444.9 405.9 444.9 426.2 457.4 438.7C469.9 451.2 490.2 451.2 502.7 438.7L598.7 342.7C611.2 330.2 611.2 309.9 598.7 297.4L502.7 201.4C490.2 188.9 469.9 188.9 457.4 201.4zM182.7 201.3C170.2 188.8 149.9 188.8 137.4 201.3L41.4 297.3C28.9 309.8 28.9 330.1 41.4 342.6L137.4 438.6C149.9 451.1 170.2 451.1 182.7 438.6C195.2 426.1 195.2 405.8 182.7 393.3L109.3 320L182.6 246.6C195.1 234.1 195.1 213.8 182.6 201.3z" />
                </svg>
              </span>
              <span className="brand-name">CodeZapra</span>
            </Link>
            <p className="brand-tagline">Think first, code later.</p>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <Link to="/courses">Courses</Link>
              <Link to="/how-it-works">How It Works</Link>
            </div>

            <div className="link-group">
              <h4>Courses</h4>
              <Link to="/courses/python">Python</Link>
              <Link to="/courses/java">Java</Link>
              <Link to="/courses/javascript">JavaScript</Link>
              <Link to="/courses/dsa">Data Structures</Link>
            </div>

            <div className="link-group">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <a href="mailto:contact@codezapra.com">Contact</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} CodeZapra</p>
          <div className="footer-legal">
            <Link to="/about">Privacy</Link>
            <Link to="/about">Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          padding: 3rem 0 1.5rem;
        }

        .footer-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer-grid {
          display: flex;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        /* Brand */
        .footer-brand {
          flex-shrink: 0;
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          margin-bottom: 0.5rem;
        }

        .brand-icon {
          font-size: 1.125rem;
          font-weight: 700;
          color: #4f46e5;
          font-family: 'SF Mono', monospace;
        }

        .brand-name {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
        }

        .brand-tagline {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        /* Links */
        .footer-links {
          display: flex;
          gap: 4rem;
        }

        .link-group h4 {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .link-group a {
          display: block;
          font-size: 0.875rem;
          color: #374151;
          text-decoration: none;
          padding: 0.25rem 0;
          transition: color 0.15s;
        }

        .link-group a:hover {
          color: #4f46e5;
        }

        /* Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        .footer-bottom p {
          font-size: 0.8125rem;
          color: #9ca3af;
          margin: 0;
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal a {
          font-size: 0.8125rem;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-legal a:hover {
          color: #6b7280;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column;
            gap: 2rem;
          }

          .footer-links {
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .footer-links {
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .link-group {
            min-width: 100px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
