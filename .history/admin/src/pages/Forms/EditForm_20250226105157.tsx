// src/pages/edit_form.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import InputGroup from "../../components/form/form-elements/InputGroup";
import InputStates from "../../components/form/form-elements/InputStates";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";





export default function EditForm() {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [product_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement update logic here
    console.log("Save product", product);
    // หลังจากบันทึกอาจ navigate กลับไปยังหน้ารายการหรือแจ้งเตือนความสำเร็จ
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <PageMeta title="Edit Product" description="แก้ไขรายละเอียดสินค้า" />
      <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            defaultValue={product.product_name}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* เพิ่ม field อื่นๆ ที่ต้องการแก้ไข เช่น category, series, detail, ฯลฯ */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Detail:</label>
          <textarea
            defaultValue={product.detail || ""}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <DefaultInputs />
        <InputGroup />
        <InputStates />
        <TextAreaInput />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
