// // src/components/common/Card.tsx
// import React from "react";

// export interface CardProps {
//   title: string;
//   image?: string;
//   description?: string;
//   price?: number;
// }

// const Card: React.FC<CardProps> = ({ title, image, description, price }) => {
//   return (
//     <div className="bg-white shadow rounded overflow-hidden p-4">
//       {image && (
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-48 object-cover rounded"
//         />
//       )}
//       <div className="mt-4">
//         <h3 className="text-xl font-bold">{title}</h3>
//         {description && (
//           <p className="text-gray-600 mt-2">{description}</p>
//         )}
//         {price !== undefined && (
//           <p className="text-blue-600 font-semibold mt-2">${price}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;



// import React from "react";
// import "./Card.css";

// export interface CardProps {
//   title: string;
//   image?: string;
// }

// const Card: React.FC<CardProps> = ({ title, image }) => {
//   return (
//     <div className="card border-gray-100 dark:border-gray-800 sm:p-6">
//       {image && (
//         <div className="card-image">
//           <img src={image} alt={title} />
//         </div>
//       )}
//       <div className="card-content">
//         <h3 className="text-xl font-bold">{title}</h3>
//       </div>
//     </div>
//   );
// };

// export default Card;




import React from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";

export interface HeroCardProps {
  title: string;
  image?: string;
  price?: number | string;
}

const HeroCard: React.FC<HeroCardProps> = ({ title, image, price }) => {
  return (
    <Card
      isPressable
      shadow="sm"
      onPress={() => console.log("Card pressed:", title)}
      className="border-gray-100 dark:border-gray-800 sm:p-6"
    >
      <CardBody className="overflow-visible p-0">
        {image && (
          <Image
            alt={title}
            src={image}
            className="w-full object-cover h-[140px]"
            radius="lg"
            shadow="sm"
            width="100%"
          />
        )}
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>{title}</b>
        {price && <p className="text-default-500">{price}</p>}
      </CardFooter>
    </Card>
  );
};

export default HeroCard;
