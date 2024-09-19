export const getImagePath = (car, image) => {
  // Check if the image is a Cloudinary URL
  if (image.startsWith('http://') || image.startsWith('https://')) {
    // If it's a Cloudinary URL, add transformation parameters
    const cloudinaryBaseUrl = 'https://res.cloudinary.com/dcscmcd7q/image/upload/';
    if (image.includes(cloudinaryBaseUrl)) {
      return image.replace(cloudinaryBaseUrl, `${cloudinaryBaseUrl}c_fill,h_250,w_400/`);
    }
    return image;
  }

  // If not, it's a local image path
  const make = car.make.toLowerCase();
  let model = car.model.toLowerCase().replace(/\s+/g, "-");
  
  // Special case for Mazda MX-5 Miata
  if (make === "mazda" && model.includes("mx-5")) {
    model = "mx5-miata";
  }
  
  const folderName = `${make}-${model}`;
  return `/images/${folderName}/${image}`;
};