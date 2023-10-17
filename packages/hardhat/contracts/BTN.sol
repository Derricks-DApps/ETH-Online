// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract BTN is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
    uint256 public price;
    uint256 public companiesCounter = 0;
    mapping(address => uint256) public companyPrefix;
    
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

    function mint(uint256 id, uint256 amount) public {
        companiesCounter++;
        companyPrefix[msg.sender] = companiesCounter;
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts) public {
        _mintBatch(msg.sender, ids, amounts, "");
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }
}
