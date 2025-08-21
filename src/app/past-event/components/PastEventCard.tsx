import Image from "next/image";

interface TitleAndDescriptionProps {
  title: string;
  description: string;
  date?:string;
  location?: string;
  cardNewsImageUrls?: string[];
  onClick?: () => void;
}

const PastEventCard: React.FC<TitleAndDescriptionProps> = ({
  title,
  description,
  date,
  location,
  cardNewsImageUrls,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-[#EFF7FF] text-black rounded-2xl px-4 py-3 my-2 md:px-6 md:py-4 min-h-[6rem] flex flex-col justify-center"
    >
      {cardNewsImageUrls ? (
        <>
          <h3 className="text-xl md:text-2xl font-extrabold mb-1">| {title}</h3>
          <div className="text-base font-medium leading-relaxed">{date}</div>
          <div className="text-base font-medium leading-relaxed">{location}</div>
          <div className="flex flex-row gap-2">
            <div className="w-1/2">
              {cardNewsImageUrls.map((imageUrl, index) => (
                <Image
                  key={index} 
                  src={imageUrl}
                  alt={`카드 뉴스 ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              ))} 
            </div>
            <div className="w-1/2 text-base font-medium leading-relaxed flex-wrap">{description}</div>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl md:text-2xl font-extrabold mb-1">| {title}</h3>
          <div className="text-base font-medium leading-relaxed">{description}</div>
        </>
      )} 
    </div>
  );
};
export default PastEventCard;
