interface TitleAndDescriptionProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const PastEventCard: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-[#EFF7FF] text-black rounded-2xl px-4 py-3 my-2 md:px-6 md:py-4 min-h-[6rem] flex flex-col justify-center"
    >
      <h3 className="text-xl md:text-2xl font-extrabold mb-1">| {title}</h3>
      <div className="text-base font-medium leading-relaxed">{description}</div>
    </div>
  );
};
export default PastEventCard;
