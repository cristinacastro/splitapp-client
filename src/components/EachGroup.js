import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

const EachGroup = ({ groups }) => {
    console.log(groups ,"grups")
  return (
    <div>
    
      <Link to={{pathname:`/groups/${groups._id}`, state: {groupsList: groups}}}>
        <div>
        <h4>{groups.name}</h4>
        <img src={groups.image} alt="group pic" width="100" />
        {groups.members.map((eachMember) => {
          return (
              <ul>
           <li key={eachMember._id} >{eachMember.username}</li>;
          </ul>
          )
        })}
        </div>
      </Link>
    </div>
  );
};

export default withAuth(EachGroup);
