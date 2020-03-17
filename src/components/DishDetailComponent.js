import React from 'react';
import { Card, CardImg, CardImgOverlay,
     CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderDish({dish}){
    if(dish != null)
    {
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} /> 
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>  
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        ); 
  
    }
    else{
        return (
            <div></div>
        );
    }
}

function RenderComments({comments}) {
    if(comments != null){
    const commentslis = comments.map((commentblock)=>{
        return  (
            <div key={commentblock.id} >          
                    <p>{commentblock.comment}</p>
                    <p>-- {commentblock.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(commentblock.date)))} </p>
            </div>
        );
    });
    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                { commentslis }
            </ul>
        </div> 
    );
    }
    else{
        return (
            <div></div>
        );
    }
}

  
 const  DishDetail = (props) => {
        if(props.dish != null){
        return (
            <div className="container">
                 <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>              
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
<               div className="row">
                        <div className = "col-md-5 m-1 col-12">
                            <RenderDish dish = {props.dish} />
                        </div>
                        <div className = "col-md-5 m-1 col-12">
                            <RenderComments comments = {props.comments} />
                        </div>
                 </div>
        </div>    
        );
        }
        else{
            return (
                <div></div>
            );
        }
    }

export default DishDetail;
