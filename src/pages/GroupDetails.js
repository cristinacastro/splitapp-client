import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

const GroupDetails = (props) => {
 
  const group = props.location.state.groupsList

  return (
    <div>   
     <h1>{group.name}</h1>
     <h1>{group.members.length} members</h1>
     <Link to={{pathname:`/groups/addCost/${group._id}`, state:{groupsList:group}}}> Add cost</Link> 

    </div> 
  );
};

export default withAuth(GroupDetails);
