// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract BTN is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
	uint256 public price = 0.001 ether;
	uint256 public companiesTotal = 0;
	uint256 public productsTotal = 0;
	uint256 public barcodesTotal = 0;

	struct Company {
		uint64 taxNumber;
		address companyOwner;
		string name;
		string addr;
	}
	// company address => company
	mapping(address => Company) public companies;

	struct Product {
		address productOwner;
		string name;
		string description;
	}
	// id => product
	mapping(uint256 => Product) public products;

	constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

	function setURI(string memory newuri) public onlyOwner {
		_setURI(newuri);
	}

	function pause() public onlyOwner {
		_pause();
	}

	function unpause() public onlyOwner {
		_unpause();
	}

	function register(
		uint64 taxNumber,
		string calldata name,
		string calldata addr
	) external {
		require(companies[msg.sender].taxNumber == 0, "already registered");
		companiesTotal++;
		companies[msg.sender] = Company({
			taxNumber: taxNumber,
			companyOwner: msg.sender,
			name: name,
			addr: addr
		});
	}

	function mint(
		string memory name,
		string memory description,
		uint256 amount
	) public payable {
		require(
			(companies[msg.sender].taxNumber != 0) &&
				(companies[msg.sender].companyOwner != address(0)),
			"company not registered"
		);
		require(msg.value >= price * amount, "Insufficient balance");
		productsTotal++;
		products[productsTotal] = Product({
			productOwner: msg.sender,
			name: name,
			description: description
		});
		barcodesTotal += amount;
		_mint(msg.sender, productsTotal, amount, "");
	}

	function setPrice(uint256 _price) external onlyOwner {
		price = _price;
	}

	function _update(
		address from,
		address to,
		uint256[] memory ids,
		uint256[] memory values
	) internal override(ERC1155, ERC1155Pausable, ERC1155Supply) {
		super._update(from, to, ids, values);
	}
}
