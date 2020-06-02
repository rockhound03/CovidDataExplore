import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component {
  render() {
    const states = this.props.state;
    return (
      <tr>
        <th colSpan="6">
          {states}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const caseStatus = product.cases > 20?
      product.cases :
      <span style={{color: 'red'}}>
        {product.cases}
      </span>;

    return (
      <tr>
        <td>{product.stat}</td>
        <td>{product.date}</td>
        <td>{product.cases}</td>
        <td>{product.new_cases}</td>
        <td>{product.deaths}</td>
        <td>{product.new_deaths}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.state}
            key={product.state} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.state} />
      );
      lastCategory = product.state;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Date</th>
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
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}
class FilterableProductTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

const CITYDATA = [
  {date:'3/1/2020',state:'New York',fips:36,cases:1,deaths:0,new_deaths:0,new_cases:1},
  {date:'3/2/2020',state:'New York',fips:36,cases:1,deaths:0,new_deaths:0,new_cases:0},
  {date:'3/3/2020',state:'New York',fips:36,cases:2,deaths:0,new_deaths:0,new_cases:1},
  {date:'3/4/2020',state:'New York',fips:36,cases:11,deaths:0,new_deaths:0,new_cases:9},
  {date:'3/5/2020',state:'New York',fips:36,cases:22,deaths:0,new_deaths:0,new_cases:11},
  {date:'3/6/2020',state:'New York',fips:36,cases:44,deaths:0,new_deaths:0,new_cases:22},
  {date:'3/7/2020',state:'New York',fips:36,cases:89,deaths:0,new_deaths:0,new_cases:45},
  {date:'3/8/2020',state:'New York',fips:36,cases:106,deaths:0,new_deaths:0,new_cases:17},
  {date:'3/9/2020',state:'New York',fips:36,cases:142,deaths:0,new_deaths:0,new_cases:36},
  {date:'3/10/2020',state:'New York',fips:36,cases:173,deaths:0,new_deaths:0,new_cases:31},
  {date:'3/11/2020',state:'New York',fips:36,cases:217,deaths:0,new_deaths:0,new_cases:44},
  {date:'3/12/2020',state:'New York',fips:36,cases:326,deaths:0,new_deaths:0,new_cases:109},
  {date:'3/13/2020',state:'New York',fips:36,cases:421,deaths:0,new_deaths:0,new_cases:95},
  {date:'3/14/2020',state:'New York',fips:36,cases:610,deaths:2,new_deaths:2,new_cases:189},
  {date:'3/15/2020',state:'New York',fips:36,cases:732,deaths:6,new_deaths:4,new_cases:122},
  {date:'3/16/2020',state:'New York',fips:36,cases:950,deaths:10,new_deaths:4,new_cases:218},
  {date:'3/17/2020',state:'New York',fips:36,cases:1374,deaths:17,new_deaths:7,new_cases:424},
  {date:'3/18/2020',state:'New York',fips:36,cases:2382,deaths:27,new_deaths:10,new_cases:1008},
  {date:'3/19/2020',state:'New York',fips:36,cases:4152,deaths:30,new_deaths:3,new_cases:1770},
  {date:'3/20/2020',state:'New York',fips:36,cases:7102,deaths:57,new_deaths:27,new_cases:2950},
  {date:'3/21/2020',state:'New York',fips:36,cases:10356,deaths:80,new_deaths:23,new_cases:3254},
  {date:'3/22/2020',state:'New York',fips:36,cases:15168,deaths:122,new_deaths:42,new_cases:4812},
  {date:'3/23/2020',state:'New York',fips:36,cases:20875,deaths:159,new_deaths:37,new_cases:5707},
  {date:'3/24/2020',state:'New York',fips:36,cases:25665,deaths:218,new_deaths:59,new_cases:4790},
  {date:'3/25/2020',state:'New York',fips:36,cases:33066,deaths:325,new_deaths:107,new_cases:7401},
  {date:'3/26/2020',state:'New York',fips:36,cases:38987,deaths:432,new_deaths:107,new_cases:5921},
  {date:'3/27/2020',state:'New York',fips:36,cases:44635,deaths:535,new_deaths:103,new_cases:5648},
  {date:'3/28/2020',state:'New York',fips:36,cases:53363,deaths:782,new_deaths:247,new_cases:8728},
  {date:'3/29/2020',state:'New York',fips:36,cases:59568,deaths:965,new_deaths:183,new_cases:6205},
  {date:'3/30/2020',state:'New York',fips:36,cases:67174,deaths:1224,new_deaths:259,new_cases:7606},
  {date:'3/31/2020',state:'New York',fips:36,cases:75832,deaths:1550,new_deaths:326,new_cases:8658},
  {date:'4/1/2020',state:'New York',fips:36,cases:83889,deaths:1941,new_deaths:391,new_cases:8057},
  {date:'4/2/2020',state:'New York',fips:36,cases:92770,deaths:2653,new_deaths:712,new_cases:8881},
  {date:'4/3/2020',state:'New York',fips:36,cases:102870,deaths:2935,new_deaths:282,new_cases:10100},
  {date:'4/4/2020',state:'New York',fips:36,cases:114996,deaths:3568,new_deaths:633,new_cases:12126}
  ];

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// ========================================

ReactDOM.render(
  <FilterableProductTable products={CITYDATA} />,
  document.getElementById('root')
);