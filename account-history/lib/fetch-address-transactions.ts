// //this will be for the function whereby given an address and an starting point, will return the next 20 transactions
interface FetchAddressTransactionsArgs {
  address: string;
  offset?: number;
}

//output from the function
export interface FetchAddressTransactionsResponse {
  limit: number;
  offset: number;
  total: number;
  results: Array<{
    tx: Transaction;
    stx_sent: string;
    stx_received: string;
    block_height: number;
    events: {
      stx: TransactionEvent;
      ft: TransactionEvent;
      nft: TransactionEvent;
    };
  }>;
}

//intermediary types of transactions we get from hiro's APIs
interface BaseTransaction {
  tx_id: string;
  nonce: number;
  sender_address: string;
  block_hash: string;
  parent_block_hash: string;
  block_height: number;
  block_time: number;
  tx_status: string;
  tx_type:
    | "coinbase"
    | "token_transfer"
    | "smart_contract"
    | "contract_call"
    | "poison_microblock";
}

interface CoinbaseTransaction extends BaseTransaction {
  tx_type: "coinbase";
}

interface TokenTransferTransaction extends BaseTransaction {
  tx_type: "token_transfer";
  token_transfer: {
    recipient_address: string;
    amount: string;
  };
}

interface SmartContractTransaction extends BaseTransaction {
  tx_type: "smart_contract";
  smart_contract: {
    contract_id: string;
    clarity_version: number;
    clarity_id: string;
  };
}

interface ContractCallTransaction extends BaseTransaction {
  tx_type: "contract_call";
  contract_call: {
    contract_id: string;
    function_name: string;
  };
}

interface PoisonMicroblockTransaction extends BaseTransaction {
  tx_type: "poison_microblock";
}

export type Transaction =
  | CoinbaseTransaction
  | TokenTransferTransaction
  | SmartContractTransaction
  | ContractCallTransaction
  | PoisonMicroblockTransaction;

interface TransactionEvent {
  transfer: number;
  mint: number;
  burn: number;
}

//using hiro's api to fetch transaction history
export async function fetchAddressTransactions({
  address,
  offset = 0,
}: FetchAddressTransactionsArgs): Promise<FetchAddressTransactionsResponse> {
  const url = `https://api.hiro.so/extended/v2/addresses/${address}/transactions?limit=20&offset=${offset}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address transactions");
  }

  const data = await response.json();
  return data as FetchAddressTransactionsResponse;
}
