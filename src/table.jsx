import React from 'react'
import JsonData from './data.json'
function JsonDataDisplay(){
	const DisplayData=JsonData.map(
		(info)=>{
			return(
				<tr>
					<td>{info.id}</td>
					<td>{info.name}</td>
					<td>{info.city}</td>
				</tr>
			)
		}
	)

	return(
		<div>
			<table className="table table-striped table-hover">
				<thead className='thead-dark'>
					<tr>
                    <th>Sr.NO</th>
					<th>carton ID</th>
					<th>pallet ID</th>
					</tr>
                
				</thead>

				<tbody>
				
					
					{DisplayData}
					
				</tbody>
			</table>
			
		</div>
	)
}

export default JsonDataDisplay;