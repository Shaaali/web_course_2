import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


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
                    <p>-- {commentblock.author}, {commentblock.date}</p>
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

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {          
        }
    }
    render() {
        if(this.props.dish != null){
        return (
            <div className="row">
                    <div className = "col-md-5 m-1 col-12">
                        <RenderDish dish = {this.props.dish} />
                    </div>
                    <div className = "col-md-5 m-1 col-12">
                        <RenderComments comments = {this.props.dish.comments} />
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
}

export default DishDetail;
