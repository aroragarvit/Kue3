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
    
    function createQuestion(string memory question ) external payable{
        Question memory questionStruct ;
        questionStruct.id = questionCount++;
        questionStruct.question = question;
        questionStruct.questionAuthor = msg.sender;
        questionStruct.poolMoney = msg.value;
        questions[questionStruct.id] = questionStruct;
        questionOwner[msg.sender].push(questionStruct.id);
}

function answerQuestion (uint idQuestion, string memory answer ) external {  // id is the id of the question
    Answer memory answerStruct;
    answerStruct.autor = msg.sender;
    answerStruct.answer = answer;
    answerStruct.id = answerCount++;
    answers[idQuestion].push(answerStruct); 
}

// require that owner of the question can only approve the payement 
    function approvePayment(uint _idQuestion, uint _answerId) external payable{  
        require(msg.sender == questions[_idQuestion].questionAuthor); // require that the sender is the owner of the question
    
        uint value = questions[_idQuestion].poolMoney;
        address answerAuthor = answer[_answerId].autor;
        payable(answerAuthor).transfer(value);
         }

}