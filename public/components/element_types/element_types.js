import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { EuiFieldSearch, EuiCard, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import lowerCase from 'lodash.lowercase';
import { map, includes, sortBy } from 'lodash';

export const ElementTypes = ({ elements, onClick, search, setSearch }) => {
  search = lowerCase(search);
  elements = sortBy(map(elements, (element, name) => ({ name, ...element })), 'displayName');
  const elementList = map(elements, (element, name) => {
    const { help, displayName, expression, filter, width, height, image } = element;
    const whenClicked = () => onClick({ expression, filter, width, height });

    // Add back in icon={image} to this when Design has a full icon set
    const card = (
      <EuiFlexItem key={name} style={{ minWidth: 200, maxWidth: 200, maxHeight: 200 }}>
        <EuiCard
          textAlign="left"
          image={image}
          title={displayName}
          description={help}
          onClick={whenClicked}
        />
      </EuiFlexItem>
    );

    if (!search) return card;
    if (includes(lowerCase(name), search)) return card;
    if (includes(lowerCase(displayName), search)) return card;
    if (includes(lowerCase(help), search)) return card;
    return null;
  });

  return (
    <Fragment>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFieldSearch
            placeholder="Filter Elements"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="m" />
      <EuiFlexGroup wrap>{elementList}</EuiFlexGroup>
    </Fragment>
  );
};

ElementTypes.propTypes = {
  elements: PropTypes.object,
  onClick: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
