import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import HomeImage from '../assets/home2.jpg'
import './Home.scss'
import HomeBtn from "@/components/HomeBtn/HomeBtn";

class Home extends Component {
  render () {
    console.log(this.props);
    let btns=this.btns;
    let btnsHtml=[];
    let btnsHtmlCell=[];
    btns.map((cur,index,arr)=>{
      btnsHtmlCell=[];
      cur.map((subCur,index,arr)=>{
        btnsHtmlCell.push(
          <HomeBtn key={index} cellData={subCur}/>
        );
      })
      btnsHtml.push(btnsHtmlCell);
    });
    let children =this.props.children;
    return children ? (<div>{children}</div>):(
        <div className="wm-home">
          <div className="homeLine">
            {btnsHtml[0]}
          </div>
          <div className="homeLine">
            {btnsHtml[1]}
          </div>
          <div className="homeLine">
            {btnsHtml[2]}
          </div>
        </div>
    )
  }
}
Home.prototype.btns=[
  [{
    path:"/home/approveList",
    img:HomeImage,
    name:"审批中"
  },{
    path:"/home/notPaid",
    img:HomeImage,
    name:"未发放"
  },{
    path:"/home/history",
    img:HomeImage,
    name:"发放历史"
  }],[{
    path:"/home/undo",
    img:HomeImage,
    name:"已撤销"
  },{
    path:"/home/reject",
    img:HomeImage,
    name:"已拒绝"
  },{
    path:"/home/draft",
    img:HomeImage,
    name:"草稿"
  }],[{
    type:2,
    img:HomeImage,
    name:"开票资料"
  },{

  },{

  }]
];
Home.propTypes = {
}

export default Home
