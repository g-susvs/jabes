import { clsx } from "@/libs/clsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/table/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SlOptionsVertical } from "react-icons/sl";

const category = {
  categoryId: "5ac3183b-2575-441d-b72e-f0806e7dafba",
  name: "Fertilizantes y Abonos",
  active: true,
};

interface IProps{
    className?: string
}

export const CategoriesTable = ({className}: IProps) => {
  return (
       <div className={clsx("w-full", className)}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre de la categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[category, category, category].map((category, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{category.name}</TableCell>
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
  )
}
