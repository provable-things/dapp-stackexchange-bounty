## StackExchange Bounty ÐApp

The StackExchange ÐApp is composed of an Angular 2 (CSS/HTML/TypeScript) front-end and the StackExchangeBounty.sol, an Ethereum smart contract written in solidity.

The StackExchange Bounty ÐApp enables users to set bounties on StackExchange
questions. Oraclize will then query StackExchange API sonce a day and update the contract data. When the question creator selects an answer as correct, the contract will pay the bounty to the owner of the selected answer (called *winner* in the contract code).

The bounty can be send only if the *winner* has an Ethereum address in the location field of his StackExchange subsite profile. If no address is found, Oraclize will keep
querying for an address once a day until the question's expiration date. After that date,
if there is no selected answer nor a destination address, the bounty or bounties will be returned to their respective owners.
