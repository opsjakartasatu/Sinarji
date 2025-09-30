// import Image from "next/image";

// const CustomImage = ({ src, alt, width, height, priority = false, ...props }) => {
//   const basePath = process.env.BASE_PATH;
//   const imageSrc = `${basePath}${src}`;

//   return <Image src={imageSrc} alt={alt} width={width} height={height} priority={priority} {...props} />;
// };

// export default CustomImage;

// #################################################
// Updated code to use the correct environment variable for Next.js base path
import Image from "next/image";

const CustomImage = ({ src, alt, width, height, priority = false, ...props }) => {
  const basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  const imageSrc = `${basePath}${src}`;

  return <Image src={imageSrc} alt={alt} width={width} height={height} priority={priority} {...props} />;
};

export default CustomImage;
