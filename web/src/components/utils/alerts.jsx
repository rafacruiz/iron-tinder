function Alert({ message, type = "error", center = false }) {

  const styles = {
    error: "bg-pink-50 border-pink-200 text-pink-700",
    success: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border px-4 py-3 text-sm shadow-sm
      ${styles[type]}
      ${center ? "justify-center text-center" : ""}`}
    >

      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span className="font-medium">
        {message}
      </span>

    </div>
  );
}

export default Alert;