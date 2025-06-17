import { slugify } from "@/lib/utils";

interface CarWashProviderCardProps {
  carWashProvider: string;
}

const CarWashProviderCard: React.FC<CarWashProviderCardProps> = ({
  carWashProvider
}) => {
  return (
    <div className="w-16 sm:w-24 flex flex-col items-center gap-2 *:w-full p-1! pb-2! rounded-lg bg-amber-100 border border-amber-300 text-[0.6rem] sm:text-xs">
      <img
        className="rounded-md object-contain ring ring-amber-200"
        src={`/providers/${slugify(carWashProvider)}.jpg`}
        alt={`Logo for '${carWashProvider}' Car Wash Provider`}
      />
      <span title="Car Wash" className="inline-block text-center font-medium">
        {carWashProvider}
      </span>
    </div>
  );
};

export default CarWashProviderCard;
