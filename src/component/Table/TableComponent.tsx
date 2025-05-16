import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {  type PatientSampleActionsInterface, type TableHeadersInterface } from '../../interfaces/CommonInterface';

interface DynamicTableProps<T> {
  headers: TableHeadersInterface[];
  data: T[];
}

const DynamicTable = <T,>({ headers, data }: DynamicTableProps<T>) => {
  return (
    <TableContainer component={Paper} >
      <Table style={{
      overflowX: 'auto',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell style={{
                backgroundColor: "#c4c4c4"
              }} key={index} ><span className='text-[16px] font-[800]'>{header?.label}</span></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: T, index) => (
            <TableRow key={index}>
              {headers.map((header: TableHeadersInterface, index) => {
                if (header?.key === 'actions') {
                  return (
                    <TableCell key={index}>
                      {(row as { [key: string]: [] })[header?.key]?.map(
                        (action: PatientSampleActionsInterface) => {
                          return (
                            <Button
                              sx={{
                                display: action.disabled ? 'none' : 'flex',
                                backgroundColor:
                                  action?.label === 'Samples' ? 'green' : 'red',
                                color: 'white',
                                marginRight: '5px',
                              }}
                              onClick={() => action?.function(row)}
                              disabled={action.disabled}
                            >
                              {action?.label}
                            </Button>
                          );
                        }
                      )}
                      {/* {(row as { [key: string]: string })['status'] ===
                      'available' ? (
                        <Button
                          sx={{
                            backgroundColor: 'green',
                            color: 'white',
                          }}
                          onClick={() => {
                            borrowFunction(row);
                          }}
                        >
                          Borrow
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            backgroundColor: 'red',
                            color: 'white',
                          }}
                          onClick={() => {
                            returnFunction(row);
                          }}
                        >
                          Return
                        </Button>
                      )} */}
                    </TableCell>
                  );
                }
                if(header?.key === 'currentProcessId'){
                  return(
                    <TableCell key={index}>
                    {typeof row === 'object' &&
                    row !== null &&
                    header?.key in row && (row as { [key: string]: string })[header?.key] !== ""
                      ? (row as { [key: string]: string })[header?.key]
                      : "Not Assigned"}
                  </TableCell>
                  )
                }
                return (
                  <TableCell key={index}>
                    {typeof row === 'object' &&
                    row !== null &&
                    header?.key in row
                      ? (row as { [key: string]: string })[header?.key]
                      : null}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
