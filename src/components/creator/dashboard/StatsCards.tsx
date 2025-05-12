
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Wallet } from "lucide-react";

interface StatsCardsProps {
  totalSales: number;
  activeProducts: number;
  pendingCommissions: number;
}

export const StatsCards = ({ totalSales, activeProducts, pendingCommissions }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <Card className="border-l-4 border-l-primary shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2 bg-primary/5">
          <CardTitle className="text-sm font-medium text-primary">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">€ {totalSales.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">+12% since last month</p>
        </CardFooter>
      </Card>
      
      <Card className="border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2 bg-secondary/5">
          <CardTitle className="text-sm font-medium text-secondary">Active Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-secondary">
              {activeProducts}
            </div>
            <Package className="h-8 w-8 text-secondary" />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">+3 in the last 30 days</p>
        </CardFooter>
      </Card>
      
      <Card className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2 bg-green-500/5">
          <CardTitle className="text-sm font-medium text-green-600">Pending Commissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-green-600">
              € {pendingCommissions.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </div>
            <Wallet className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <p className="text-xs text-muted-foreground">Payment in 15 days</p>
        </CardFooter>
      </Card>
    </div>
  );
};
