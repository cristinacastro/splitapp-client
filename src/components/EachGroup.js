import React from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

import "./EachGroup.css";


const EachGroup = ({ groups }) => {
  return (
    <div className="group-list-item">
    
      <Link to={{pathname:`/groups/${groups._id}`, state: {groupsList: groups}}} className="w100">
        <div className="group-list-image w100">
          <div  className="group-icon-name w100">
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
          <div className="view-group">
            <p>VIEW GROUP</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default withAuth(EachGroup);
