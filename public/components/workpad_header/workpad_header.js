import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiButtonIcon,
  EuiButton,
  EuiOverlayMask,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
} from '@elastic/eui';
import { Tooltip } from '../tooltip';
import { AssetManager } from '../asset_manager';
import { ElementTypes } from '../element_types';
import { FullscreenControl } from '../fullscreen_control';
import { RefreshControl } from '../refresh_control';

export const WorkpadHeader = ({
  editing,
  toggleEditing,
  hasAssets,
  addElement,
  setShowElementModal,
  showElementModal,
}) => {
  const keyHandler = action => {
    if (action === 'EDITING') toggleEditing();
  };

  const elementAdd = (
    <EuiOverlayMask>
      <EuiModal onClose={() => setShowElementModal(false)} style={{ width: '1080px' }}>
        <EuiModalBody>
          <ElementTypes
            onClick={element => {
              addElement(element);
              setShowElementModal(false);
            }}
          />
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButton size="s" onClick={() => setShowElementModal(false)}>
            Dismiss
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );

  return (
    <div>
      {showElementModal ? elementAdd : null}
      <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center" gutterSize="xs">
            <EuiFlexItem grow={false}>
              <RefreshControl />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <FullscreenControl>
                {({ toggleFullscreen }) => (
                  <Tooltip position="bottom" content="Toggle fullscreen mode">
                    <EuiButtonIcon
                      iconType="fullScreen"
                      aria-label="View fullscreen"
                      onClick={toggleFullscreen}
                    />
                  </Tooltip>
                )}
              </FullscreenControl>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Shortcuts name="EDITOR" handler={keyHandler} targetNodeSelector="body" global />
              <Tooltip
                position="bottom"
                content={editing ? 'Hide editing controls' : 'Show editing controls'}
              >
                <EuiButtonIcon
                  iconType={editing ? 'eye' : 'eyeClosed'}
                  onClick={() => {
                    toggleEditing();
                  }}
                  size="s"
                  aria-label={editing ? 'Hide editing controls' : 'Show editing controls'}
                />
              </Tooltip>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        {editing ? (
          <EuiFlexItem grow={false}>
            <EuiFlexGroup alignItems="center" gutterSize="s">
              {hasAssets && (
                <EuiFlexItem grow={false}>
                  <AssetManager />
                </EuiFlexItem>
              )}
              <EuiFlexItem grow={false}>
                <EuiButton
                  fill
                  size="s"
                  iconType="vector"
                  onClick={() => setShowElementModal(true)}
                >
                  Add element
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        ) : null}
      </EuiFlexGroup>
    </div>
  );
};

WorkpadHeader.propTypes = {
  editing: PropTypes.bool,
  toggleEditing: PropTypes.func,
  hasAssets: PropTypes.bool,
  addElement: PropTypes.func.isRequired,
  showElementModal: PropTypes.bool,
  setShowElementModal: PropTypes.func,
};
