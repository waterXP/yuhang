import React,{Component} from "react";
import {Link} from "react-router";

class HomeBtn extends Component{
  render(){
    let cellData=this.props.cellData;
    return (
      <Link to={cellData.path} className="homeBtnCell">
        <div>
          {
            cellData.img?<img
              src={cellData.img}
              alt=""
              className="homeCellImg"
              />
              :null
          }
          <h5>{cellData.name}</h5>
        </div>
      </Link>
    );
  }
};

export default HomeBtn;

