import React from 'react';
import { Segment, Header } from 'semantic-ui-react'

const ArticleSummary = (props) => {

  return(
    <Segment raised padded='very'>
        <Header size='huge'>{props.article.headline}</Header>
        Source: {props.article.source}<br></br>
      <a href={props.article.url} target="_blank" rel="noopener noreferrer">View Article</a><br></br>
        <h4>{props.article.summary !== "No summary available." ? props.article.summary : null}</h4><br></br>
    </Segment>
  )
}

export default ArticleSummary
