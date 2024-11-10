import axios from "axios";
import secrets from "../constants/secrets.const";
import { errorHandler } from "./error";

export async function uploadFile(file: File): Promise<string> {
  try {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "agricme");

    const response = await axios.post<{ secure_url: string }>(
      `https://api.cloudinary.com/v1_1/${secrets.cloudinary.cloudName}/upload`,
      form
    );

    return response?.data?.secure_url;
  } catch (error: any) {
    return errorHandler(error);
  }
}
export async function uploadFiles(files: FileList) {
  const form = new FormData();
  Array.from(files).forEach((file) => {
    form.append("file", file);
    form.append("upload_preset", "agricme");
  });

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${secrets.cloudinary.cloudName}/upload`,
      form
    );

    return response?.data?.secure_url;
  } catch (error: any) {
    return errorHandler(error);
  }
}

export const convertUrl = async (url: string) => {
  const file: File = await fetch(url).then(async (response) => {
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    return new File([blob], "questionImg", { type: contentType! });
  });
  return file;
};
