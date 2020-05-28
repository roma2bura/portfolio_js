const Header = (props) => {
    return (
        <header>
           <h1>{props.title}</h1> 
           <span className="stats">Players: {props.totalPlayers}</span>
        </header>
    );
}

const Player = (props) => {
    // console.log(props.removePlayer)
    return (
            <div className="player">
                <span className="player-name">
                    {/* to remove player */}
                    <button className="remove-player" onClick={ () => props.removePlayer(props.id)}>✖</button> 
                    {props.name}
                </span>
                {/* added child component */}
                <Counter 
                /> 
            </div>
    );
}

// extends to create a child class
// adding .this component instance

class Counter extends React.Component {
   state = {
    score: 0
   };

//new method in our component
incrementScore() {
    this.setState( prevState => ({
         score: prevState.score + 1
    }));
}

decrementScore() {
     this.setState( prevState => ({
         score: prevState.score - 1
      }));
}


    render() {
        return (
            <div className="counter">
               <button className="counter-action decrement" onClick={this.decrementScore.bind(this)}> - </button>
               <span className="counter-score">{this.state.score}</span> 
               <button className="counter-action increment" onClick={this.incrementScore.bind(this)}> + </button> 
            </div>
        );
    }
}
    

// OUR APPLICATION
class App extends React.Component{

    state = {
        players: [
            {
                name: "Guil",
                id: 1
              },
              {
                name: "Treasure",
                id: 2
              },
              {
                name: "Ashley",
                id: 3
              },
              {
                name: "James",
                id: 4
              }
        ]
    };

handleRemovePlayer = (id)  => {
    this.setState( prevState => {
        return {
            players: prevState.players.filter( p => p.id !== id)
        };
    });
}

    render() {
        return (
        <div className="scoreboard">
            <Header 
                title="Scoreboard" 
                totalPlayers={this.state.players.length} 
            />

            {/* Players list */}

        {/* map takes a callback func that receives and processes each array one-by-one and returned new array of processed items. We have parameter player that represents the current item in array */}
            {this.state.players.map( player => 
                <Player
                name={player.name}
                id={player.id}
                key={player.id.toString()}  // toString method to convert into string
                removePlayer={this.handleRemovePlayer}

                />
            )}
         </div>
        );
    }
}
            
    
ReactDOM.render(
    <App />,
    document.getElementById('root') 
);