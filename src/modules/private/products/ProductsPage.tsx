"use client";

import React from "react";
import { AdminPageLayout } from "../layouts/admin-page-layout";
import { IProductDTO } from "@/shared/interfaces/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";

const product: IProductDTO = {
  productId: "424",
  name: "Fertilizante Universal 5kg",
  category: {
    name: "Fertilizantes y Abonos",
    categoryId: "fsafs",
  },
  categoryId: "1",
  description:
    "Fertilizante completo para todo tipo de plantas, con nutrientes balanceados",
  imgUrl: "/images/products/product-2.jpg",
  slug: "fertilizante-universal-5kg",
  features: [
    {
      id: "1",
      text: "Aporta macro y micronutrientes",
    },
    {
      id: "2",
      text: "Ideal para todo tipo de cultivos",
    },
    {
      id: "3",
      text: "Formato práctico de 5kg",
    },
  ],
  active: true,
};

export const ProductsPage = () => {
  return (
    <AdminPageLayout title="Productos">
      <div className="w-full">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>description</TableHead>
                <TableHead>category</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[product, product, product].map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex justify-center items-center">
                      <div className="space-x-3">
                        <Image
                          src={product.imgUrl ?? ""}
                          width={100}
                          height={100}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>activo</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SlOptionsVertical />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="shadow text-zinc-600 bg-white boder-2 border-zinc-600 w-[100px]"
                          >
                            <DropdownMenuItem className="p-2 hover:bg-zinc-50">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 p-2 hover:bg-zinc-50">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminPageLayout>
  );
};
