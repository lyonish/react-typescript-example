import * as React from "react";

import { AdminTableRow } from "./AdminTableRow";
import { EmployeeType } from "../types";

import styled from "styled-components";
import { ContentWrapper } from "../CommonStyles";

export interface AdminTableProps {
  employees: EmployeeType[];
  refreshTable: () => Promise<void | {}>;
}

export const AdminTable = (props: AdminTableProps) => (
  <ContentWrapper>
    <h3>ADMINS</h3>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADMIN</th>
          <th>OWNER</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {props.employees.map((employee: EmployeeType, idx: number) => {
          return (
            <AdminTableRow
              key={idx}
              employee={employee}
              refreshTable={props.refreshTable}
            />
          );
        })}
      </tbody>
    </Table>
  </ContentWrapper>
);
//////////
// Style
//////////
const Table = styled.table`
  width: 80%;
  margin: 60px 10%;
  text-align: center;
`;
