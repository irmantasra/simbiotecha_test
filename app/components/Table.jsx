import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter'
import _ from 'lodash';
import { get } from '../utils/api';

export default class Table extends Component {

	constructor(props) {
		super(props);

		this.state = {
			ships: null,
			error: '',
			page: 1,
			count: 0
		}

		this.renderPaging = this.renderPaging.bind(this)
	}

	componentDidMount() {
		this.fetchData(1);
	}

	fetchData(page) {
		get(`https://swapi.co/api/starships/?page=${page}`)
		.then( response => {
			this.setState({
				ships: response.data.results,
				count: response.data.count
			});
		})
		.catch( err => {
			this.setState({
				error: err
			});
		});
	}

	renderPaging() {
		const pagesCount = Math.floor(this.state.count/10) + 1;
		const renderNumbers = [];
		for(let i = 1; i <= pagesCount; i++) {
			renderNumbers.push(<a key={i} onClick={() => this.setPage(i)}>{i}</a>);
		}
		return renderNumbers
	}

	renderTableHeader() {
		if(this.state.ships !== null)
			return	_.keys(this.state.ships[0]).map(key => {
				return {
					Header: key,
					accessor: key,
					filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: [key] }),
          filterAll: true
				}
			});
	}

	setPage(page) {
		this.setState({
			page
		});
		this.fetchData(page);
	}

	render() {
		return (
			<div>
				{
					this.state.ships === null ?
						<div>
							{this.state.error === '' ? <h2>Loading...</h2> : <h2 style={{color: 'red'}}>{this.state.error.message}</h2>}
						</div>
						:	<div>
							<ReactTable
								data={this.state.ships}
								filterable
								defaultFilterMethod={(filter, row) =>
									String(row[filter.id]) === filter.value}
								columns={[
									{
										Header: "Ships",
										columns: this.renderTableHeader()
									}
								]}
								defaultPageSize={10}
								className="-striped -highlight"
								showPagination={false}
							/>
							<h4>Page: {this.state.page}</h4>
							{this.renderPaging()}
						</div>
				}
			</div>
		);
	}
}