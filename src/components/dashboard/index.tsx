import { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  AlertTriangle,
} from "lucide-react";

const CementSupplierDashboard = () => {
  // Market Share by Region Data
  const marketShareData = [
    { region: "North West", Dangote: 86, Lafarge: 7, BuaGroup: 42 },
    { region: "North Central", Dangote: 77, Lafarge: 2, BuaGroup: 33 },
    { region: "South East", Dangote: 54, Lafarge: 77, BuaGroup: 4 },
    { region: "South West", Dangote: 95, Lafarge: 57, BuaGroup: 14 },
    { region: "South South", Dangote: 74, Lafarge: 34, BuaGroup: 16 },
  ];

  // Supplier Distribution Data
  const supplierDistributionData = [
    { name: "Dangote", value: 82 },
    { name: "Lafarge", value: 34 },
    { name: "Bua Group", value: 22 },
    { name: "Unicem", value: 4 },
    { name: "Others", value: 15 },
  ];

  const supplierProblemData = [
    { region: "North West", Dangote: 20, Lafarge: 10, BuaGroup: 5 },
    { region: "North Central", Dangote: 15, Lafarge: 8, BuaGroup: 6 },
    { region: "South East", Dangote: 25, Lafarge: 12, BuaGroup: 7 },
    { region: "South West", Dangote: 18, Lafarge: 9, BuaGroup: 4 },
    { region: "South South", Dangote: 22, Lafarge: 11, BuaGroup: 6 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left mb-4 md:mb-0">
          Cement Supplier Market Analysis
        </h1>

        <div className="block md:hidden w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <span className="mr-2">
                  {activeTab === "overview" && (
                    <BarChartIcon className="inline-block mr-2" size={20} />
                  )}
                  {activeTab === "distribution" && (
                    <PieChartIcon className="inline-block mr-2" size={20} />
                  )}
                  {activeTab === "problems" && (
                    <AlertTriangle className="inline-block mr-2" size={20} />
                  )}
                  {activeTab === "overview" && "Market Overview"}
                  {activeTab === "distribution" && "Supplier Distribution"}
                  {activeTab === "problems" && "Supplier Problems"}
                </span>
                <ChevronDown className="ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setActiveTab("overview")}>
                <BarChartIcon className="mr-2" size={16} /> Market Overview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("distribution")}>
                <PieChartIcon className="mr-2" size={16} /> Supplier
                Distribution
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("problems")}>
                <AlertTriangle className="mr-2" size={16} /> Supplier Problems
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="hidden md:grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="distribution">Supplier Distribution</TabsTrigger>
          <TabsTrigger value="problems">Supplier Problems</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Market Share by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketShareData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis
                      label={{
                        value: "Market Share (%)",
                        angle: -90,
                        position: "insideLeft",
                        offset: -10,
                      }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: "12px" }}
                      cursor={{ fill: "rgba(0,0,0,0.1)" }}
                    />
                    <Legend />
                    <Bar dataKey="Dangote" fill="#8884d8" />
                    <Bar dataKey="Lafarge" fill="#82ca9d" />
                    <Bar dataKey="BuaGroup" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Supplier Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={supplierDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius="80%"
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {supplierDistributionData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: "12px" }} />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Detailed Supplier Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={marketShareData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis
                    label={{
                      value: "Market Share (%)",
                      angle: -90,
                      position: "insideLeft",
                      offset: -10,
                    }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: "12px" }}
                    cursor={{ fill: "rgba(0,0,0,0.1)" }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                  <Line type="monotone" dataKey="Dangote" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Lafarge" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="BuaGroup" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="problems">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">
                Supplier Problem Rates by Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={supplierProblemData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis
                    label={{
                      value: "Problem Rate (%)",
                      angle: -90,
                      position: "insideLeft",
                      offset: -10,
                    }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: "12px" }}
                    cursor={{ fill: "rgba(0,0,0,0.1)" }}
                  />
                  <Legend />
                  <Bar dataKey="Dangote" fill="#8884d8" />
                  <Bar dataKey="Lafarge" fill="#82ca9d" />
                  <Bar dataKey="BuaGroup" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CementSupplierDashboard;
