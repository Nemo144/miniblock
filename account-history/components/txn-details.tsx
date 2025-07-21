import type {
  FetchAddressTransactionsResponse,
  Transaction,
} from "@/lib/fetch-address-transactions";
import { abbreviateTxnId, abbreviateAddress } from "@/lib/stx-utils";
import {
  ActivityIcon,
  ArrowLeftRightIcon,
  BlocksIcon,
  CodeSquareIcon,
  FunctionSquareIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface TransactionDetailProps {
  result: FetchAddressTransactionsResponse["results"][number];
}

//each component will display the following pieces of information that will vary depending on the type of transaction
type TransactionInformationByType = {
  primaryTitle: string;
  secondaryTitle: string;
  tags: string[];
};

//an icon to represent each type of transaction
const TxTypeIcon: Record<Transaction["tx_type"], LucideIcon> = {
  coinbase: BlocksIcon,
  token_transfer: ArrowLeftRightIcon,
  smart_contract: CodeSquareIcon,
  contract_call: FunctionSquareIcon,
  poison_microblock: ActivityIcon,
};

// get the transaction info by type 
function getTransactionInformationByType
