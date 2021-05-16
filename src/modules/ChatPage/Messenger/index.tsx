import { makeStyles } from '@material-ui/core/styles';
import { Colors, boxShadow } from 'constants/ui';
import { SendIcon } from 'components/Icons/SendIcon';
import { useVideoChatContext } from 'modules/Context';
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
  messengerContainer: {
    gridColumn: '4 / span 1',
    gridRow: '1 / span 3',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px',
    overflow: 'hidden',
    background: Colors.surface,
    boxShadow
  },
  messengerTitle: {
    padding: '16px',
    margin: 0,
    borderBottom: `1px solid ${Colors.border}`,
    textAlign: 'center',
    ...theme.typography.h1
  },
  messengerInputWrapper: {
    display: 'flex',
    height: '72px'
  },
  messengerInput: {
    flexGrow: 1,
    padding: '16px',
    border: 'none',
    outline: 'none',
    color: Colors.onSurface,
    resize: 'none',
    ...theme.typography.body1,

    '&::placeholder': {
      color: Colors.secondary
    }
  },
  messengerInputSendButton: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '72px',
    width: '72px',
    border: 'none',
    padding: 'none',
    overflow: 'hidden',
    background: Colors.surface,
    cursor: 'pointer',

    '&:before': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      content: `''`,
      background: Colors.primary,
      opacity: 0,
      transition: 'opacity 0.2s ease',
    },

    '&:hover:before': {
      opacity: 0.15,
    },

    '&:active:before': {
      opacity: 0.3,
    }
  },
  messengerListContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: '0 16px 16px',
    borderBottom: `1px solid ${Colors.border}`,
  },
  messengerListItem: {
    padding: '8px',
    marginBottom: '16px',
    color: Colors.onSecondary,
    wordBreak: 'break-all',
    ...theme.typography.body1
  },
  messengerListItemLeft: {
    alignSelf: 'flex-start',
    borderRadius: '10px 10px 10px 0px',
    marginRight: '32px',
    background: Colors.secondary,
  },
  messengerListItemRight: {
    alignSelf: 'flex-end',
    borderRadius: '10px 10px 0px 10px',
    marginLeft: '32px',
    background: Colors.secondaryVariant,
  }
}));

export const Messenger = () => {
  const [textField, setTextField] = useState('');
  const classes = useStyles();
  const { receiverName, messages, sendMessage, username } = useVideoChatContext();

  const handleSend = () => {
    sendMessage(textField);
    setTextField('');
  };

  const renderMessage = (message: { sender: string; text: string }, index: number) => {
    const className = username === message.sender
      ? classes.messengerListItemRight
      : classes.messengerListItemLeft;

    return (
      <div className={`${className} ${classes.messengerListItem}`} key={index}>
        {message.text}
      </div>
    )
  }

  return (
    <div className={classes.messengerContainer}>
      <div className={classes.messengerTitle}>{receiverName}</div>
      <div className={classes.messengerListContainer}>
        {messages.map(renderMessage)}
      </div>
      <div className={classes.messengerInputWrapper}>
        <textarea
          className={classes.messengerInput}
          placeholder="Напишите что-нибудь"
          value={textField}
          onChange={event => setTextField(event.target.value)}
        />
        <button className={classes.messengerInputSendButton} onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
