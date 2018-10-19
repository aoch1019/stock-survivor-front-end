import React from 'react';
import PoolTableRow from './PoolTableRow'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react';

const PoolTable = (props) => {
    return(
      <Table size='large' celled padded striped textAlign='center'>
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

          {!!props.aliveEntries && props.aliveEntries.map((entry, idx) => {
            if(!!entry.alive){
              return < PoolTableRow key={idx} entry={entry} />
            }
            else{
              debugger
              return null
            }
          })}
        </Table.Body>
      </Table>
    )

} /* End of class */

function mapStateToProps(state){
  return {
    aliveEntries: state.aliveEntries
  }
}

export default connect(mapStateToProps)(PoolTable)
