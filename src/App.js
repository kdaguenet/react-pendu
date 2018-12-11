import React, {Component} from 'react'
import Pendu from './counter/pendu.js'
import Alert from './includes/alert.js'

const wordsList = ['vittel','arbre','velo']

class App extends Component {

    baseLife = 8

    state = {
        wordsList: ['vittel','arbre','velo'],
        letters: [],
        typed: [],
        status: false,
        firstLoad: true,
        text: '',
        life: 0,
        flashMsg : {
            msg : "",
            type : "",
            visible : false
        }
    }

    /**
     * Select one word an return a array of letters
     */
    getWord = () => {
        const {wordsList} = this.state
        const rand = this.getRandomInt(wordsList.length)
        const letters = wordsList[rand].split('')
        this.setState({letters: letters, typed: [], life: 0})
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    start = () => {
        this.getWord()
        this.setState({status: true, firstLoad: false, text: ''})
    }

    handleKeyUp = (event) => {
        const {typed, status, flashMsg} = this.state
        const currentLetter = event.target.value

        if (status) {
            if(this.alreadyUse(currentLetter)) {
                this.setState({
                    flashMsg : {
                        msg : `Vous avez deja utiliser la lettre ${currentLetter}`,
                        type : "danger",
                        visible : true
                    }
                })
            } else {
                this.checkLife(currentLetter)
                this.setState({typed: [...typed, currentLetter], flashMsg : {
                    ...flashMsg,
                    visible : false
                }}, this.checkWord)
            }
            event.target.value = ""
        }
    }

    alreadyUse = (keyword) => {
        const {typed} = this.state
        return typed.includes(keyword)
    }

    checkLife = (keyword) => {
        const {letters, life} = this.state
        if (!letters.includes(keyword)) {
            this.setState({life: life + 1})
        }
    }

    checkWord = () => {
        const {letters, typed, life} = this.state

        if (life < this.baseLife) {
            const findWord = letters.filter(elt => typed.includes(elt)).length === letters.length
            if (findWord) {
                this.setState({
                    flashMsg : {
                        msg : `Félicitation, vous avez trouver le mot ${letters.join('')} vous avez gagnée`,
                        type : "success",
                        visible : true
                    },
                    status: false
                })
            } else {
                this.setState({text: ''})
            }
        } else {
            this.setState({
                flashMsg : {
                    msg : `Vous avez perdu le mot a touver etait ${letters.join('')}`,
                    type : "danger",
                    visible : true
                },
                status: false,
                life: this.baseLife
            })
        }


    }

    render() {
        const {letters, typed, status, text, life, firstLoad, flashMsg} = this.state

        const genWord = letters.map((letter, idx) => {

            const typeLetter = typed.includes(letter) ? 'success' : 'danger'

            const letterClass = `border-bottom border-${typeLetter} mr-2 ml-2 flex-fill text-center`

            return (
                <span key={idx} className={letterClass}>
              {typed.includes(letter) ? letter : '?'}
            </span>
            )
        })

        //Si on a jamais lancer de partie
        if (firstLoad) {
            return (
                <div>
                    <h1>Bienvenue sur le jeu du Pendu</h1>
                    <p>
                        <button className={'btn btn-primary'} type="button" onClick={this.start} maxLength="1"
                                disabled={status}>Lancer une nouvelles partie
                        </button>
                    </p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className={'mx-auto'}>Bienvenue sur le jeu du Pendu</h1>

                    <p>inscrivez la lettre de votre choix dans le champ ci dessous, si c'est la bonne, elle s'affichera
                        dans les résultats sinon gare au pendu. Vous avez 8 chances.</p>

                    <div className={'d-flex justify-content-between text-zone'}>
                        {status ? genWord : null}
                    </div>
                    <br />
                    <div className="row align-items-stretch">
                        <div className="col-sm-9">
                            {status ? <input className={'form-control'} type="text" onKeyUp={this.handleKeyUp} placeholder="Entrez une lettre ici"/> :
                                <button className={'btn btn-primary'} type="button" onClick={this.start}>Relancer un partie
                                    ?</button> }
                        </div>
                        <div className="col-sm-3 align-self-center">
                            <Pendu id={life}/>
                        </div>
                    </div>
                    <p>Lettres déjà utilisées : {typed}</p>
                    <Alert msg={flashMsg.msg} type={flashMsg.type} visible={flashMsg.visible}/>



                </div>
            )
        }
    }
}

export default App