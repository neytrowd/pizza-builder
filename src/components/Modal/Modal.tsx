import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import  { Modal as ModalWin } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './Modal.css';

interface Modal {
    root: HTMLElement
}

class Modal extends React.Component<any, any>{

    componentWillMount() {
        this.root = document.createElement('div')
        document.body.appendChild(this.root);
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    render() {

        return ReactDOM.createPortal(
            <ModalWin
                      center
                      open={this.props.open}
                      classNames={{ modal: 'ModalBlock' }}
                      onClose={() => this.props.close()}>
                {
                    this.props.children
                }
            </ModalWin>,
            this.root
        )
    }
}

export default Modal;
