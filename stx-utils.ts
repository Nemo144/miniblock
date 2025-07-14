//function to abbreviate addresses
export function abbreviateAddress(address: string) {
  return `${address.substring(0, 5)}...${address.substring(36)}`;
}

//function to abbreviate the transaction Id
export function abbreviateTxnId(txnId: string) {
  return `${txnId.substring(0, 5)}...${txnId.substring(62)}`;
}
