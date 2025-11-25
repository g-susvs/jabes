interface IProps {
  children: React.ReactNode;
}
export const TableCell = ({ children }: IProps) => {
  return (
    <td className="py-4 text-primary-800 font-medium text-xs text-center whitespace-nowrap min-w-[140px] max-w-[200px] truncate">
      {children}
    </td>
  )
}

