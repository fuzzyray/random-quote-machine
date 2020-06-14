import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const URL = "https://raw.githubusercontent.com/fuzzyray/FreeCodeCamp/master/assets/inspirational-quotes.json"

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: null
        }
    }

    componentDidMount() {
        fetch(URL).then(response => response.json()).then(json => this.setState({quotes: json}));
    }

    renderQuote(quotes) {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        const text = quote.quote;
        const author = quote.author;
        return (
            <React.Fragment>
                <p id="text">{text}</p>
                <p id="author">{author}</p>
            </React.Fragment>
        )
    }

    render() {
        const quotes = this.state.quotes;

        return (
            <div>
                { (quotes) ? this.renderQuote(quotes) : "Fetching quotes...." }
                <button id="new-quote">New Quote</button>
            </div>
        );
    }
}

function QuoteBox() {
    return (
        <div id="quote-box">
            <Quote/>
            <a id="tweet-quote" href="https://twitter.com/intent/tweet">Tweet Quote</a>
        </div>
    );
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
