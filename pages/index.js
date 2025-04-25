import { useState, useEffect } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/v1/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Erro no fetch:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      }}
    >
      <Head>
        <title>Linkedificator</title>
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a
            className="navbar-brand fw-bold text-primary"
            style={{ fontSize: "1.5rem" }}
          >
            Linkedificator
          </a>
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
                  href="https://github.com/samueldelorenzi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-secondary"
                  href="https://linkedin.com/in/samueldelorenzi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container flex-grow-1" style={{ paddingTop: "80px" }}>
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(45deg, #4F46E5, #9333EA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Transforme qualquer situação em um post inspirador para o LinkedIn!
          </h1>
          <p className="lead text-muted mb-4">
            Criador de posts inspiradores para o LinkedIn, com um toque de humor
            e criatividade, apenas escreva sua situação e espere o resultado.
          </p>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className="input-group shadow-lg rounded-pill">
                <input
                  type="text"
                  className="form-control border-0 rounded-pill py-3 px-4"
                  placeholder="Escreva qualquer situação do dia a dia..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ fontSize: "1.1rem" }}
                  maxLength={200}
                />
                <div className="d-flex align-items-center px-3">
                  <small
                    className={`${
                      200 - input.length <= 20 ? "text-warning" : ""
                    } ${200 - input.length <= 10 ? "text-danger" : ""}`}
                  >
                    {input.length}/200
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4 py-3 ms-2"
                  disabled={loading}
                  style={{
                    background: "linear-gradient(45deg, #4F46E5, #9333EA)",
                    border: "none",
                    transition: "transform 0.2s",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Carregando...
                    </>
                  ) : (
                    "Criar post →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {data && (
          <div className="row justify-content-center animate__animated animate__fadeInUp">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0 mb-5">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-0 fw-bold">
                        Seu post inspirador:
                      </h5>
                    </div>

                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(data.chat);
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 10000);
                      }}
                    >
                      <i className="bi bi-clipboard mx-1"></i>
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <p
                    className="card-text text-muted"
                    style={{ lineHeight: "1.8" }}
                  >
                    {data.chat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-top py-4 mt-5">
        <div className="container text-center text-muted">
          <p className="mb-0">© 2025 Samuel De Lorenzi</p>
        </div>
      </footer>
    </div>
  );
}
