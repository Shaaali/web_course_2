import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay,
     CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody, Label, Row , Col } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form' ;
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) =>!(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{

    constructor(props) {
        super(props);
        this.state= {
            isModalOpen: false
        }; 
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogin = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }
    handleLogin(event){
        this.toggleModal();
        alert(" username: " + this.username.value + " Password: "+this.password.value
        +" Remember: " +this.remember.checked);
        event.preventDefault();
    }
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.name, values.comment)
}
    render(){
        return (
            <div>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody >
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row>
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                            </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Control.select model=".rating" name="rating"
                                     className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                                <Label htmlFor="name">Your Name</Label>
                            </Col>
                            </Row>
                            <Row>
                            <Col>
                                <Control.text model=".name" id="name" name="name" 
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength:maxLength(15)
                                        }}
                                        />
                                        <Errors 
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{ 
                                            minLength: 'must be greater than 2 characters ',
                                            maxLength: 'must be 15 characters or less '
                                    }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Label htmlFor="comment">Your Feedback</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows="6"
                                   className="form-control" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className="mt-2" type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
           
        );
}

}

function RenderDish({dish}){
    if(dish != null)
    {
        return (
            <Card>
                <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} /> 
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

function RenderComments({comments , postComment, dishId}) {
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
                <CommentForm dishId ={dishId} postComment ={postComment} />
            </ul>
        </div> 
    );
    }
    else{
        return (
            <div>vygbuhn</div>
        );
    }
}

  
 const  DishDetail = (props) => {
    if(props.isLoading){
        return (
                <div className = "container">
                    <div className = "row">
                        <Loading />
                    </div>
                </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className = "container">
                <div className = "row">
                    <h4>{props.errorMess}</h4>
                </div>
            </div>
    );
    }  
    else if(props.dish != null){
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
                            <RenderComments comments = {props.comments} 
                            postComment = {props.postComment}
                            dishId={props.dish.id} />
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
