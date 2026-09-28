// Scrolling marquee band used between sections. Two identical halves slide
// by -50% so the loop is seamless; each half repeats the text enough times
// to overflow a wide screen.
const REPEAT = 14;

const Ticker = ({ text, tone = "accent", reverse = false }) => {
  const half = (
    <span className="ed-ticker-half">
      {Array.from({ length: REPEAT }, (_, i) => (
        <span key={i}>— {text}&nbsp;</span>
      ))}
    </span>
  );

  return (
    <div className={`ed-ticker ed-ticker-${tone} ${reverse ? "ed-ticker-reverse" : ""}`} aria-hidden="true">
      <div className="ed-ticker-track">
        {half}
        {half}
      </div>
    </div>
  );
};

export default Ticker;
