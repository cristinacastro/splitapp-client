import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

import "./EachGroup.css";


const EachGroup = ({ groups }) => {
    console.log(groups ,"grups")
  return (
    <div className="group-list-item">
    
      <Link to={{pathname:`/groups/${groups._id}`, state: {groupsList: groups}}}>
        <div className="group-list-image">
          <div >
            <img src={groups.image} alt="group pic" width="100" />
          </div>
          <div className="group-list-text">
            <h6>{groups.name}</h6>
            {groups.members.map((eachMember) => {
              return (
              <span key={eachMember._id} >{eachMember.username},  </span>
              )
            })}
            <br></br>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withAuth(EachGroup);
