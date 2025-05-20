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

const Paper = styled(MuiPaper)(spacing);

function formatDate(value) {
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleDateString("en-US");
}

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
                  <TableCell
                    key={index}
                    align={index === 0 ? "left" : "right"}
                    sx={{ pr: 20 }}
                  >
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {keys.map((key, colIndex) => (
                    <TableCell
                      key={`${rowIndex}-${key}`}
                      align={colIndex === 0 ? "left" : "right"}
                      sx={{ pr: 20 }}
                    >
                      {key.toLowerCase().includes("date")
                        ? formatDate(row[key])
                        : row[key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </Card>
  );
}

export default CustomSimpleTable;
