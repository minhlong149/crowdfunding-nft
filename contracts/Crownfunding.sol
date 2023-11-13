// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Crownfunding is ERC721URIStorage {
    uint256 private _currentProjectIndex;

    struct Project {
        uint256 goal;
        uint256 fund;
    }

    mapping(uint256 => Project) private _projects;
    mapping(uint256 => mapping(address => uint256)) _contributeToProject;

    constructor() ERC721("Crownfunding NFT", "CFN") {
        _currentProjectIndex = 0;
    }

    function announceProject(uint256 goal) public returns (uint256) {
        uint256 projectId = _currentProjectIndex++;
        _projects[projectId] = Project({goal: goal, fund: 0});
        _safeMint(msg.sender, projectId);
        return projectId;
    }

    function contribute(uint256 projectId) public payable {
        require(msg.value > 0);
        _projects[projectId].fund += msg.value;
        _contributeToProject[projectId][msg.sender] += msg.value;
    }

    // TODO: Backer can withdraw their contribution

    function release(uint256 projectId, string memory tokenURI) public {
        require(ownerOf(projectId) == msg.sender);
        require(_projects[projectId].fund >= _projects[projectId].goal);
        _setTokenURI(projectId, tokenURI);
        payable(msg.sender).transfer(_projects[projectId].fund);
    }
}
