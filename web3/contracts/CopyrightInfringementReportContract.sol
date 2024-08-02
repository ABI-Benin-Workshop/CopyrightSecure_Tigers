// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IWorkRegistration.sol"; // You might need this to get work details

contract CopyrightInfringementReportContract {
    IWorkRegistration public workRegistration; // Add reference if needed

    enum ReportStatus { 
        PENDING, 
        INVALID, 
        ACTION_TAKEN 
    }

    struct InfringementReport {
        uint256 reportId;
        uint256 workId;
        address reporter; 
        string infringementDetails;
        ReportStatus status; 
    }

    mapping(uint256 => InfringementReport) public reports;
    uint256 public reportCounter;

    constructor(address _workRegistrationAddress) {
        workRegistration = IWorkRegistration(_workRegistrationAddress);
    }
    event ReportSubmitted(uint256 indexed reportId, uint256 indexed workId, address indexed reporter);

    // Function to report copyright infringement
    function reportInfringement(
        uint256 _workId,
        string memory _infringementDetails 
    ) public {
        uint256 reportId = reportCounter++;
        reports[reportId] = InfringementReport({
            reportId: reportId,
            workId: _workId,
            reporter: msg.sender,
            infringementDetails: _infringementDetails,
            status: ReportStatus.PENDING
        });

        emit ReportSubmitted(reportId, _workId, msg.sender);
    }
  
    // Function to get a specific infringement report
    function getReport(uint256 _reportId) public view returns (InfringementReport memory) {
        return reports[_reportId];
    }

    // Function to update the status of a report (e.g., by an admin)
    function updateReportStatus(uint256 _reportId, ReportStatus _newStatus) public {
        // Add authorization checks here: Only an admin or authorized role should be able to change report status
        InfringementReport storage report = reports[_reportId];
        report.status = _newStatus;

        if(_newStatus==ReportStatus.ACTION_TAKEN){
          workRegistration.addWorkValidation(report.workId, IWorkRegistration.WorkStatus.REJECTED, report.infringementDetails);
        }
    }
}