// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BTN is ERC721, ERC721Burnable, Ownable {
	uint256 private _nextTokenId;
	string public product_name;
	string public description;

	constructor(
		address initialOwner,
		string memory _product_name,
		string memory _description
	) ERC721("Barcode Tree Node", "BTN") Ownable() {
		product_name = _product_name;
		description = _description;
	}

	function safeMint(address to) public onlyOwner {
		uint256 tokenId = _nextTokenId++;
		_safeMint(to, tokenId);
	}
}
