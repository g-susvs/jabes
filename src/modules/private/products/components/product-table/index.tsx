import { useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table/table";
import { IProductDTO } from "@/shared/interfaces/product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DeleteProductModal } from "../delete-product-modal";
import { EditProductModal } from "../edit-product-modal";

interface IProps {
  products: IProductDTO[];
}

export const ProductTable = ({ products }: IProps) => {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<IProductDTO | null>(
    null
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onOpenDeleteModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const onOpenEditModal = (productId: string) => {
    setIsEditModalOpen(true);
    setSelectedProductId(productId);
    const product = products.find((product) => product.productId === productId);
    setSelectedProduct(product || null);
  };

  return (
    <>
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
              {products.map((product, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="flex justify-center items-center">
                      <div className="space-x-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
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
                            <DropdownMenuItem
                              onClick={() => onOpenEditModal(product.productId)}
                              className="p-2 hover:bg-zinc-50 cursor-pointer"
                            >
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                onOpenDeleteModal(product.productId)
                              }
                              className="text-red-600 p-2 hover:bg-zinc-50 cursor-pointer"
                            >
                              Eliminar
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
      <DeleteProductModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        productId={selectedProductId}
      />
      <EditProductModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        product={selectedProduct}
      />
    </>
  );
};
