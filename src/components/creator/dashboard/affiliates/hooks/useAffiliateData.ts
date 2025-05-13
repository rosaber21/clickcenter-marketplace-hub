
import { useState } from "react";

export const useAffiliateData = () => {
  // Sample data for top affiliates
  const [topAffiliates] = useState([
    {
      name: "João Silva",
      sales: 1240.00,
      commission: 248.00,
      productCount: 5
    },
    {
      name: "Maria Oliveira",
      sales: 950.50,
      commission: 190.10,
      productCount: 3
    },
    {
      name: "Carlos Mendes",
      sales: 780.30,
      commission: 156.06,
      productCount: 2
    }
  ]);

  // Sample metrics data
  const [metricsData] = useState({
    totalAffiliates: 27,
    newAffiliatesThisMonth: 5,
    affiliateSalesAmount: 3465.80,
    totalSalesPercentage: 44,
    commissionsAmount: 692.90,
    commissionsPercentage: 20
  });
  
  return {
    topAffiliates,
    metricsData
  };
};
