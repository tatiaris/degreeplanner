import React from 'react';
import { PlaceHolderProps } from '../interfaces';
import PropTypes from 'prop-types';
import { Placeholder, Segment } from 'semantic-ui-react';

export const PlaceHolder: React.FC<PlaceHolderProps> = (props) => {
  let placeHolder = (
    <Segment inverted>
      <Placeholder inverted>
        <Placeholder.Header>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>
  );
  if (!props.show) {
    placeHolder = <></>;
  }

  return <>{placeHolder}</>;
};

PlaceHolder.propTypes = {
  show: PropTypes.bool
};
