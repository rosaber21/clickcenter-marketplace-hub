
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  Archive,
  Link as LinkIcon
} from "lucide-react";

// Define the shape of a combo package
interface ComboPackage {
  id: string;
  name: string;
  products: number;
  price: string;
  discount: string;
  sales: number;
  status: string;
}

// Mock data for combo packages
const mockCombos: ComboPackage[] = [
  {
    id: "combo-1",
    name: "Pacote Completo - Marketing Digital",
    products: 3,
    price: "R$ 997,00",
    discount: "30%",
    sales: 154,
    status: "active",
  },
  {
    id: "combo-2",
    name: "Curso de Finanças + Investimentos",
    products: 2,
    price: "R$ 597,00",
    discount: "25%",
    status: "active",
    sales: 89,
  },
  {
    id: "combo-3",
    name: "Programação Frontend Bundle",
    products: 4,
    price: "R$ 1.297,00",
    discount: "40%",
    status: "active",
    sales: 227,
  },
  {
    id: "combo-4",
    name: "Pacote de Produtividade",
    products: 2,
    price: "R$ 397,00",
    discount: "15%",
    status: "inactive",
    sales: 63,
  },
];

// Define columns for the data table
const comboColumns = [
  { key: "name" as const, label: "Nome do Combo" },
  { key: "products" as const, label: "Produtos" },
  { key: "price" as const, label: "Preço" },
  { key: "discount" as const, label: "Desconto" },
  { key: "sales" as const, label: "Vendas" },
  { key: "status" as const, label: "Status" },
];

export default function Combos() {
  const [activeTab, setActiveTab] = useState("all");
  const [combos, setCombos] = useState<ComboPackage[]>(mockCombos);

  // Filter combos based on active tab
  const filteredCombos = combos.filter(combo => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return combo.status === "active";
    if (activeTab === "inactive") return combo.status === "inactive";
    return true;
  });

  const handleCreateCombo = () => {
    console.log("Create new combo");
    // Would open a dialog to create a new combo
  };

  const handleEditCombo = (combo: ComboPackage) => {
    console.log("Edit combo:", combo);
    // Would open a dialog to edit the combo
  };

  const handleDeleteCombo = (combo: ComboPackage) => {
    console.log("Delete combo:", combo);
    // Would show a confirmation dialog
    if (window.confirm(`Tem certeza que deseja excluir o combo "${combo.name}"?`)) {
      setCombos(combos.filter(c => c.id !== combo.id));
    }
  };

  const handleArchiveCombo = (combo: ComboPackage) => {
    console.log("Archive combo:", combo);
    // Toggle the status of the combo
    setCombos(combos.map(c => 
      c.id === combo.id 
        ? { ...c, status: c.status === "active" ? "inactive" : "active" } 
        : c
    ));
  };

  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Combos de Produtos</h1>
            <p className="text-muted-foreground">
              Crie e gerencie pacotes promocionais combinando seus produtos
            </p>
          </div>
          <Button onClick={handleCreateCombo} className="gap-2">
            <Plus size={16} />
            Criar Combo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Package size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Combos</p>
                <h3 className="text-2xl font-bold">{combos.length}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <LinkIcon size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combos Ativos</p>
                <h3 className="text-2xl font-bold">
                  {combos.filter(c => c.status === "active").length}
                </h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Archive size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Combos Inativos</p>
                <h3 className="text-2xl font-bold">
                  {combos.filter(c => c.status === "inactive").length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos os Combos</TabsTrigger>
              <TabsTrigger value="active">Combos Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Combos Inativos</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4">
              <DataTable
                data={filteredCombos}
                columns={comboColumns}
                caption={`${filteredCombos.length} combos encontrados`}
              />
              
              <div className="mt-4 flex flex-wrap gap-2">
                {filteredCombos.map(combo => (
                  <div key={combo.id} className="bg-gray-50 p-3 rounded-lg border flex flex-col gap-2 w-full md:w-[calc(50%-0.5rem)]">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{combo.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {combo.products} produtos • {combo.discount} de desconto
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCombo(combo)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleArchiveCombo(combo)}
                        >
                          <Archive size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCombo(combo)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{combo.price}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        combo.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {combo.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CreatorLayout>
  );
}
