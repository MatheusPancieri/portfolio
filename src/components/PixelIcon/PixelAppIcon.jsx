import PixelIcon from "./PixelIcon.jsx";

// App icon drawn from a pixelArt.js grid, same interface as IconImg.
const PixelAppIcon = (art) => {
  const Icon = ({ className }) => <PixelIcon art={art} className={className} />;
  return Icon;
};

export default PixelAppIcon;
