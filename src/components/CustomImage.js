import Image from 'next/image';

const CustomImage = ({ src, alt, width, height, priority = false, ...props }) => {
  const basePath = process.env.BASE_PATH;
  const imageSrc = `${basePath}${src}`;

  return <Image src={imageSrc} alt={alt} width={width} height={height} priority={priority} {...props} />;
};

export default CustomImage;