import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div className="ma4 mt0 center">
			<div className="white f3">
				<span className="b f2">{name}</span>, your entry count is
			</div>
			<div className="white f2">
				{entries}
			</div>
		</div>
	);
}

export default Rank;