// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
// import PageMeta from "../../components/common/PageMeta";
// import PageMeta from "../../components/common/Card";

// export default function Home() {
//   return (
//     <>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12">

//         </div>
//       </div>
//     </>
//   );
// }


// // src/pages/Home.tsx
// import PageMeta from "../../components/common/PageMeta";
// import Card from "../../components/common/Card";

// export default function Home() {
//   return (
//     <>
//       <PageMeta title="Step Solution" description="" />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         {/* ตัวอย่างการใช้ Card ใน grid */}
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 1"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 1"
//             price={10.99}
//           />
//         </div>
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 2"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 2"
//             price={12.99}
//           />
//         </div>
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 3"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 3"
//             price={8.99}
//           />
//         </div>
//       </div>
//     </>
//   );
// }




// src/pages/Home.tsx
import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import Card from "../../components/common/Card";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // ดึงข้อมูลสินค้าจาก API
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Error fetching products:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <>
      <PageMeta title="Step Solution" description="" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="col-span-12 md:col-span-4">
            <Card
              title={product.name}
              // กำหนด URL สำหรับรูปภาพ หากมี
              image={product.image_path ? `http://localhost:3000/products/${product.image_path}` : undefined}
            />
          </div>
        ))}
      </div>
    </>
  );
}
