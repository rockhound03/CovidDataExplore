import React from 'react';
import {BootstrapTable, 
  TableHeaderColumn} from 'react-bootstrap-table';
import './css/Table.css';
import './react-bootstrap-table/css/react-bootstrap-table.css'
import ReactDOM from 'react-dom';
import './index.css';

const COVIDDATA = require('./covid.json');
//console.log(COVIDDATA)
class CasesRow extends React.Component {
  render() {
    //const filterText = this.props.filterText;
    const casesbin = this.props.cases;

    return (
      <div>
        <BootstrapTable data={casesbin} striped hover>
          <TableHeaderColumn isKey dataField='date'
                              dataAlign='center'
                              headerAlign="center"
                              width="90">Date</TableHeaderColumn>
          <TableHeaderColumn dataField='state'
                              dataAlign='center'
                              headerAlign="center"
                              width="90"
                              tdStyle={
                                 {backgroundColor: 'wheat'}}>State</TableHeaderColumn>
          <TableHeaderColumn dataField='cases'
                              dataAlign='left'
                              headerAlign="center"
                              width="90">Cases</TableHeaderColumn>
          <TableHeaderColumn dataField='new_cases'
                              dataAlign='left'
                              headerAlign="center"
                              width="90">New Cases</TableHeaderColumn>
          <TableHeaderColumn dataField='deaths'
                              dataAlign='left'
                              headerAlign="center"
                              width="90">Deaths</TableHeaderColumn>
          <TableHeaderColumn dataField='new_deaths'
                              dataAlign='left'
                              headerAlign="center"
                              width="90">New Deaths</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

class CaseTable extends React.Component {

  
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  render() {
    return (
      <form>
        <input 
          type="text"
          placeholder="Search State..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange} />
      </form>
    );
  }
}

class FilterStateCaseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText:filterText
    })
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange} />
        <CasesRow 
          cases={this.props.statedata}
          filterText={this.state.filterText} 
        />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <FilterStateCaseTable statedata={COVIDDATA} />,
  document.getElementById('root')
);