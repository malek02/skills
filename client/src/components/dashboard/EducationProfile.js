import React, {Fragment} from 'react'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {DeleteEducation} from '../../action/profile'
 const EuducationProfile=({education,DeleteEducation})=> {

const experiencelist=(
education.map(item=>(
    <tr key={item._id}>
        <td className='hide-sm'>{item.school}</td>
        <td className='hide-sm'>{item.dgree}</td>
        <td className='hide-sm'>{item.fieldofstudy}</td>      
        <td>
<Moment forma='YYYY/MM/DD'>{item.from}</Moment>
</td>
<td>
{item.to === null ? ('Now') :
(<Moment format='YYYY/MM/DD'>{item.to}</Moment>)}

        </td>
        <td>
            <button className='btn btn-danger' onClick={e=>DeleteEducation(item._id)}>delete</button>
        </td>
    </tr>
))
)





    return (
        <Fragment>
        <h2 className='my-2'>Eduction Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Fieldofstudy</th>
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
export default connect(null,{DeleteEducation})(EuducationProfile)