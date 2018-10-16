import React from 'react';

const ArticleSummary = (props) => {

  return(
    <React.Fragment>
      <div>
        <h3>{props.article.headline}</h3><br></br>
      Source: {props.article.source}<br></br>
    <a href={props.article.url} target="_blank" rel="noopener noreferrer">{props.article.url}</a><br></br>
        {props.article.summary !== "No summary available." ? props.article.summary : null}<br></br>
      </div>
      <br></br>
      <br></br>
    </React.Fragment>
  )
}

export default ArticleSummary
