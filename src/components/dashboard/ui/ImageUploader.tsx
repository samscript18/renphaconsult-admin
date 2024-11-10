import Image from 'next/image';
import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';

interface Props extends React.HTMLAttributes<HTMLElement> {
  file: File | undefined;
  setFile(e: React.ChangeEvent<HTMLInputElement>): void;
  removeFile?(): void;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export default function ImageUploader({ file, setFile, removeFile, labelProps, ...props }: Props) {
  return (
    <div {...props} className={`relative max-w-fit ${props.className}`}>
      <label
        {...labelProps}
        htmlFor={labelProps?.htmlFor || 'file-uploader'}
        className="w-[200px] h-[200px] border-2 hover:border-primary rounded-full flex items-center justify-center"
      >
        {file ? (
          <div className="w-full h-full relative">
            <Image
              src={URL.createObjectURL(file)}
              width={1000}
              height={1000}
              className="w-full h-full object-center object-cover rounded-full"
              alt="question-image"
            />
          </div>
        ) : (
          <div className="text-primary bg-[#e7e7e7] w-full h-full flex items-center justify-center rounded-full">
            <FaCamera />
          </div>
        )}
      </label>

      {file && (
        <div
          className="absolute bottom-[20px] right-[10px] z-[5] bg-white cursor-pointer shadow-md rounded-full w-[30px] h-[30px] flex items-center justify-center"
          onClick={removeFile}
        >
          <FaTrash />
        </div>
      )}
      <input onChange={setFile} type="file" id={labelProps?.htmlFor || 'file-uploader'} className="hidden" />
    </div>
  );
}
