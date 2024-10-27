// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 

contract BlogCertificate is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct BlogCertData {
        uint64 tokenId;
        address owner;
        string ownerName;
        string title;
        string ipfsHash;
        string blogName;
        uint timestamp;
    }

    BlogCertData[] private _blogCertData;
    uint public totalReviews;

    // Counter for unique tokenId generation
    Counters.Counter private _tokenIdCounter;

    // Mapping to track revoked certificates
    mapping(uint64 => bool) private _revokedCertificates;

    constructor() ERC721("BlogCertificate", "BLC") {}

    function mintCertificate(
        address owner, 
        string memory ownerName, 
        string memory title, 
        string memory ipfsHash, 
        string memory ipfstokenURI, 
        string memory blogName
    ) public returns (uint256) {
        // Increment the counter to generate a new unique tokenId
        _tokenIdCounter.increment();
        uint64 tokenId = uint64(_tokenIdCounter.current());
        
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, ipfstokenURI);
        _blogCertData.push(BlogCertData(tokenId, owner, ownerName, title, ipfsHash, blogName, block.timestamp));
        return tokenId;
    }

    function getAllCertificates() public view returns (BlogCertData[] memory) {
        return _blogCertData;
    }

    function getCertificate(uint64 tokenId) public view returns (BlogCertData memory) {
        for (uint i = 0; i < _blogCertData.length; i++) {
            if (_blogCertData[i].tokenId == tokenId) {
                return _blogCertData[i];
            }
        }
        revert("Certificate not found for the provided tokenId");
    }

    // Revoke the certificate by marking the tokenId as revoked, burning the token, and removing it from the data array
    function revokeCertificate(uint64 tokenId) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(!_revokedCertificates[tokenId], "Certificate already revoked");

        _revokedCertificates[tokenId] = true;

        // Remove certificate record from the _blogCertData array
        for (uint i = 0; i < _blogCertData.length; i++) {
            if (_blogCertData[i].tokenId == tokenId) {
                // Replace the element to be removed with the last element
                _blogCertData[i] = _blogCertData[_blogCertData.length - 1];
                _blogCertData.pop(); // Remove the last element
                break;
            }
        }

        _burn(tokenId); // Burn the token
    }

    function isRevoked(uint64 tokenId) public view returns (bool) {
        return _revokedCertificates[tokenId];
    }

    function _beforeTokenTransfer(
    address from, 
    address to, 
    uint256 tokenId
    ) internal override virtual {
        // Allow minting (from == 0) and burning (to == 0) but prevent other transfers
        if (from != address(0) && to != address(0)) {
            require(from == address(0), "SBT blog certificate cannot be transferred");
        }
        super._beforeTokenTransfer(from, to, tokenId);
    }

 
    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // Override tokenURI to return empty if the certificate is revoked
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        if (_revokedCertificates[uint64(tokenId)]) {
            return "This certificate has been revoked";
        }
        return super.tokenURI(tokenId);
    }
      
    function verifyCertificate(
        uint256 tokenId,
        address owner,
        string memory ipfsHash
    ) public view returns (bool) {
        if (!_exists(tokenId)) return false;
        if (ownerOf(tokenId) != owner) return false;
        if (_revokedCertificates[uint64(tokenId)]) return false;
        for (uint i = 0; i < _blogCertData.length; i++) {
        if (_blogCertData[i].tokenId == tokenId) {
            if (keccak256(abi.encodePacked(_blogCertData[i].ipfsHash)) == keccak256(abi.encodePacked(ipfsHash))) {
                return true;
            }
        }
    }
        return true; 
    }
}
