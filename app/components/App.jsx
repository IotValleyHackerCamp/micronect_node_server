import React from 'react';
 var socket = io.connect();
 
 const App = React.createClass ({
 	getInitialState() {
 		return {data:{}};
 	},
 	componentDidMount() {
 		socket.on('data', (data)=> {
    		console.log(data);
    		// socket.emit('my other event', { my: 'data' });
    		this.setState({data})
  		});
 	},
	render() {
		const microwaves = []
		for (let mw in this.state.data) {
			microwaves.push(<Microwave data={this.state.data[mw]} number={mw} key={mw} />)
		}
		return (
			<div id="content">
				<h1>Location : IoT 2</h1>
				<section className="ui centred container grid">
					{microwaves}
				</section>
			</div>
			);
	}
})


let Microwave = React.createClass({
	render(){
		const available = this.props.data.status
		let ago = parseInt((Date.now() - this.props.data.since) / 60000)
		if(ago <1) {
			ago = "moins d'une minute"
		}
		return (
			<div className="ui five wide column">
				<div className="ui card">
					<div className="content">
						<div className="ui header">Micronect {this.props.number}</div>
					</div>
					<div className="image">
						<img className="ui small image" src="img/Phatmicro-onde.jpg" alt="" />
					</div>
					<div className="extra content">
						Disponible : {(available)?'Oui':'Non'}
					</div>
					<div className="meta">
						Depuis {ago}
					</div>
				</div>
			</div>
			)
	}
})

export default App