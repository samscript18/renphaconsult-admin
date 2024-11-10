import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import Image from "next/image";
import { ButtonOutlined } from "../ui/buttons";
import Link from "next/link";
import img from "../../../public/images/img-1.jpg";
import { formatValue } from "@/lib/utils/format.utils";

const Destination = ({
  _id,
  name,
  description,
  // mainImage,
  budget,
}: IDestination) => {
  return (
    <article className="w-full bg-[#fff] my-[2rem] rounded-md shadow-md">
      <Image
        src={img}
        alt={name}
        className="w-auto h-[250px] object-cover rounded-t-md"
      />
      <footer className="py-[1.5rem] px-[0.6rem]">
        <div className="flex justify-between items-center mb-[1.5rem]">
          <h4 className="mb-0 text-[1rem] font-semibold">{name}</h4>
          <h4 className="mb-0 text-[#fff] text-[.85rem] bg-[#00628f] py-[0.75rem] px-[0.95rem] rounded-md">
            ₦{formatValue(budget.toString())}
          </h4>
        </div>
        <p className="text-[.85rem]">{description}</p>
        <Link href={`/dashboard/destination/${_id}`} className="no-underline">
          <ButtonOutlined className="mt-4 mx-auto w-[100px] no-underline md:w-[200px]">
            View more
          </ButtonOutlined>
        </Link>
      </footer>
    </article>
  );
};
export default Destination;
