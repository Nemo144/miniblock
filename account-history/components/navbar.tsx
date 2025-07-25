"use client";
import React from "react";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import { createAddress } from "@stacks/transactions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
  //next.js router to handle redirecting to different pages
  const router = useRouter();

  //state variable for storing the address input in the search bar
  const [searchAddress, setSearchAddress] = useState("");

  //the useStacks hook
  const { userData, connectWallet, disconnectWallet } = useStacks();

  //function that validates the user inputted address
  //if valid, the user will be redirected to the txn history page
  const handleSearch = () => {
    if (!searchAddress.startsWith("SP")) {
      return alert("please enter a mainnet stacks address");
    }

    try {
      //createAddress comes from @stacks/transactions and throws an error if the given user input is not a valid stacks address
      createAddress(searchAddress);
    } catch (error) {
      return alert(`Invalid stacks address entered ${error}`);
    }
    //redirect to /SP...which will show the txn history for this address
    router.push(`/${searchAddress}`);
  };

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-4 h-16 border-b border-gray-500">
      <Link href="/" className="text-2xl font-bold">
        Stacks Account History
      </Link>

      <input
        type="text"
        placeholder="SP..."
        className="w-96 rounded-lg bg-gray-700  px-4 py-2 text-sm"
        onChange={(e) => setSearchAddress(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // enter = search
            handleSearch();
          }
        }}
      />

      <div className="flex items-center gap-2">
        {/*if userData exists, show the disconnect wallet button, else show the connect wallet button */}
        {userData ? (
          <div className="flex items-center gap-2">
            {/*button for quickly viewing user's own transaction history */}
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
              onClick={() => {
                router.push(`/${userData.profile.stxAddress.mainnet}`);
              }}
            >
              View{abbreviateAddress(userData.profile.stxAddress.mainnet)}
            </button>

            <button
              type="button"
              onClick={disconnectWallet}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};
