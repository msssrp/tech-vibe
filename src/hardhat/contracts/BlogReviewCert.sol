// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol" ;
contract BlogReview is ERC721URIStorage {

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
    constructor() ERC721("BlogReviewCertificate", "BRC") {}
    
    function mintCertificate(address owner, string memory ownerName, string memory title, string memory ipfsHash , string memory ipfstokenURI , string memory blogName) public returns (uint256) {
        uint64 tokenId = generateRandomId();
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, ipfstokenURI);
        _nftData.push(NFTData(tokenId, owner, ownerName, title, ipfsHash , blogName , block.timestamp));
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
    function generateRandomId() internal view returns (uint64) {
        return uint64(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, totalReviews))) % 1e8); // Ensure 8-digit number
    }
}