// Upvote on Answer: +10 points
// Upvote on Question: +5 points
// Accepted Answer: +15 points
// Accepting an Answer: +2 points
// Downvote Received on Post: -2 points
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// Questions Upvotes Points =
// Number of Questions
// ×
// Average Upvotes per Question
// ×
// 5
// Number of Questions×Average Upvotes per Question×5
// Answers Upvotes Points =
// Number of Answers
// ×
// Average Upvotes per Answer
// ×
// 10
// Number of Answers×Average Upvotes per Answer×10
// Accepted Answer Bonus =
// Number of Accepted Answers
// ×
// 15
// Number of Accepted Answers×15
// Accepted Own Answer Bonus =
// Number of Answers Accepted by User
// ×
// 2
// Number of Answers Accepted by User×2
// Downvotes Points =
// Downvotes Received on Posts
// ×
// 2
// Downvotes Received on Posts×2

// -------------------------------------------------------

// Normalized Score= (( userScore - MinScore ) / (maxScore - minScore))*100

// -----------------------------------------------------------------

// Project Marks: 30 points
// Quiz Marks: 20 points
// Assignment Marks: 20 points
// Reputation Contribution: Up to 30 points based on their normalized reputation score

// --------------------------------------------------------

// Total Grade=Project Marks+Quiz Marks+Assignment Marks+((normalizedScore / 100) * 30)

const questionsData = {
  1: {
    questions: [{ upVotes: 19 }, { upVotes: 2 }, { upVotes: 10 }],
    answers: [{ upVotes: 5 }, { upVotes: 15 }],
    acceptedAnswers: 1,
    downVotes: 3,
    projectMarks: 20,
    quizMarks: 20,
    assignmentMarks: 30,
  },
  2: {
    questions: [{ upVotes: 21 }, { upVotes: 44 }, { upVotes: 9 }, { upVotes: 33 }],
    answers: [{ upVotes: 10 }, { upVotes: 20 }],
    acceptedAnswers: 4,
    downVotes: 3,
    projectMarks: 10,
    quizMarks: 15,
    assignmentMarks: 15,
  },
  3: {
    questions: [{ upVotes: 33 }, { upVotes: 2 }, { upVotes: 66 }],
    answers: [{ upVotes: 66 }, { upVotes: 44 }, { upVotes: 53 }, { upVotes: 12 }, { upVotes: 78 }],
    acceptedAnswers: 3,
    downVotes: 5,
    projectMarks: 8,
    quizMarks: 10,
    assignmentMarks: 6,
  },
};

const users = [1, 2, 3];

function calculateMaxAndMinScore(userTotalPointsData, users) {
  let maxScore;
  let minScore;

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userPoints = userTotalPointsData[user];
    if (i === 0) {
      maxScore = userPoints;
      minScore = userPoints;
    } else {
      if (userPoints > maxScore) {
        maxScore = userPoints;
      }
      if (userPoints < minScore) {
        minScore = userPoints;
      }
    }
  }

  return { maxScore, minScore };
}

function calculateUsersPoints(userArray) {
  const userTotalPointsData = {};
  for (let i = 0; i < userArray.length; i++) {
    const user = userArray[i];
    const { questions, answers, acceptedAnswers, downVotes } = questionsData[user];
    const totalQuestions = questions.length;
    const totalAnswers = answers.length;
    const totalAcceptedAnswers = acceptedAnswers;
    const totalDownVotes = downVotes;

    const averageQuestionUpvotes = questions.reduce((acc, curr) => acc + curr.upVotes, 0) / totalQuestions;
    const averageAnswerUpvotes = answers.reduce((acc, curr) => acc + curr.upVotes, 0) / totalAnswers;

    const questionPoints = totalQuestions * averageQuestionUpvotes * 5;
    const answerPoints = totalAnswers * averageAnswerUpvotes * 10;
    const acceptedAnswerPoints = totalAcceptedAnswers * 15;
    // TODO: this accepted Own Answer Points will not include in the final formula
    const acceptedOwnAnswerPoints = acceptedAnswers * 2;
    const downVotesPoints = totalDownVotes * 2;

    const totalPoints = questionPoints + answerPoints + acceptedAnswerPoints - downVotesPoints;
    // console.log('🚀 ~ calculateUsersPoints ~ totalPoints:', totalPoints);

    userTotalPointsData[user] = totalPoints;
  }

  const { maxScore, minScore } = calculateMaxAndMinScore(userTotalPointsData, users);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const { projectMarks, quizMarks, assignmentMarks } = questionsData[user];

    const userPoints = userTotalPointsData[user];
    console.log('🚀 ~ calculateUsersPoints ~ userPoints:', userPoints);
    const normalizedScore = ((userPoints - minScore) / (maxScore - minScore)) * 100;
    // console.log(
    //   `User ${user} has a total of ${userPoints} points and a normalized score of ${normalizedScore.toFixed(2)}%`
    // );

    console.log(projectMarks, quizMarks, assignmentMarks, normalizedScore);

    const totalGrade = projectMarks + quizMarks + assignmentMarks + (normalizedScore / 100) * 30;
    console.log('🚀 ~ calculateUsersPoints ~ totalGrade:', totalGrade);
    console.log('-----------------------------------');
  }
}

