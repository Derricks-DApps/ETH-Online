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
    mapping (uint256 => bool) public barcodes;
    
    struct Company {
		address companyOwner;
        uint16 prefix;
		string taxId;
        string name;
        string addr;
    }
    // company address => company
    mapping (address => Company) public companies;

    struct Product {
        address productOwner;
        string name;
        string description;
    }
    // id => product
    mapping (uint256 => Product) public products;

	event Registered(Company company);
    event Unregistered(address company);
	event Minted(uint256 indexed barcode, Product product);
	event PriceChanged(uint256 newPrice);
    
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
        emit PriceChanged(price);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function register(string calldata taxId, string calldata name, string calldata addr) external {
        require(companies[msg.sender].prefix == 0, "already registered"); 
        companiesTotal++;
        companies[msg.sender]= Company({
			companyOwner: msg.sender, 
			prefix: companiesTotal, 
			taxId: taxId, 
			name: name, 
			addr: addr
		});
		emit Registered(companies[msg.sender]);
    }

	function ungister(address companyAddress) external onlyOwner {
        require(companies[msg.sender].prefix != 0, "not registered"); 
		Company memory emptyCompany;
		companies[companyAddress] = emptyCompany;
		emit Unregistered(companyAddress);
    }

    function mint(uint barcode, string memory name, string memory description) public payable {
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
		emit Minted(barcode, products[productsTotal]);
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
		emit PriceChanged(_price);
    }

    function getCompany(address _company) external view returns(Company memory) {
        return companies[_company];
    }

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

}
