const IconImg = (src, alt = "") => {
  const Icon = ({ className }) => (
    <img src={src} alt={alt} className={`${className} object-contain`} draggable={false} />
  );
  return Icon;
};

export default IconImg;
