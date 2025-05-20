"use client";

import React from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background: ${(props) => props.theme.palette.common.black};
    color: ${(props) => props.theme.palette.common.white};
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
  }
`;

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

function CustomSimpleTable({ title, description, headersArray, rows }) {
  const keys =
    Array.isArray(rows) && rows.length > 0 ? Object.keys(rows[0]) : []; // This an array like this ["facility_name","date","hours_worked"]

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
      </CardContent>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {Array.isArray(headersArray) &&
                headersArray.map((header, index) => (
                  <TableCell key={index} align={index === 0 ? "left" : "right"}>
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row[keys[0]]}
                  </TableCell>
                  <TableCell align="right">{row[keys[1]]}</TableCell>
                  <TableCell align="right">{row[keys[2]]}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

export default CustomSimpleTable;
