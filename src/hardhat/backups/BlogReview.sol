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

    constructor() ERC721("BlogReviewCertificate", "BRC") {}
    struct Review {
        uint64 reviewId;
        uint timestamp; 
        address reviewer;
        string title;
        uint rating;
        string[] ipfsHash; 
    }

    struct ReviewWithId {
        uint64 reviewId;
        uint timestamp;
        Review review;
    }

    uint public totalReviews;

    event ReviewAdded(uint64 indexed reviewId, string indexed blogId, address indexed reviewer, string title, uint rating, string[] ipfsHash, uint timestamp); // Changed event signature
    event ReviewDeleted(uint64 indexed reviewId, string indexed blogId, address indexed reviewer);
    event ReviewUpdated(uint64 indexed reviewId, string indexed blogId, address indexed reviewer, string title, uint rating, string[] ipfsHash); // Changed event signature

    mapping(string => Review[]) public reviews; 

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
    function addReview(string memory blogId, string memory title, uint rating, string[] memory ipfsHash) public {
        require(bytes(blogId).length > 0, "Invalid blog ID");

        uint64 newReviewId = generateRandomId();
        reviews[blogId].push(Review(newReviewId, block.timestamp, msg.sender, title, rating, ipfsHash));
        emit ReviewAdded(newReviewId, blogId, msg.sender, title, rating, ipfsHash, block.timestamp);
        totalReviews++;
    }

    function deleteReview(uint64 reviewId, string memory blogId) public {
        require(bytes(blogId).length > 0, "Invalid blog ID");
        require(reviews[blogId].length > 0, "No reviews found for this blog ID");

        for (uint i = 0; i < reviews[blogId].length; i++) {
            if (reviews[blogId][i].reviewId == reviewId) {
                reviews[blogId][i] = reviews[blogId][reviews[blogId].length - 1];
                reviews[blogId].pop();
                emit ReviewDeleted(reviewId, blogId, msg.sender);
                totalReviews--;
                return;
            }
        }
        revert("Review not found");
    }

    function updateReview(uint64 reviewId, string memory blogId, string memory title, uint rating, string[] memory ipfsHash) public {
        require(bytes(blogId).length > 0, "Invalid blog ID");

        for (uint i = 0; i < reviews[blogId].length; i++) {
            if (reviews[blogId][i].reviewId == reviewId) {
                reviews[blogId][i].title = title;
                reviews[blogId][i].rating = rating;
                reviews[blogId][i].ipfsHash = ipfsHash;
                emit ReviewUpdated(reviewId, blogId, msg.sender, title, rating, ipfsHash);
                return;
            }
        }
        revert("Review not found");
    }

    function getAllReviews(string memory blogId) public view returns (Review[] memory) {
        uint length = reviews[blogId].length;
        Review[] memory allReviews = new Review[](length);
        for (uint i = 0; i < length; i++) {
            allReviews[i] = reviews[blogId][i];
        }
        return allReviews;
    }

    function generateRandomId() internal view returns (uint64) {
        return uint64(uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, totalReviews))) % 1e8); // Ensure 8-digit number
    }
}