import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const URL = "https://raw.githubusercontent.com/fuzzyray/FreeCodeCamp/master/assets/inspirational-quotes.json"
const defaultQuote = [
    {
        quote: "To err is human, to really foul things up requires a computer",
        author: "Unknown"
    }
];

class TweetThis extends React.Component {
    /*
        constructor(props) {
            super(props);
        }
    */
    render() {
        if (this.props.current) {
            return (
                <p>
                    <a id="tweet-quote"
                       href={
                           "https://twitter.com/intent/tweet?text="
                           + encodeURIComponent(this.props.current.quote + " - " + this.props.current.author)}
                       target="_blank"
                       rel="noopener noreferrer">
                        Tweet Quote
                    </a>
                </p>
            );
        } else {
            return (
                <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer">
                    Tweet Quote
                </a>
            );
        }
    }
}

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: null,
            current: null
        }
    }

    componentDidMount() {
        fetch(URL)
            .then(response => response.json())
            .then(json => {
                this.setState({quotes: json});
                this.setState({current: this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]});
            })
            .catch(err => {
                console.error(err);
                this.setState({quotes: defaultQuote, current: defaultQuote[0]});
            });
    }

    renderQuote(current) {
        return (
            <React.Fragment>
                <p id="text">{current.quote}</p>
                <p id="author">{current.author}</p>
            </React.Fragment>
        )
    }

    setQuote(quotes) {
        if (quotes) {
            this.setState({current: quotes[Math.floor(Math.random() * quotes.length)]});
        }
    }

    render() {
        const quotes = this.state.quotes;
        const current = this.state.current;

        return (
            <div id="quote-box">
                {(quotes && current) ? this.renderQuote(current) : <p>Fetching quotes....</p>}
                <button id="new-quote" onClick={() => this.setQuote(quotes)}>New Quote</button>
                <TweetThis current={this.state.current}/>
                { /* <a id="tweet-quote" href="https://twitter.com/intent/tweet">Tweet Quote</a> */}
            </div>
        );
    }
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Random Quote Machine</p>
            </header>
            <QuoteBox/>
        </div>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
