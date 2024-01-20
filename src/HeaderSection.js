import React from 'react'
import { connect } from 'react-redux';
import { updateHeader } from './actions/formActions';

function HeaderSection({header,updateHeader}) {
  const handleHeaderChange=(e)=>{
    const {name,value}=e.target;
    updateHeader({...header,[name]:value});
  }
  return (
    <div>
      <input
      type='text'
      name='fieldnName'
      value={header.fieldName||""}
      onChange={handleHeaderChange}
       />
    </div>
  )
}

const maoStateToProps=(state)=>({
  header:state.form.header,
});
const mapDispatchToProps={
  updateHeader,
}

export default connect(maoStateToProps,mapDispatchToProps)(HeaderSection);
