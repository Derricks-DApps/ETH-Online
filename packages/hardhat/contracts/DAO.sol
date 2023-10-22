// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BarcodeDAO {
    // Structure to represent a proposal
    struct Proposal {
        uint256 id;
        string barcode;
        address proposer;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    // Mapping to store the proposals
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    // Mapping to store the votes for each proposal
    mapping(address => mapping(uint256 => bool)) public votes;

    // Minimum quorum required for a proposal to be executed
    uint256 public quorum;
    // Minimum approval required for a proposal to be executed
    uint256 public approvalThreshold;

    constructor(uint256 _quorum, uint256 _threshold) {
        quorum = _quorum;
        approvalThreshold = _threshold;
    }

    // Event to log when a new proposal is created
    event ProposalCreated(uint256 indexed proposalId, string barcode, address proposer);
    // Event to log when a proposal is voted on
    event Voted(uint256 indexed proposalId, address voter, bool inSupport);
    // Event to log when a proposal is executed
    event ProposalExecuted(uint256 indexed proposalId);

    // Function to create a new proposal
    function propose(string memory _barcode) external {
        require(bytes(_barcode).length > 0, "Barcode cannot be empty");
        uint256 proposalId = proposalCount;
        proposals[proposalId] = Proposal({
            id: proposalId,
            barcode: _barcode,
            proposer: msg.sender,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        });
        proposalCount++;

        emit ProposalCreated(proposalId, _barcode, msg.sender);
    }

    // Function to vote for or against a proposal
    function vote(uint256 proposalId, bool support) external {
        require(proposalId < proposalCount, "Invalid proposal ID");
        require(!votes[msg.sender][proposalId], "Already voted");

        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        if (support) {
            proposal.forVotes += 1;
        } else {
            proposal.againstVotes += 1;
        }

        votes[msg.sender][proposalId] = true;
        emit Voted(proposalId, msg.sender, support);
    }

    // Function to execute a proposal if conditions are met
    function execute(uint256 proposalId) external {
        require(proposalId < proposalCount, "Invalid proposal ID");

        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        uint256 totalVotes = proposal.forVotes + proposal.againstVotes;
        require(totalVotes >= quorum, "Quorum not reached");

        if (proposal.forVotes * 100 > totalVotes * approvalThreshold) {
            // More than approvalThreshold % of votes are in favor
            // Execute the proposal
            proposal.executed = true;
            emit ProposalExecuted(proposalId);
        }
    }
}
