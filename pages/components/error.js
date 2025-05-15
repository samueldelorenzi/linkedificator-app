export default function Error({ message, onClose }) {
  return (
    <div className="d-flex justify-content-center mb-4">
      <div
        className="alert alert-danger alert-dismissible fade show text-center shadow-sm animate__animated animate__fadeInDown"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {message}
        {onClose && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          ></button>
        )}
      </div>
    </div>
  );
}