calculateUsersPoints(users);

// TODO: yaha sy agy ab Score Normalized weekly or Quiz wgaira monthly hoga

// chatGpt documentation: https://chatgpt.com/share/6729f167-4ee0-8009-8c3e-fcc10a3094be

// An other
// Sample data for users
const data = {
  1: {
    questions: [{ upVotes: 19 }, { upVotes: 2 }, { upVotes: 10 }],
    answers: [{ upVotes: 5 }, { upVotes: 15 }],
    acceptedAnswers: 1,
    downVotes: 3,
    projectMarks: 25,
    quizMarks: 18,
    assignmentMarks: 17,
  },
  2: {
    questions: [{ upVotes: 5 }, { upVotes: 7 }, { upVotes: 4 }],
    answers: [{ upVotes: 8 }],
    acceptedAnswers: 0,
    downVotes: 5,
    projectMarks: 28,
    quizMarks: 20,
    assignmentMarks: 20,
  },
  3: {
    questions: [{ upVotes: 15 }, { upVotes: 12 }],
    answers: [{ upVotes: 10 }, { upVotes: 25 }, { upVotes: 5 }],
    acceptedAnswers: 2,
    downVotes: 2,
    projectMarks: 30,
    quizMarks: 20,
    assignmentMarks: 20,
  },
  4: {
    questions: [{ upVotes: 3 }, { upVotes: 6 }],
    answers: [{ upVotes: 5 }],
    acceptedAnswers: 0,
    downVotes: 4,
    projectMarks: 20,
    quizMarks: 15,
    assignmentMarks: 10,
  },
  5: {
    questions: [{ upVotes: 7 }],
    answers: [{ upVotes: 2 }],
    acceptedAnswers: 0,
    downVotes: 3,
    projectMarks: 10,
    quizMarks: 10,
    assignmentMarks: 15,
  },
};

// Function to calculate normalized score for each user
function calculateNormalizedScores(data) {
  const users = Object.keys(data);
  let weeklyNormalizedScores = {};

  users.forEach((user) => {
    const userData = data[user];
    const totalUpVotes =
      userData.questions.reduce((sum, q) => sum + q.upVotes, 0) +
      userData.answers.reduce((sum, a) => sum + a.upVotes, 0) +
      userData.acceptedAnswers * 10; // Bonus for accepted answers
    const totalDownVotes = userData.downVotes;

    // Simple formula: (Total UpVotes - Total DownVotes)
    const reputationScore = totalUpVotes - totalDownVotes;

    // Calculate weekly normalized score (out of 100) and store for each user
    weeklyNormalizedScores[user] = [];
    for (let week = 0; week < 4; week++) {
      // Generate a weekly score fluctuating around the base reputationScore
      const weeklyScore = reputationScore + getRandomScore(-5, 5);
      const normalizedScore = Math.max(0, Math.min(100, (weeklyScore / 100) * 30)); // Scale to 30 points max
      weeklyNormalizedScores[user].push(normalizedScore);
    }
  });

  return weeklyNormalizedScores;
}

// Helper function for random score within a range
function getRandomScore(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Calculate monthly scores including project, quiz, assignment
function calculateMonthlyGrades(data, weeklyScores) {
  const users = Object.keys(data);
  let monthlyGrades = {};

  users.forEach((user) => {
    const userData = data[user];
    const projectScore = userData.projectMarks;
    const quizScore = userData.quizMarks;
    const assignmentScore = userData.assignmentMarks;

    // Average of weekly scores to calculate monthly normalized contribution
    const avgWeeklyScore = weeklyScores[user].reduce((sum, score) => sum + score, 0) / 4;

    // Final monthly grade calculation
    const monthlyGrade = projectScore + quizScore + assignmentScore + avgWeeklyScore;
    monthlyGrades[user] = {
      projectScore,
      quizScore,
      assignmentScore,
      avgWeeklyScore: avgWeeklyScore.toFixed(2),
      monthlyGrade: monthlyGrade.toFixed(2),
    };
  });

  return monthlyGrades;
}

// Execute calculations
const weeklyScores = calculateNormalizedScores(data);
const monthlyGrades = calculateMonthlyGrades(data, weeklyScores);

// Output results
console.log('Weekly Normalized Scores:', weeklyScores);
console.log('Final Monthly Grades Report:');
console.table(monthlyGrades);
