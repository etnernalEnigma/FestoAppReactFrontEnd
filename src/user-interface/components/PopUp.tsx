import React, { Component, Fragment } from 'react';  
import { Modal } from 'react-bootstrap';  

interface PopUpProps {
	show:boolean;
    title:string;
    description: string;
    hide:()=>void;
}

interface PopUpState{
    show:boolean;
}

export class PopUp extends React.Component<PopUpProps, PopUpState>{
    constructor(props:PopUpProps)
    {
        super(props)
        this.state={show:false}
    }

    render(){
        return  (
            <>  
                <Modal id="modal" show={this.props.show}
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                    onHide={this.props.hide}>  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            {this.props.title} 
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <div className="signUp">  
                            <p>{this.props.description}</p>  
                        </div>  
                    </Modal.Body>  
                    <Modal.Footer>
                    <button type="button" onClick={this.props.hide}> Close</button>
                    </Modal.Footer>
                </Modal >  
            </>  )
    }
   
}

export default PopUp;