import React, { useState } from 'react';
import { Button, Header, Input } from 'semantic-ui-react';

const AuthorizeTx = ({
  txSummary,
  declineTransaction,
  authorizeTransaction,
}) => {
  const [password, setPassword] = useState('');

  const { amount, currency_symbol, kind } = txSummary;
  const isReclaimTx = typeof kind === 'string';
  const txKindMessage = isReclaimTx ? 'Withdraw' : 'Transfer';
  const recipient = isReclaimTx
    ? 'your public wallet'
    : kind.PrivateTransfer.recipient;
  const summaryMessage = `${txKindMessage} ${amount} ${currency_symbol} to: ${recipient}`;

  const onClickAuthorize = async () => {
    await authorizeTransaction(password);
  };

  const onClickDecline = async () => {
    await declineTransaction();
  };

  return (
    <>
      <Header> Authorize Transaction </Header>
      <div className="tx-summary">{summaryMessage}</div>
      <Input
        type="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button className="button" onClick={onClickAuthorize}>
        Authorize
      </Button>
      <Button className="button" onClick={onClickDecline}>
        Decline
      </Button>
    </>
  );
};

export default AuthorizeTx;