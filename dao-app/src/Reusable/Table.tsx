import TableIcons from './TableIcons'
import MaterialTable, { Options } from "material-table"
import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";

// define generic interface for data/column 

interface ITableProps {
    title: JSX.Element,
    columns: {}[],
    data: {}[],
    options?: Options<{}>,
    style?: CSSProperties
  }
 
const MatTable = ({title, columns, data, options, style}: ITableProps) => {

    return (
          <MaterialTable 
            title={title}
            icons={TableIcons} 
            columns={columns} 
            data={data}
            options={options}
            style={style}
            />
      );

}

export default MatTable;