interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const TableBody = ({
  children
}: IProps) => {
  return (
    <tbody className="w-full">
      {children}
    </tbody>
  )
}
