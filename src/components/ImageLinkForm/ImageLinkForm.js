import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {onInputChange, onButtonSubmit} = this.props;
		return (
		<div className="ma4 mt0">
			<p className="f3">
				{'Magic is here!'}
			</p>
			<div className="center-content">
				<div className="form pa4 br3 shadow-5">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} 
					onCut={onInputChange} 
					onPaste={onInputChange} 
					onInput={onInputChange} placeholder="Put your URL here" />
					<button className="w-30 grow f4 link ph3 pv2 dib white" onClick={onButtonSubmit}>Find face</button>
				</div>
			</div>
		</div>
		);
	}
}

export default ImageLinkForm;