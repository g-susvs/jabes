interface IProps {
  children: React.ReactNode;
}

export const TableRow = ({ children }: IProps) => {
  return (
    <tr
      className="border-b-[1.5px] border-erieBlack-500 text-culture-700"
    >
      {children}
    </tr>
  )
}
