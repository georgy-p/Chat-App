/* eslint-disable jsx-a11y/control-has-associated-label */
import * as cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalsSlice.js';

const filter = require('leo-profanity');

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const removeModal = () => dispatch(modalActions.openModal({ type: 'removing', channelId: channel.id }));
  const renameModal = () => dispatch(modalActions.openModal({ type: 'renaming', channelId: channel.id }));

  const handleClick = () => dispatch(channelsActions.setNewId({ id: channel.id }));

  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': channel.id === currentChannelId,
  });

  const btnGroupClass = cn('flex-grow-0', 'dropdown-toggle', 'dropdown-toggle-split', 'btn', {
    'btn-secondary': channel.id === currentChannelId,
  });

  const renderName = () => (
    <button type="button" onClick={handleClick} className={btnClass}>
      <span># </span>
      {filter.clean(channel.name)}
    </button>
  );

  const renderBtnGroup = () => (
    <div role="group" className="d-flex dropdown btn-group">
      {renderName()}
      <div className="btn-group" role="group">
        <button type="button" id="btnGroupDrop" data-toggle="dropdown" aria-expanded="true" className={btnGroupClass} />
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop">
          <button type="button" onClick={removeModal} className="dropdown-item">{t('buttons.remove')}</button>
          <button type="button" onClick={renameModal} className="dropdown-item">{t('buttons.rename')}</button>
        </div>
      </div>
    </div>
  );

  return (
    <li className="nav-item w-100">
      {channel.removable ? renderBtnGroup() : renderName()}
    </li>
  );
};

export default Channel;
