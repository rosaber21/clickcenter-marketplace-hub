
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart as CustomLineChart, BarChart } from "@/components/charts/CustomCharts";

interface OverviewTabProps {
  monthlySalesData: number[];
  monthlySalesLabels: string[];
  productSalesData: number[];
  productSalesLabels: string[];
}

export const OverviewTab = ({ 
  monthlySalesData, 
  monthlySalesLabels, 
  productSalesData, 
  productSalesLabels 
}: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <CardTitle>Monthly Sales</CardTitle>
          <CardDescription>Last 7 months performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <CustomLineChart 
            data={monthlySalesData}
            labels={monthlySalesLabels}
            title="Sales"
          />
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader className="bg-secondary/5">
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Sales by product</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <BarChart
            data={productSalesData}
            labels={productSalesLabels}
            title="Products"
          />
        </CardContent>
      </Card>
    </div>
  );
};
