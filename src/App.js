import React, { Component} from "react"

class App extends Component {

  state = {
    words: ['fuck', 'ordinateur', 'vendre'],
  }

  /**
   * Init function to start the game
   */
  start = () => {

  }

  /**
   * Display letters' places
   */
  displayInputs = () => {

  }

  /**
   * find letter in the choosen word
   */
  findLetter = () => {

  }

  render() {
    const { words } = this.state

    return (
      words.map((word, idx) => (
        <p key={idx}>{word}</p>
      ))
    )
  }
}

export default App