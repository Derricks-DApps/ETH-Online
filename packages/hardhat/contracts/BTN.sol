// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "hardhat/console.sol";

contract BTN is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
	uint16 public companiesTotal = 0;
	uint16 public productsTotal = 0;
	uint256 public price = 0.001 ether;
	mapping(uint256 => bool) public barcodes;

	struct Company {
		uint16 prefix;
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

	function register(
		uint64 taxNumber,
		string calldata name,
		string calldata addr
	) external {
		require(companies[msg.sender].taxNumber == 0, "already registered");
		companiesTotal++;
		companies[msg.sender] = Company({
			prefix: companiesTotal,
			taxNumber: taxNumber,
			companyOwner: msg.sender,
			name: name,
			addr: addr
		});
	}

	function mint(
		uint barcode,
		string memory name,
		string memory description
	) public payable {
		require(msg.value >= price, "Insufficient balance");
		require(!barcodes[barcode], "already exists");
		productsTotal++;
		products[productsTotal] = Product({
			productOwner: msg.sender,
			name: name,
			description: description
		});
		barcodes[barcode] = true;
		_mint(msg.sender, barcode, 1, "");
	}

	function getCompany(
		address _company
	) external view returns (Company memory) {
		return companies[_company];
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
