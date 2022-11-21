import * as cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleClick = () => dispatch(channelsActions.setNewId({ id: channel.id }));

  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': channel.id === currentChannelId,
  });

  return (
    <li className="nav-item w-100">
      <button type="button" onClick={handleClick} className={btnClass}>
        <span># </span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
