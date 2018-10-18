import React from 'react';
import PoolTableRow from './PoolTableRow'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react';

const PoolTable = (props) => {

    return(
      <Table celled striped textAlign='center'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Stock</Table.HeaderCell>
            <Table.HeaderCell>Ticker</Table.HeaderCell>
            <Table.HeaderCell>Last Closing Price</Table.HeaderCell>
            <Table.HeaderCell>Current Price</Table.HeaderCell>
            <Table.HeaderCell>% Change</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {!!props.currPoolEntries && props.currPoolEntries.map((entry, idx) => {
            if(!!entry.alive){
              return < PoolTableRow key={idx} entry={entry} />
            }
            else{
              return null
            }
          })}
        </Table.Body>
      </Table>
    )

} /* End of class */

function mapStateToProps(state){
  return {
    currPoolEntries: state.currPoolEntries
  }
}

export default connect(mapStateToProps)(PoolTable)
