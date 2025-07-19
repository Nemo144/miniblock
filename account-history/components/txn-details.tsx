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
