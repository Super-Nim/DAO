# DAO 

This is a DAO with a 10 minute time period to contribute your test ether to the DAO, and receive shares that are proportional to how much you contributed. Investment proposals also have a 10 minute time period to vote on until their voting period ends. The quorum is set upon initialization. 

Once the initial contribution period timer is up, those who have contributed will have their wallet addresses flagged as **investors**. 

Investors can create investment proposals for the DAO that others can vote on. When an investor creates a proposal, an amount of the dao's available funds are passed as a paramete. The proposals have a 10 minute time period until they are closed for futher voting. 

Once an investor tries to execute the proposal, if the quorum has been reached or surpassed, it will then transfer the defined funds to a recipient contract address that will represent the investment.