//this will be for the function whereby given an address and an starting point, will return the next 20 transactions

//input to the function
interface FetchAddressTransactionsArgs {
  address: string;
  offset: number;
}

//output from the function
export interface FetchAddressTransactionsResponse {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    tx: IDBTransaction;
    stx_sent: string;
    stx_received: string;
    events: {
      stx: TransitionEvent;
      ft: TransitionEvent;
      nft: TransitionEvent;
    };
  }>;
}
