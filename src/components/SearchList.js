import { Fragment } from "react";
import './Home.css';

const SearchList = (props) => {
    const { searchResult } = props;

    console.log(searchResult);
    return(
        <Fragment>
            {searchResult && searchResult.map((result) => 
                <div className="result-item mt_20" key={result.pageid}>
                    <h3 className="result-title">
                    <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener">{result.title}</a>
                    </h3>
                    <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} className="result-link" target="_blank" rel="noopener">{`https://en.wikipedia.org/?curid=${result.pageid}`}</a><br />
                    <span className="result-snippet" dangerouslySetInnerHTML={{__html: result.snippet}} ></span><br />
                </div>
            )}
        </Fragment>
    );
}

export default SearchList;