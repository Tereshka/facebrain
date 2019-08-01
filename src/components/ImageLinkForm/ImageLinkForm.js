import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showFileChooser: false
		};
	}

	onClickShowFileChooser = (event) => {
		this.setState({ showFileChooser: true });
	}

	onClickShowUrl = (event) => {
		this.setState({ showFileChooser: false });
	}

	render() {
		const { onInputChange, onButtonSubmit, disableFind, input, onInputClear } = this.props;
		return (
			<div className="ma4 mt0">
				<p className="f3 b mid-gray">
					Put an image url-address or upload one from gallery
				</p>
				<div className="center-content">
					<div className="form pa3 br3 shadow-5">
						<div data-toggle="buttons">
							<label className="f4 link ph3 pv2 dib white bg-mid-gray br3 mb2" onClick={this.onClickShowUrl}>
								<input type="radio" name="options" id="option1" defaultChecked />
								URL
							</label>
							<label className="f4 link ph3 pv2 dib white bg-mid-gray br3 mb2" onClick={this.onClickShowFileChooser}>
								<input type="radio" name="options" id="option2" />
								UPLOAD
							</label>
						</div>
						{this.state.showFileChooser ?
							<div id="uploadComputer" className="mb2">
								<label className="f3 white">Choose a file </label>
								<input type="file" id="image" name="image" accept="image/*" onChange={onInputChange} />
							</div>
							: 
							<div>
								<input className="f4 pa2 w-100 center mb2" type="text" 
									value={input}
									onChange={onInputChange}
									onCut={onInputChange}
									onPaste={onInputChange}
									onInput={onInputChange} 
									placeholder="http://" />
							</div>
							}
						<button className="white b pv2 ph3 bn br2" onClick={onButtonSubmit} disabled={disableFind}>Find face</button>
						<button className="white b pv2 ph3 bn br2 bg-gray" onClick={onInputClear} disabled={disableFind}>Clear</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ImageLinkForm;