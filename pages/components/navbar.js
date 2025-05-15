export default function navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary">Linkedificator</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active fw-bold">Home</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-secondary"
                href="https://github.com/samueldelorenzi/linkedificator-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repositório
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-secondary"
                href="https://linkedin.com/in/samueldelorenzi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meu LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
