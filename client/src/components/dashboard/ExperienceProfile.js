import React, {Fragment} from 'react'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {DeleteExperience} from '../../action/profile'
 const ExperienceProfile=({experience,DeleteExperience})=> {

const experiencelist=(
experience.map(item=>(
    <tr key={item._id}>
        <td className='hide-sm'>{item.company}</td>
        <td className='hide-sm'>{item.title}</td>
        <td>
<Moment format='YYYY/MM/DD'>{item.from}</Moment>
</td>
<td>
{item.to === null ? ('Now') :
(<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}

        </td>
        <td>
            <button className='btn btn-danger' onClick={e=>DeleteExperience(item._id)}>delete</button>
        </td>
    </tr>
))
)





    return (
        <Fragment>
        <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Date From</th>
                        <th className='hide-sm'>To</th>
                        <th className='hide-sm'>action</th>
                    </tr>
                </thead>
                <tbody>
                {experiencelist} 
                </tbody>
            </table>
        </Fragment>
    )
}
export default connect(null,{DeleteExperience})(ExperienceProfile)