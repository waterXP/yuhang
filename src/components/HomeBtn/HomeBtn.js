import React,{Component} from "react";
import {Link} from "react-router";
import './HomeBtn.scss'

class HomeBtn extends Component{
  render(){
    let cellData=this.props.cellData;
    return (
      <Link to={cellData.path} className="homeBtnCell">
        <div className='wm-home-btn'>
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

