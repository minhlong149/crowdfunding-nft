// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

error InsufficientContribution();
error GoalNotReached();
error ProjectAlreadyCompleted();
error UnauthorizedAccess();

contract CrowdfundingNFT is ERC721URIStorage {
    uint256 private _currentProjectIndex;

    struct Project {
        uint256 id;
        string name;
        uint256 fund;
        uint256 goal;
        address owner;
        bool released;
    }

    struct Donation {
        uint256 amount;
        uint256 timestamp;
    }

    struct Contribution {
        Project project;
        Donation donation;
    }

    mapping(uint256 => Project) private _projects;
    mapping(uint256 => mapping(address => Donation)) _contributeToProject;

    modifier isOwner(uint256 projectId) {
        if (_projects[projectId].owner != msg.sender) {
            revert UnauthorizedAccess();
        }
        _;
    }

    modifier isFullyFunded(uint256 projectId) {
        if (_projects[projectId].fund < _projects[projectId].goal) {
            revert GoalNotReached();
        }
        _;
    }

    modifier hasNotReleased(uint256 projectId) {
        if (_projects[projectId].released) {
            revert ProjectAlreadyCompleted();
        }
        _;
    }

    modifier minimumValue(uint256 minimum) {
        if (msg.value <= minimum) {
            revert InsufficientContribution();
        }
        _;
    }

    constructor() ERC721("Crownfunding NFT", "CFD") {
        _currentProjectIndex = 0;
    }

    /**
     * @notice Create a new project
     * @param name Name of the project
     * @param goal Amount to be raised
     * @return The id of the created project
     */
    function announceProject(
        string memory name,
        uint256 goal
    ) external returns (uint256) {
        uint256 projectId = _currentProjectIndex++;

        // Initialize new project
        _projects[projectId] = Project({
            id: projectId,
            name: name,
            fund: 0,
            goal: goal,
            owner: msg.sender,
            released: false
        });

        return projectId;
    }

    /**
     * @notice Contribute to a project
     * @param projectId The id of the token
     */
    function contributeToProject(
        uint256 projectId
    ) external payable minimumValue(0) hasNotReleased(projectId) {
        // Update the project fund
        _projects[projectId].fund += msg.value;

        // Save the contributor details
        Donation storage donation = _contributeToProject[projectId][msg.sender];
        donation.amount += msg.value;
        donation.timestamp = block.timestamp;
    }

    /**
     * @notice Withdraw from a project and get a refund
     * @param projectId The id of the token
     */
    function withdrawFromProject(
        uint256 projectId
    ) external hasNotReleased(projectId) {
        // Check if user has contributed to the project
        Donation memory donation = _contributeToProject[projectId][msg.sender];
        if (donation.amount == 0) {
            revert InsufficientContribution();
        }

        // Return the funds to the contributor
        payable(msg.sender).transfer(donation.amount);
        _projects[projectId].fund -= donation.amount;

        // Remove contributor from the project
        delete (_contributeToProject[projectId][msg.sender]);
    }

    /**
     * @notice Owner of the project updates the asset and gets the funds
     * @param projectId The id of the token
     * @param assetURI The URI of the token
     */
    function releaseProject(
        uint256 projectId,
        string memory assetURI
    )
        external
        isOwner(projectId)
        isFullyFunded(projectId)
        hasNotReleased(projectId)
    {
        // Mint the NFT to the project owner
        _safeMint(msg.sender, projectId);
        _setTokenURI(projectId, assetURI);

        // Transfer the funds to the project owner
        payable(msg.sender).transfer(_projects[projectId].fund);

        // Mark the project as released
        _projects[projectId].released = true;
    }

    /**
     * @notice Get all the projects
     * @return An array of all the projects with additional details
     */
    function getProjects() public view returns (Project[] memory) {
        Project[] memory projects = new Project[](_currentProjectIndex);
        for (
            uint256 projectId = 0;
            projectId < _currentProjectIndex;
            projectId++
        ) {
            projects[projectId] = getProject(projectId);
        }
        return projects;
    }

    /**
     * @notice Find all the projects that the user has contributed to
     * @return An array of all the projects with additional details
     */
    function getContributedProjects()
        public
        view
        returns (Contribution[] memory)
    {
        uint256 contributedProjectsIndex = 0;
        Contribution[] memory contributedProjects = new Contribution[](
            getTotalContributions()
        );
        for (
            uint256 projectId = 0;
            projectId < _currentProjectIndex;
            projectId++
        ) {
            Donation memory donation = _contributeToProject[projectId][
                msg.sender
            ];
            if (donation.amount > 0) {
                contributedProjects[contributedProjectsIndex++] = Contribution({
                    project: getProject(projectId),
                    donation: donation
                });
            }
        }

        return contributedProjects;
    }

    /**
     * @dev Used for allocating memory for the array of contributed projects
     */
    function getTotalContributions() public view returns (uint256) {
        uint256 contributions = 0;
        for (
            uint256 projectId = 0;
            projectId < _currentProjectIndex;
            projectId++
        ) {
            Donation memory donation = _contributeToProject[projectId][
                msg.sender
            ];
            if (donation.amount > 0) {
                contributions++;
            }
        }
        return contributions;
    }

    /**
     * @dev Get additional details of a project, e.g. owner address and tokenURI
     */
    function getProject(
        uint256 projectId
    ) public view returns (Project memory) {
        return _projects[projectId];
    }
}
