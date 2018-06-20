import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			showUrl: true,
			showFileChooser: false
		};
	}

	onClickShowFileChooser = (event) => {
    	this.setState({showFileChooser: true});
    	this.setState({showUrl: false});
  	}

  	onClickShowUrl = (event) => {
    	this.setState({showFileChooser: false});
    	this.setState({showUrl: true});
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
					<div data-toggle="buttons">
						<label className="f4 link ph3 pv2 mb2 dib white bg-mid-gray" onClick={this.onClickShowUrl}><input  type="radio" name="options" id="option1" defaultChecked />URL</label>
						<label className="f4 link ph3 pv2 mb2 dib white bg-mid-gray"  onClick={this.onClickShowFileChooser}><input type="radio" name="options" id="option2" />UPLOAD</label>
					</div>
					{ this.state.showFileChooser ?  
						<div id="uploadComputer">
							<label className="f3">Choose file</label>
			                <input type="file" id="image" name="image" accept="image/*" onChange={onInputChange} />
			            </div>
		            : null }
		            { this.state.showUrl ?
						<div>
							<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} 
							onCut={onInputChange} 
							onPaste={onInputChange} 
							onInput={onInputChange} placeholder="Put your URL here" />
						</div>
					: null }
					<div><button className="w-30 grow f4 link ph3 pv2 dib white" onClick={onButtonSubmit}>Find face</button></div>
				</div>
			</div>
		</div>
		);
	}
}

export default ImageLinkForm;