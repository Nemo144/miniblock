//function to abbreviate addresses
export function abbreviateAddress(address: string) {
  //taking the first 5 and the last 5
  return `${address.substring(0, 5)}...${address.substring(36)}`;
}

//function to abbreviate the transaction Id
export function abbreviateTxnId(txnId: string) {
  //taking the first 5 and the last 5
  return `${txnId.substring(0, 5)}...${txnId.substring(62)}`;
}
