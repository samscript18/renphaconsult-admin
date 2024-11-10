import { ButtonHTMLAttributes } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export function ButtonContained({
  children,
  loading,
  loadingText,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`min-w-[120px] disabled:opacity-[.9] disabled:text-[#222] disabled:bg-[#e2e2e2] disabled:font-bold disabled:border-[#e2e2e2] disabled:cursor-not-allowed px-2 py-3 rounded-md text-[.75rem] bg-[#00628f] text-white cursor-pointer border-[1.5px] border-[#00628f] flex items-center justify-center gap-4 ${props.className}`}
    >
      {loading ? (
        <>
          <span className="align-middle inline-block mr-2">
            <BiLoaderAlt className="animate-spin" size={19} />
          </span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function ButtonOutlined({ children, loading, ...props }: Props) {
  return (
    <button
      {...props}
      className={`min-w-[120px] disabled:opacity-[.9] disabled:cursor-not-allowed transition duration-300 px-2 py-3 rounded-md text-[.75rem] border-[#00628f] text-[#00628f] !cursor-pointer border-[1.5px] flex items-center justify-center gap-4  ${props.className}`}
    >
      {loading ? (
        <>
          <BiLoaderAlt className="animate-spin" size={19} />
        </>
      ) : (
        children
      )}
    </button>
  );
}
