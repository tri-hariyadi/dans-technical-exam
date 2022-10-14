import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap'

const CardItem = ({data}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          {data?.title} <span>({data?.type})</span>
        </CardTitle>
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
        >
          {data?.company}
        </CardSubtitle>
        <CardText>
          <p className='mb-1 mt-2'>{data?.location}</p>
          <p className='mb-1'>{data?.company_url}</p>
        </CardText>
        <p dangerouslySetInnerHTML={{__html: data?.how_to_apply}} />
      </CardBody>
    </Card>
  )
}

export default CardItem
