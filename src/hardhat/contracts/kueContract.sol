// Randon users can also contribute to question pool 
 

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Kue {
    struct Question{
        uint id;
        string question;
        uint256 poolMoney;
        address questionAuthor;
        bool isPaid;
        uint numberOfContribution;
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
    mapping (uint =>uint[]) answers;  // mapping answers to question id
    mapping(uint=>Answer) answer;     // access answer using answer id
    
    function createQuestion(string memory question ) external payable{
        Question memory questionStruct ;
        questionStruct.id = questionCount++;
        questionStruct.question = question;
        questionStruct.questionAuthor = msg.sender;
        questionStruct.isPaid = false;
        questionStruct.poolMoney = msg.value;
        questions[questionStruct.id] = questionStruct;
        questionOwner[msg.sender].push(questionStruct.id);
}

function answerQuestion (uint idQuestion, string memory answer ) external {  // id is the id of the question
    require(questions[idQuestion].isPaid == false);
    require(msg.sender!=questions[idQuestion].questionAuthor );
    Answer memory answerStruct;
    answerStruct.autor = msg.sender;
    answerStruct.answer = answer;
    answerStruct.id = answerCount++;
    answers[idQuestion].push(answerStruct.id); 
}

// require that owner of the question can only approve the payement 
    function approvePayment(uint _idQuestion, uint _answerId) external payable{  
        require(msg.sender == questions[_idQuestion].questionAuthor); // require that the sender is the owner of the question
        questions[_idQuestion].isPaid = true;
        uint value = questions[_idQuestion].poolMoney;
        address answerAuthor = answer[_answerId].autor;
        payable(answerAuthor).transfer(value);
         }

    function contributeToPool(uint _idQuestion) external payable{
        require( msg.sender != questions[_idQuestion].questionAuthor); // require that the sender is not the owner of the question
        require(questions[_idQuestion].isPaid == false); // require that the question is not paid
        questions[_idQuestion].numberOfContribution++;
        questions[_idQuestion].poolMoney += msg.value;
    }

    function getQuestionById(uint _idQuestion) public view returns (string memory){
        return questions[_idQuestion].question;
    }

    function getQuestionsByOwner(address _owner) public view returns (uint[] memory ){
        return questionOwner[_owner];
    }

    function getAnswersByQuestion(uint _idQuestion) public view returns (uint[] memory){
        return answers[_idQuestion];
    }
    function getAnswerById(uint _idAnswer) public view returns (string memory){
        return answer[_idAnswer].answer;
    }

}