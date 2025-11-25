import { Box } from '../../box/box.component';
import { IEmptyResultsContent } from '../interfaces/content.interface';
import { BoxLoader } from '../../loader/box-loader';
import { FiSearch } from 'react-icons/fi';

interface IProps {
  colSapn: number;
  content?: IEmptyResultsContent;
}

export const EmptyData = ({ colSapn, content }: IProps) => {
  return (
    <tbody >
      <tr>
        <td colSpan={colSapn}>
          <Box className="flex justify-center py-8">
            <Box className="flex flex-col gap-2 items-center text-gray-300">
              <FiSearch size={60} />
              {
                !content ?
                  <BoxLoader />
                  : <>
                    <span className="text-2xl">{content?.title}</span>
                    <span>{content?.description}</span>
                  </>
              }
            </Box>
          </Box>
        </td>
      </tr>
    </tbody >
  )
}
