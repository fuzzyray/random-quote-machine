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

function TweetQuote(props) {
    let myHref = "https://twitter.com/intent/tweet"
    if (props.current) {
        myHref += "?text=";
        myHref += encodeURIComponent(props.current.quote + " - " + props.current.author);
    }
    return (
        <a id="tweet-quote" className="btn btn-primary"
           href={myHref} target="_blank" rel="noopener noreferrer"
           role="button"
           title="Tweet Quote"
        >
            <i className="fab fa-twitter"/>
        </a>
    );
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
            <blockquote className="blockquote">
                <p id="text">{current.quote}</p>
                <footer id="author" className="blockquote-footer">{current.author}</footer>
            </blockquote>
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
            <div className="container-fluid">
                <div id="quote-box" className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2>Random Quote Machine</h2>
                        <TweetQuote current={this.state.current}/>
                    </div>
                    <div className="card-body">
                        {(quotes && current) ? this.renderQuote(current) : <p>Fetching quotes...</p>}
                    </div>
                    <div className="card-footer">
                        <button
                            id="new-quote"
                            className="btn btn-lg btn-info"
                            onClick={() => this.setQuote(quotes)}
                        >
                            New Quote
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function App() {
    return (
        <div className="jumbotron" style={{minHeight: "100vh"}}>
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
