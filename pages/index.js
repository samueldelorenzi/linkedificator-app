import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Error from "./components/error";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCooldown(20);

    fetch("/api/v1/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch(
        (error) =>
          setError("Erro ao gerar seu post. Entre em contato com o suporte."),
        setCooldown(0),
        setData(null)
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Head>
        <title>Linkedificator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container flex-grow-1">
        <div className="text-center mb-5 animate__animated animate__fadeIn">
          <h1 className="display-4 fw-bold mb-3 gradient">
            Transforme qualquer situação em um post inspirador para o LinkedIn!
          </h1>
          <p className="lead text-muted mb-4">
            Criador de posts inspiradores para o LinkedIn, um site de humor
            baseado nos textos motivacionais das redes sociais.
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
                  className="gradient-button btn btn-primary rounded-pill px-4 py-3 ms-2"
                  disabled={loading || cooldown > 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Carregando...
                    </>
                  ) : cooldown > 0 ? (
                    `Aguarde ${cooldown}s`
                  ) : (
                    "Criar post →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {error && <Error message={error} onClose={() => setError(null)} />}

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
                  <p className="card-text text-muted post-formatting">
                    {data.chat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}
