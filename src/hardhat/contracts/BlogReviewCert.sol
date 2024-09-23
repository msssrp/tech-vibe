// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 

contract BlogReview is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct NFTData {
        uint64 tokenId;
        address owner;
        string ownerName;
        string title;
        string ipfsHash;
        string blogName;
        uint timestamp;
    }

    NFTData[] private _nftData;
    uint public totalReviews;

    // Counter for unique tokenId generation
    Counters.Counter private _tokenIdCounter;

    // Mapping to track revoked certificates
    mapping(uint64 => bool) private _revokedCertificates;

    constructor() ERC721("BlogReviewCertificate", "BRC") {}

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
        _nftData.push(NFTData(tokenId, owner, ownerName, title, ipfsHash, blogName, block.timestamp));
        return tokenId;
    }

    function getAllCertificates() public view returns (NFTData[] memory) {
        return _nftData;
    }

    function getCertificate(uint64 tokenId) public view returns (NFTData memory) {
        for (uint i = 0; i < _nftData.length; i++) {
            if (_nftData[i].tokenId == tokenId) {
                return _nftData[i];
            }
        }
        revert("Certificate not found for the provided tokenId");
    }

    // Revoke the certificate by marking the tokenId as revoked, burning the token, and removing it from the data array
    function revokeCertificate(uint64 tokenId) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        require(!_revokedCertificates[tokenId], "Certificate already revoked");

        _revokedCertificates[tokenId] = true;

        // Remove certificate record from the _nftData array
        for (uint i = 0; i < _nftData.length; i++) {
            if (_nftData[i].tokenId == tokenId) {
                // Replace the element to be removed with the last element
                _nftData[i] = _nftData[_nftData.length - 1];
                _nftData.pop(); // Remove the last element
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
            require(from == address(0), "Soulbound token cannot be transferred");
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
}
