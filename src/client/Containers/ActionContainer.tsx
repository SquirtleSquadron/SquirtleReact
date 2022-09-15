import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ActionComponent from '../Components/ActionComponent';
import { ActionContainerProps, Actions } from '../../types';
import { resetStatus, playerAttack } from '../Store/actions';
import './styles.css';

const ActionContainer = (props: ActionContainerProps) => {
  const [selectedAction, changeAction] = useState<Actions>('Tackle');
  const dispatch = useDispatch();
  const { player } = props;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (player === 2) {
      return;
    } else if (e.key === 'Enter') {
      dispatch(playerAttack(
        {
          message: `Squirtle used ${selectedAction}!`,
          moveName: selectedAction,
          player: 1,
        },
      ));
    } else if (selectedAction === 'Tackle') {
      if (e.key === 'ArrowDown') {
        changeAction('Hydro Pump');
      } else if (e.key === 'ArrowRight') {
        changeAction('Flame Thrower');
      }
    } else if (selectedAction === 'Flame Thrower') {
      if (e.key === 'ArrowDown') {
        changeAction('Surf');
      } else if (e.key === 'ArrowLeft') {
        changeAction('Tackle');
      }
    } else if (selectedAction === 'Hydro Pump') {
      if (e.key === 'ArrowUp') {
        changeAction('Tackle');
      } else if (e.key === 'ArrowRight') {
        changeAction('Surf');
      }
    } else if (selectedAction === 'Surf') {
      if (e.key === 'ArrowUp') {
        changeAction('Flame Thrower');
      } else if (e.key === 'ArrowLeft') {
        changeAction('Hydro Pump');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedAction, player]);

  useEffect(() => {
    if (player === 2) {
      console.log('HELLO');
      setTimeout(() => {
        dispatch(playerAttack(
          {
            message: 'Mew Two used Psybeam!',
            moveName: 'Psybeam',
            player: 2,
          },
        ));
        playerAttack({
          message: 'Mew Two used Psybeam!',
          moveName: 'Psybeam',
          player: 2,
        });
        setTimeout(() => dispatch(resetStatus()), 2500);
      }, 2500);
    }
  }, [player]);

  const ActionsList: Actions[] = ['Tackle', 'Flame Thrower', 'Hydro Pump', 'Surf'];
  const RenderActions: JSX.Element[] = [];

  ActionsList.forEach((elem, idx) => {
    (elem === selectedAction)
      ? RenderActions.push(<ActionComponent key={`action-${idx}`} moveName={`ACTIVE ${elem}`} />)
      : RenderActions.push(<ActionComponent key={`action-${idx}`} moveName={`${elem}`} />);
  });

  return (
    <div className={`actionOnTurn${player}`}>
      {RenderActions}
    </div>
  );
};

export default ActionContainer;
