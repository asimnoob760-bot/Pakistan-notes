// API Configuration
// ImgBB API Key for image hosting
// Note: In production, consider using environment variables for sensitive keys

export const IMGBB_API_KEY = "faab013e9d85d75a099ab95e0d5ec384";

export const IMGBB_CONFIG = {
  apiKey: IMGBB_API_KEY,
  uploadUrl: "https://api.imgbb.com/1/upload",
  expiration: 0, // 0 = never expire
};

export default IMGBB_CONFIG;
