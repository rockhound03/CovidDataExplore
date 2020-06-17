import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductRow extends React.Component {
  render() {
    const dateState = this.props.dateState;
    const date = dateState.date;
    const state = dateState.state;
    const cases = dateState.cases;
    const newCases = dateState.new_cases;
    const deaths = dateState.deaths;
    const newDeaths = dateState.new_deaths;

    return (
      <tr>
        <td>{date}</td>
        <td>{state}</td>
        <td>{cases}</td>
        <td>{newCases}</td>
        <td>{deaths}</td>
        <td>{newDeaths}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;

    const rows = [];

    this.props.allStateData.forEach((dateState) => {
      if (dateState.state.indexOf(filterText) === -1) {
        return;
      }

      rows.push(
        <ProductRow
          dateState={dateState}
          key={dateState.row_index}
        />
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>State</th>
            <th>Cases</th>
            <th>New Cases</th>
            <th>Deaths</th>
            <th>New Deaths</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
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
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: ''
    };
    
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }


  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <ProductTable
          allStateData={this.props.allStateData}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

const COVIDDATA = require('./covid_react.json');

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable allStateData={COVIDDATA} />,
  document.getElementById('container')
);
