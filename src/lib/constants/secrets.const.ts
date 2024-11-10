const secrets = {
  apiUrl: <string>process.env.NEXT_PUBLIC_API_URL,
  cloudinary: {
    cloudName: <string>process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
};

export default secrets;
