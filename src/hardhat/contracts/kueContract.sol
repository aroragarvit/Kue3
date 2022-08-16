// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Kue {
    struct Question {
        uint id;
        string question;
        uint256 poolMoney;
        address questionAuthor;
        bool isPaid;
        uint numberOfContribution;
    }

    uint256 questionCount = 0;

    mapping(address => uint[]) questionOwner; // access questions using address of question owner
    mapping(uint => Question) questions; // access questions using question id

    struct Answer {
        uint id;
        address autor;
        string answer;
    }
    uint256 answerCount = 0;
    mapping(uint => uint[]) answers; // mapping answers to question id
    mapping(uint => Answer) answer; // access answer using answer id

    function createQuestion(string memory question) external payable {
        Question memory questionStruct;
        questionStruct.id = ++questionCount;
        questionStruct.question = question;
        questionStruct.questionAuthor = msg.sender;
        questionStruct.isPaid = false;
        questionStruct.poolMoney = msg.value;
        questions[questionStruct.id] = questionStruct;
        questionOwner[msg.sender].push(questionStruct.id);
    }

    function answerQuestion(uint idQuestion, string memory _answer) external {
        // id is the id of the question
        require(questions[idQuestion].isPaid == false);
        require(msg.sender != questions[idQuestion].questionAuthor);
        Answer memory answerStruct;
        answerStruct.autor = msg.sender;
        answerStruct.answer = _answer;
        answerStruct.id = ++answerCount;
        answer[answerStruct.id] = answerStruct;
        answers[idQuestion].push(answerStruct.id);
    }

    // require that owner of the question can only approve the payement
    function approvePayment(uint _idQuestion, uint _answerId) external {
        require(msg.sender == questions[_idQuestion].questionAuthor); // require that the sender is the owner of the question
        require(msg.sender != answer[_answerId].autor); // require that the sender is not the owner of the answer
        require(questions[_idQuestion].isPaid == false);

        uint value = questions[_idQuestion].poolMoney;
        address answerAuthor = answer[_answerId].autor;
        payable(answerAuthor).transfer(value);
        questions[_idQuestion].poolMoney =
            questions[_idQuestion].poolMoney -
            value;
        questions[_idQuestion].isPaid = true;
    }

    function contributeToPool(uint _idQuestion) external payable {
        require(msg.sender != questions[_idQuestion].questionAuthor); // require that the sender is not the owner of the question
        require(questions[_idQuestion].isPaid == false); // require that the question is not paid
        questions[_idQuestion].numberOfContribution++;
        questions[_idQuestion].poolMoney += msg.value;
    }

    function getQuestionById(uint _idQuestion)
        external
        view
        returns (Question memory)
    {
        return questions[_idQuestion];
    }

    function getQuestionsByOwner(address _owner)
        external
        view
        returns (uint[] memory)
    {
        return questionOwner[_owner];
    }

    function getAnswersByQuestion(uint _idQuestion)
        external
        view
        returns (uint[] memory)
    {
        return answers[_idQuestion];
    }

    function getAnswerById(uint _idAnswer)
        external
        view
        returns (Answer memory)
    {
        return answer[_idAnswer];
    }

    function getLatestQuestion(uint256 _page)
        external
        view
        returns (Question[] memory)
    {
        // page 0,1,2 etc like this

        uint256 _localLatest = (_page - 1) * 10;
        require(questionCount > _localLatest);
        _localLatest = questionCount - _localLatest;
        uint256 _counter = 0;
        if (_localLatest > 10) {
            Question[] memory _latestposts = new Question[](10);
            for (uint256 i = _localLatest; i > (_localLatest - 10); i--) {
                _latestposts[_counter] = questions[i];
                _counter++;
            }
            return _latestposts;
        } else {
            Question[] memory _latestposts = new Question[](_localLatest);
            for (uint256 i = _localLatest; i > 0; i--) {
                _latestposts[_counter] = questions[i];
                _counter++;
            }
            return _latestposts;
        }
    }
}
