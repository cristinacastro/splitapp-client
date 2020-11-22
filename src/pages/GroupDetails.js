import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import EachExpense from "../components/EachExpense";


const GroupDetails = (props) => {

  const group = props.location.state.groupsList
  console.log(group, 'hola')

  return (
    <div>
      <h1>{group.name}</h1>
      <h1>{group.members.length} members</h1>
      <Link to={{ pathname: `/groups/addCost/${group._id}`, state: { groupsList: group } }}> Add cost</Link>
      <div>
        
        {group.costs.map(eachCost => {
          console.log(eachCost, "cada grup")
          return (
            <h1>Hola</h1>
            // <EachExpense key={eachCost._id} groups={eachCost} />
          )
        })}
      </div>

    </div>
  );
};

export default withAuth(GroupDetails);
