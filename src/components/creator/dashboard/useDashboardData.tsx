
import { useState } from "react";

export const useDashboardData = () => {
  const [totalSales, setTotalSales] = useState(7829.45);
  const [activeProducts, setActiveProducts] = useState(12);
  const [pendingCommissions, setPendingCommissions] = useState(1245.50);
  
  const [products, setProducts] = useState([
    {
      name: "Digital Marketing Course",
      creator: "You",
      category: "Marketing",
      price: "€ 149,90",
      status: "Ativo" as const
    },
    {
      name: "Financial Management E-book",
      creator: "You",
      category: "Finance",
      price: "€ 29,90",
      status: "Ativo" as const
    },
    {
      name: "Business Consulting",
      creator: "You",
      category: "Consulting",
      price: "€ 399,00",
      status: "Pendente" as const
    }
  ]);
  
  // Mock data for charts
  const monthlySalesData = [5430, 4290, 6540, 7829, 8210, 7450, 7829];
  const monthlySalesLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  
  const productSalesData = [32, 68, 7, 41, 25];
  const productSalesLabels = ["Marketing Digital", "E-book Finance", "Business Consulting", "Templates", "Course XYZ"];
  
  return {
    totalSales,
    activeProducts,
    pendingCommissions,
    products,
    setProducts,
    monthlySalesData,
    monthlySalesLabels,
    productSalesData,
    productSalesLabels
  };
};
