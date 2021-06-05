import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'avatarUrl', label: 'avatar', minWidth: 5 , format:(value)=><Avatar alt="avatar" src={value} />},
  { id: 'firstname', label: 'Customer Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  {
      id: 'hasPremium',
      label: 'Premium',
      minWidth: 100,
    
      
    },
  { id: 'bid', label: 'Bid', minWidth: 100, isButton: true },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    marginTop:'65px',
    width: '80vw',
    margin: 'auto'
  },
  container: {
    maxHeight: 440,
  },

  onHover:{
    cursor: 'pointer',
  }  

});




export default function StickyHeadTable(props) {

  const history= useHistory();
  let [rows,setRows]= useState([]);
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);

  };
  useEffect(()=>{
    console.log(props.customers);
    console.log(rows);
    setRows([...props.customers]);
  },[props.customers])


  //let rows=props.customers;
  const classes = useStyles();  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleToogle=(id)=>{
    console.log(rows);
    console.log(id)
    let rowId=rows.find(el=>el.id==id);
    rowId.bid=rowId.bid===rowId.maximum? rowId.minimum: rowId.maximum;
    setRows([...rows]);
    
  }

  const handleDetailView=(id)=>{
    console.log('handled view',id);
    let rowId=rows.find(el=>el.id==id);
    history.push({
      pathname:'/customerDetails',
      state: {detail: rowId}
    })
  }

  const handleSorting=()=>{
      rows.sort((a,b)=>a.bid-b.bid);
      setRows([...rows]);
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {!column.isButton ?column.label :<button onClick={()=>handleSorting()}>{column.label}</button>}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              console.log(row.id);
              return (
                
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} className={classes.onHover} >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} onClick={()=>handleDetailView(row.id)}>
                        {column.format  ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                   
                    <ToggleButtonGroup
                        exclusive
 aria-label="text alignment">

<button  onClick={()=>handleToogle(row.id)}>{row.bid===row.maximum? 'minimum bid':'maximum bid'}</button>
                                      </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 13]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
  
    </Paper>
  );
}
