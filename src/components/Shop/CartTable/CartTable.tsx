import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import { Box } from '@mui/material';
import styles from './styles.module.scss';
import { Counter } from '@/components/Buttons';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
)
{
    return { name, calories, fat, carbs };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

export const CartTable = ({ products }) =>
{
    return (
        <TableContainer component={Paper} sx={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={`${styles.CartTable__cell} ${styles.CartTable__cell_head}`}>Product</TableCell>
                        <TableCell className={`${styles.CartTable__cell} ${styles.CartTable__cell_head}`}> Price</TableCell>
                        <TableCell className={`${styles.CartTable__cell} ${styles.CartTable__cell_head}`}>Amount</TableCell>
                        <TableCell className={`${styles.CartTable__cell} ${styles.CartTable__cell_head}`}>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) =>
                    {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className={styles.CartTable__cell}>
                                    <div className={styles.cartItem}>
                                        <div>
                                            <button className='btn'>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 1L1 13M1 1L13 13" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div>
                                            <Image
                                                src={product.image.src}
                                                width={75}
                                                height={75}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className={`${styles.cartItem__title}`}>
                                            <h3 className='desc'>
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row" className={styles.CartTable__cell}>
                                    {product.price}
                                </TableCell>
                                <TableCell component="th" scope="row" className={styles.CartTable__cell}>
                                    <Counter onClickHandler={() => 'yes'} count={product.quantity} />
                                </TableCell>
                                <TableCell component="th" scope="row" className={styles.CartTable__cell}>
                                    {product.price * product.quantity}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
