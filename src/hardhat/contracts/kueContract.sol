// Randon users can also contribute to question pool 
 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Kue {
    struct Question{
        uint id;
        string question;
        uint256 poolMoney;
        address questionAuthor;
        }

    uint256 questionCount = 0;
    
    mapping (address=>uint[]) questionOwner;     // access questions using address of question owner
    mapping (uint=>Question) questions;          // access questions using question id

    struct Answer{
        uint id;
        address autor;
        string answer;
    }
    uint256 answerCount = 0;
    mapping (uint =>Answer[]) answers;  // mapping answers to question id
    mapping(uint=>Answer) answer;     // access answer using answer id
    
}