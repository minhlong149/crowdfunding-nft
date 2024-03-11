// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

error InsufficientContribution();
error UnauthorizedAccess();
error ProjectNotReleased();

/**
 * @notice A crowdfunding platform that allows users to announce projects and contribute to them.
 * - The contributors will receive fungible tokens in return for their contribution.
 * - When the goal of the project is reached, an NFT will be minted to the owner and they will receive the fund.
 *
 * @dev Each project has a unique ID and two tokens associated with it:
 * - The fungible tokens are minted to the contributors when they contribute to the project.
 * - The non-fungible tokens are minted to the owner when the project is released.
 * - The fungible tokens and the non-fungible tokens have the same URI.
 */
contract CrowdfundingNFT is ERC1155URIStorage {
    struct Project {
        uint256 id;
        string name;
        uint256 fund;
        uint256 goal;
        address owner;
        bool released;
    }

    struct Contribution {
        Project project;
        uint256 amount;
    }

    uint256 private _currentProjectIndex;

    mapping(uint256 => Project) private _projects;

    modifier isOwner(uint256 projectId) {
        if (_projects[projectId].owner != msg.sender) {
            revert UnauthorizedAccess();
        }
        _;
    }

    modifier isContributor(uint256 projectId) {
        if (!userContributedToProject(projectId)) {
            revert InsufficientContribution();
        }
        _;
    }

    modifier isFullyFunded(uint256 projectId) {
        if (_projects[projectId].fund < _projects[projectId].goal) {
            revert InsufficientContribution();
        }
        _;
    }

    modifier hasNotReleased(uint256 projectId) {
        if (_projects[projectId].released) {
            revert ProjectNotReleased();
        }
        _;
    }

    modifier minimumValue(uint256 minimum) {
        if (msg.value < minimum) {
            revert InsufficientContribution();
        }
        _;
    }

    constructor() ERC1155("") {
        _currentProjectIndex = 0;
    }

    /**
     * @notice Users can announce a new project and set a goal for it.
     */
    function announceProject(string memory name, uint256 goal) external {
        _projects[_currentProjectIndex++] = Project({
            id: _currentProjectIndex,
            name: name,
            fund: 0,
            goal: goal,
            owner: msg.sender,
            released: false
        });
    }

    /**
     * @notice Users can contribute to a project and get fungible tokens in return.
     * @dev An amount of fungible tokens will be created and assigned to the contributor.
     */
    function contributeToProject(uint256 projectId) external payable minimumValue(0) hasNotReleased(projectId) {
        Project storage project = _projects[projectId];
        uint256 contribution = msg.value;

        _mint(msg.sender, getContributionIdOfProject(projectId), contribution, "");

        project.fund += contribution;
    }

    /**
     * @notice Users can exchange all their fungible tokens to get their contribution back.
     * @dev All the fungible tokens of the user for the project will be destroyed.
     */
    function withdrawFromProject(uint256 projectId) external isContributor(projectId) hasNotReleased(projectId) {
        Project storage project = _projects[projectId];
        uint256 contribution = balanceOf(msg.sender, getContributionIdOfProject(projectId));

        payable(msg.sender).transfer(contribution);

        _burn(msg.sender, getContributionIdOfProject(projectId), contribution);

        project.fund -= contribution;
    }

    /**
     * @notice The owner can release the project and get the fund.
     * @dev A non-fungible token will be minted to the owner.
     */
    function releaseProject(
        uint256 projectId,
        string memory assetURI
    ) external isOwner(projectId) isFullyFunded(projectId) hasNotReleased(projectId) {
        Project storage project = _projects[projectId];

        payable(project.owner).transfer(project.fund);

        _mint(project.owner, getNftIdOfProject(projectId), 1, "");
        _setURI(getNftIdOfProject(projectId), assetURI);
        _setURI(getContributionIdOfProject(projectId), assetURI);

        project.released = true;
    }

    /**
     * @dev Iternal function to get all the projects from the `_projects` mapping.
     * @return List of all projects that have been announced.
     */
    function getProjects() public view returns (Project[] memory) {
        Project[] memory projects = new Project[](_currentProjectIndex);

        for (uint256 projectId = 0; projectId < _currentProjectIndex; projectId++) {
            projects[projectId] = getProject(projectId);
        }

        return projects;
    }

    /**
     * @dev Find all the projects with the `backersTokenId` that the user owns
     * @return List of all projects that the user has contributed to
     */
    function getContributedProjects() public view returns (Contribution[] memory) {
        uint256 totalContributions = getTotalContributions();
        Contribution[] memory contributedProjects = new Contribution[](totalContributions);

        for (uint256 projectId = 0; projectId < _currentProjectIndex; projectId++) {
            if (userContributedToProject(projectId)) {
                contributedProjects[--totalContributions] = Contribution({
                    project: getProject(projectId),
                    amount: balanceOf(msg.sender, getContributionIdOfProject(projectId))
                });
            }
        }

        return contributedProjects;
    }

    /**
     * @notice Helper function used to alocate the storage for the `getContributedProjects` function
     * @dev Find all the projects with the `backersTokenId` that the user owns
     * @return The total number of projects that the user has contributed to
     */
    function getTotalContributions() internal view returns (uint256) {
        uint256 contributions = 0;

        for (uint256 projectId = 0; projectId < _currentProjectIndex; projectId++) {
            if (userContributedToProject(projectId)) {
                contributions++;
            }
        }

        return contributions;
    }

    /**
     * @return The details of the project with the given `projectId`
     */
    function getProject(uint256 projectId) public view returns (Project memory) {
        return _projects[projectId];
    }

    /**
     * @return The non-fungible token ID used to mint the project NFT to the owner
     */
    function getNftIdOfProject(uint256 projectId) public pure returns (uint256) {
        return projectId * 2;
    }

    /**
     * @return The fungible token ID used to mint the rewarded tokens to the contributors
     */
    function getContributionIdOfProject(uint256 projectId) public pure returns (uint256) {
        return projectId * 2 + 1;
    }

    /**
     * @dev Check if the user owns any fungible tokens of a project
     * @return True if the user has contributed to the project with the given `projectId`
     */
    function userContributedToProject(uint256 projectId) internal view returns (bool) {
        return balanceOf(msg.sender, getContributionIdOfProject(projectId)) > 0;
    }
}
