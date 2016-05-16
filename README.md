## StackExchange Bounty dApp

The StackExchange dApp is composed by a front-end written in CSS/JS situated in
the web-ui folder and by the StackExchangeBounty.sol, which is an Ethereum smart
contract written in Solidity.

The StackExchange Bounty dApp enables users to deposit bounties over StackExchange
questions. Oraclize will then query once a day StackExchange APIs and update the contract data. When the initial user, the one asking the question in first place, selects one of the answer as the most satisfactory one, the contract will pay the bounty to the owner of the selected answer, called *winner* in the contract code.
The bounty can be send only if the *winner* has an Ethereum address in the location field on his StackExchange subsite profile. If no address is found, Oraclize will keep
querying for that address once a day until the question's expiration date. After that date,
if there is no selected answer nor a destination address, the bounty or bounties will be returned to their respective owners.
