const Toast = ({ message, onDone }) => (
  <div
    onAnimationEnd={onDone}
    className="toast-inout fixed bottom-20 left-1/2 z-[300] px-4 py-2 border-2 border-line rounded-md bg-panel-soft shadow-[4px_4px_0_0_rgba(59,51,37,0.85)] font-anonymous text-sm font-bold text-ink whitespace-nowrap pointer-events-none"
  >
    {message}
  </div>
);

export default Toast;
