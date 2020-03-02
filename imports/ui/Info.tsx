import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
// eslint-disable-next-line no-unused-vars
import Links, { Link } from '../api/links'

const renderLink = (link: Link) => (
  <li key={link._id}>
    <a href={link.url} target="_blank" rel='noreferrer noopener'>{link.title}</a>
  </li>
)

type InfoProps = {
  links: [Link]
}
const Info = ({ links }: InfoProps) => {
  const renderedLinks = links.map(renderLink)

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>{ renderedLinks }</ul>
    </div>
  )
}

export default withTracker(() => ({
  links: Links.find().fetch()
}))(Info)
