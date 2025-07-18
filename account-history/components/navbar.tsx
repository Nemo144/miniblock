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

  return <div>Navbar</div>;
};
