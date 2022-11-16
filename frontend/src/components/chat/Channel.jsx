import * as cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions as chatActions } from '../../slices/chatInfoSlice';
// import { Button } from 'react-bootstrap';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currChannelId = useSelector((state) => state.chatReducer.channelsInfo.currentChannelId);

  const handleClick = () => dispatch(chatActions.setNewChannelId({ id: channel.id }));

  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': channel.id === currChannelId,
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
